import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceEntity } from './entities/invoice.entity';
import { PrismaService } from 'nestjs-prisma';
import { FindInvoiceDto } from './dto/find-invoice.dto';
import { PaginatedResponseDto } from '@/common/dto/paginatedResponse.dto';
import { Prisma } from '@prisma/client';
import {
  DashboardQueryDto,
  InvoiceStatusEnum,
  PeriodEnum,
} from './dto/dashboard-query.dto';
import { DashboardResponseDto } from './dto/dashboard-response.dto';

/**
 * Service pour la gestion des factures
 */
@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crée une nouvelle facture avec ses articles associés
   * @param createInvoiceDto - Les données de la facture à créer
   * @returns La facture nouvellement créée
   */
  async create(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceEntity> {
    const { articles, ...invoiceData } = createInvoiceDto;

    const invoice = await this.prisma.invoice.create({
      data: {
        ...invoiceData,
        articles: {
          create: articles,
        },
      },
      include: {
        articles: true,
      },
    });

    return new InvoiceEntity(invoice);
  }

  /**
   * Récupère toutes les factures avec pagination et filtrage optionnels
   * @param query - Les paramètres de recherche et pagination
   * @returns Une liste paginée de factures
   */
  async findAll(
    query: FindInvoiceDto = {},
  ): Promise<PaginatedResponseDto<InvoiceEntity>> {
    const { page = 1, limit = 10, enterpriseId, clientId } = query;
    const skip = (page - 1) * limit;

    // Build the where condition
    const where: Prisma.InvoiceWhereInput = {};
    if (enterpriseId) where.enterpriseId = enterpriseId;
    if (clientId) where.clientId = clientId;

    const [items, totalItems] = await Promise.all([
      this.prisma.invoice.findMany({
        where,
        take: Number(limit),
        skip: Number(skip),
        include: {
          articles: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.invoice.count({ where }),
    ]);

    return {
      items: items.map((invoice) => new InvoiceEntity(invoice)),
      pagination: {
        totalItems,
        page,
        limit,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  /**
   * Récupère une facture spécifique par son identifiant
   * @param id - L'identifiant de la facture à récupérer
   * @returns La facture demandée
   * @throws NotFoundException - Si la facture n'est pas trouvée
   */
  async findOne(id: string): Promise<InvoiceEntity> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        articles: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return new InvoiceEntity(invoice);
  }

  /**
   * Met à jour une facture existante et ses articles
   * @param id - L'identifiant de la facture à mettre à jour
   * @param updateInvoiceDto - Les données de mise à jour de la facture
   * @returns La facture mise à jour
   * @throws NotFoundException - Si la facture n'est pas trouvée
   */
  async update(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<InvoiceEntity> {
    const { articles, ...invoiceData } = updateInvoiceDto;

    // Check if invoice exists
    await this.findOne(id);

    // Update invoice and its articles
    const updatedInvoice = await this.prisma.invoice.update({
      where: { id },
      data: {
        ...invoiceData,
        ...(articles && {
          articles: {
            deleteMany: {},
            create: articles,
          },
        }),
      },
      include: {
        articles: true,
      },
    });

    return new InvoiceEntity(updatedInvoice);
  }

  /**
   * Supprime une facture et ses articles associés
   * @param id - L'identifiant de la facture à supprimer
   * @throws NotFoundException - Si la facture n'est pas trouvée
   */
  async remove(id: string): Promise<void> {
    // Check if invoice exists
    await this.findOne(id);

    // First delete related articles
    await this.prisma.invoiceArticle.deleteMany({
      where: { invoiceId: id },
    });

    // Then delete the invoice
    await this.prisma.invoice.delete({
      where: { id },
    });
  }

  /**
   * Récupère les données de tableau de bord pour une entreprise, avec filtrage par période et statut
   * @param query - Les paramètres de recherche pour le tableau de bord
   * @returns Les données du tableau de bord de l'entreprise
   */
  async getDashboard(query: DashboardQueryDto): Promise<DashboardResponseDto> {
    const { period, status, enterpriseId } = query;

    // Get all invoices for the enterprise including client informatio
    const allInvoices = await this.prisma.invoice.findMany({
      where: { enterpriseId },
      include: {
        client: true,
        articles: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log({ allInvoices });

    // Filter by period
    const filteredByPeriod = this.filterByPeriod(allInvoices, period);

    // Filter by status
    const filteredInvoices = this.filterByStatus(filteredByPeriod, status);

    // Get unique client IDs from filtered invoices
    const clientIds = [
      ...new Set(
        filteredInvoices.map((invoice: { clientId: any }) => invoice.clientId),
      ),
    ];
    const clientsCount = clientIds.length;

    // Calculate totals
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    const todayInvoices = allInvoices.filter(
      (invoice) =>
        new Date(invoice.date).toISOString().split('T')[0] === todayString,
    );

    const totalToday = todayInvoices.reduce(
      (acc, invoice) => acc + Number(invoice.amount),
      0,
    );

    const totalThisMonth = filteredInvoices.reduce((acc, invoice) => {
      const invoiceDate = new Date(invoice.date);
      const currentMonth = today.getMonth();
      const invoiceMonth = invoiceDate.getMonth();
      if (currentMonth === invoiceMonth) {
        return acc + Number(invoice.amount);
      }
      return acc;
    }, 0);

    return {
      invoices: filteredInvoices.map((invoice) => new InvoiceEntity(invoice)),
      totalThisMonth,
      invoicesCount: filteredInvoices.length,
      clientsCount,
      totalToday,
    };
  }

  /**
   * Récupère toutes les factures d'un client spécifique
   * @param clientId - L'identifiant du client
   * @returns Une liste des factures du client
   */
  async findByClientId(clientId: string): Promise<InvoiceEntity[]> {
    const invoices = await this.prisma.invoice.findMany({
      where: { clientId },
      include: {
        articles: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return invoices.map((invoice) => new InvoiceEntity(invoice));
  }

  // Helper methods for filtering
  private filterByPeriod(invoices, period?: PeriodEnum) {
    if (!period || period === PeriodEnum.ALL) return invoices;

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    switch (period) {
      case PeriodEnum.TODAY: {
        return invoices.filter(
          (invoice) =>
            new Date(invoice.date).toISOString().split('T')[0] === todayString,
        );
      }
      case PeriodEnum.WEEK: {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return invoices.filter((invoice) => invoice.date >= startOfWeek);
      }
      case PeriodEnum.MONTH: {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        return invoices.filter((invoice) => invoice.date >= startOfMonth);
      }
      default:
        return invoices;
    }
  }

  private filterByStatus(invoices, status?: InvoiceStatusEnum) {
    if (!status || status === InvoiceStatusEnum.ALL) return invoices;
    return invoices.filter(
      (invoice) => invoice.status.toUpperCase() === status.toUpperCase(),
    );
  }
}
