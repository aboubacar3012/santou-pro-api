import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponseDto } from '@/common/dto/paginatedResponse.dto';
import { Enterprise } from '@prisma/client';

@Injectable()
export class EnterprisesService {
  constructor(private prisma: PrismaService) {}

  create(createEnterpriseDto: CreateEnterpriseDto) {
    return this.prisma.enterprise.create({
      data: createEnterpriseDto,
    });
  }

  async findAll(
    query: PaginationDto = {},
  ): Promise<PaginatedResponseDto<Enterprise>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      this.prisma.enterprise.findMany({
        take: Number(limit),
        skip: Number(skip),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.enterprise.count(),
    ]);

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
    return this.prisma.enterprise.findUnique({
      where: { id },
    });
  }

  update(id: string, updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.prisma.enterprise.update({
      where: { id },
      data: updateEnterpriseDto,
    });
  }

  remove(id: string) {
    return this.prisma.enterprise.delete({
      where: { id },
    });
  }
}
