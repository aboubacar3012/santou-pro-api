import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus, PaymentCondition, PaymentMode } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty({ default: '1' })
  quantity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  price: string;
}

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  link?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: PaymentMode })
  paymentMode: PaymentMode;

  @IsString()
  @ApiProperty({ enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status: InvoiceStatus;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: PaymentCondition })
  paymentCondition: PaymentCondition;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  tva?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  remark?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  enterpriseId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceArticleDto)
  @ApiProperty({ type: [InvoiceArticleDto] })
  articles: InvoiceArticleDto[];
}
