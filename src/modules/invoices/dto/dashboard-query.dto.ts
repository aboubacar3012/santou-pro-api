import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum PeriodEnum {
  ALL = 'all',
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum InvoiceStatusEnum {
  ALL = 'all',
  DRAFT = 'draft',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export class DashboardQueryDto {
  @ApiProperty({
    enum: PeriodEnum,
    required: false,
    description: 'Period filter for invoices',
    default: PeriodEnum.ALL,
  })
  @IsEnum(PeriodEnum)
  @IsOptional()
  period?: PeriodEnum = PeriodEnum.ALL;

  @ApiProperty({
    enum: InvoiceStatusEnum,
    required: false,
    description: 'Status filter for invoices',
    default: InvoiceStatusEnum.ALL,
  })
  @IsEnum(InvoiceStatusEnum)
  @IsOptional()
  status?: InvoiceStatusEnum = InvoiceStatusEnum.ALL;

  @ApiProperty({
    required: true,
    description: 'Enterprise ID',
  })
  @IsString()
  enterpriseId: string;
}
