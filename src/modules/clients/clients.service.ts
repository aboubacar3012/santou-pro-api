import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponseDto } from '@/common/dto/paginatedResponse.dto';
import { Client } from '@prisma/client';
@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto,
    });
  }

  async findAll(
    query: PaginationDto = {},
    enterpriseId?: string,
  ): Promise<PaginatedResponseDto<Client>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = enterpriseId ? { enterpriseId } : {};

    const [items, totalItems] = await Promise.all([
      this.prisma.client.findMany({
        take: Number(limit),
        skip: Number(skip),
        where,
        include: {
          invoices: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.client.count({ where }),
    ]);

    console.log('items', items);

    const result = {
      items,
      pagination: {
        totalItems,
        page,
        limit,
        totalPages: Math.ceil(totalItems / limit),
      },
    };

    return result;
  }

  findOne(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  remove(id: string) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
