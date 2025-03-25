import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { FindInvoiceDto } from './dto/find-invoice.dto';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceEntity } from './entities/invoice.entity';
import { DashboardQueryDto } from './dto/dashboard-query.dto';
import { DashboardResponseDto } from './dto/dashboard-response.dto';

/**
 * Contrôleur pour la gestion des factures
 * Ce contrôleur fournit des endpoints pour créer, lire, mettre à jour et supprimer des factures.
 * Toutes les routes sont protégées par JwtAuthGuard et nécessitent une authentification.
 */
@Controller('api/invoices')
@ApiTags('Invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  /**
   * Crée une nouvelle facture
   * @param createInvoiceDto - Les données de la facture à créer
   * @returns La facture nouvellement créée
   */
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: InvoiceEntity })
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    console.log('createInvoiceDto', createInvoiceDto);
    return await this.invoicesService.create(createInvoiceDto);
  }

  /**
   * Récupère toutes les factures
   * @param query - Les paramètres de recherche et pagination
   * @returns Une liste paginée de factures
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: InvoiceEntity, isArray: true })
  async findAll(@Query() query: FindInvoiceDto) {
    return await this.invoicesService.findAll(query);
  }

  /**
   * Récupère les données du tableau de bord pour les factures
   * @param query - Les paramètres de filtre (période, statut, entrepriseId)
   * @returns Les données du tableau de bord
   */
  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: DashboardResponseDto })
  async getDashboard(@Query() query: DashboardQueryDto) {
    console.log('query', query);
    return await this.invoicesService.getDashboard(query);
  }

  /**
   * Récupère toutes les factures pour un client spécifique
   * @param clientId - L'identifiant du client
   * @returns Liste des factures du client
   */
  @Get('client/:clientId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: InvoiceEntity, isArray: true })
  async findByClientId(@Param('clientId') clientId: string) {
    const invoices = await this.invoicesService.findByClientId(clientId);
    if (!invoices || invoices.length === 0) {
      throw new NotFoundException(
        `Aucune facture trouvée pour le client avec l'identifiant ${clientId}`,
      );
    }
    return invoices;
  }

  /**
   * Récupère une facture spécifique par son identifiant
   * @param id - L'identifiant de la facture à récupérer
   * @returns La facture demandée
   * @throws NotFoundException si la facture n'est pas trouvée
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: InvoiceEntity })
  async findOne(@Param('id') id: string) {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) {
      throw new NotFoundException(
        `Facture avec l'identifiant ${id} non trouvée`,
      );
    }
    return invoice;
  }

  /**
   * Met à jour une facture existante
   * @param id - L'identifiant de la facture à mettre à jour
   * @param updateInvoiceDto - Les données de mise à jour de la facture
   * @returns La facture mise à jour
   * @throws NotFoundException si la facture n'est pas trouvée
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: InvoiceEntity })
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    const updatedInvoice = await this.invoicesService.update(
      id,
      updateInvoiceDto,
    );
    if (!updatedInvoice) {
      throw new NotFoundException(
        `Facture avec l'identifiant ${id} non trouvée`,
      );
    }
    return updatedInvoice;
  }

  /**
   * Supprime une facture
   * @param id - L'identifiant de la facture à supprimer
   * @returns La facture supprimée
   * @throws NotFoundException si la facture n'est pas trouvée
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: InvoiceEntity })
  async remove(@Param('id') id: string) {
    try {
      await this.invoicesService.remove(id);
      return {
        success: true,
        message: `Facture avec l'identifiant ${id} supprimée`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(
        `Facture avec l'identifiant ${id} non trouvée`,
      );
    }
  }
}
