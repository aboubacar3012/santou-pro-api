import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponseDto } from '@/common/dto/paginatedResponse.dto';
import { Account } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({
      data: createAccountDto,
    });
  }

  async findAll(
    query: PaginationDto = {},
  ): Promise<PaginatedResponseDto<Account>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      this.prisma.account.findMany({
        take: Number(limit),
        skip: Number(skip),
        include: {
          enterprise: true,
          client: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.account.count(),
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
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  remove(id: string) {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
