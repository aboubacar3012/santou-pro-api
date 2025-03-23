import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InvoiceStatus, PaymentCondition, PaymentMode } from '@prisma/client';
import { InvoiceArticleEntity } from './invoice-article.entity';

export class InvoiceEntity {
  constructor(partial: Partial<InvoiceEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  invoiceNumber: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  link: string | null;

  @ApiProperty()
  date: string;

  @ApiProperty()
  amount: string;

  @ApiProperty({ enum: PaymentMode })
  paymentMode: PaymentMode;

  @ApiProperty({ enum: InvoiceStatus })
  status: InvoiceStatus;

  @ApiProperty({ enum: PaymentCondition })
  paymentCondition: PaymentCondition;

  @ApiPropertyOptional()
  tva: string | null;

  @ApiPropertyOptional()
  remark: string | null;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  enterpriseId: string;

  @ApiProperty({ type: [InvoiceArticleEntity] })
  articles: InvoiceArticleEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
