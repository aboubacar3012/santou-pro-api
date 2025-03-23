import { ApiProperty } from '@nestjs/swagger';

export class InvoiceArticleEntity {
  constructor(partial: Partial<InvoiceArticleEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  quantity: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  invoiceId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
