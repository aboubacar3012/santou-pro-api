import { ApiProperty } from '@nestjs/swagger';
import { InvoiceEntity } from '../entities/invoice.entity';

export class DashboardResponseDto {
  @ApiProperty({ type: [InvoiceEntity] })
  invoices: InvoiceEntity[];

  @ApiProperty()
  totalThisMonth: number;

  @ApiProperty()
  invoicesCount: number;

  @ApiProperty()
  clientsCount: number;

  @ApiProperty()
  totalToday: number;
}
