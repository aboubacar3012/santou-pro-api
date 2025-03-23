import { PaginationDto } from '@/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class FindInvoiceDto extends PaginationDto {
  @IsString()
  @IsOptional()
  enterpriseId?: string;

  @IsString()
  @IsOptional()
  clientId?: string;
}
