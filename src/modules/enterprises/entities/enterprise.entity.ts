import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EnterpriseEntity {
  constructor(partial: Partial<EnterpriseEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  legalForm: string | null;

  @ApiPropertyOptional()
  registrationNum: string | null;

  @ApiPropertyOptional()
  taxId: string | null;

  @ApiPropertyOptional()
  vatNumber: string | null;

  @ApiPropertyOptional()
  industry: string | null;

  @ApiPropertyOptional()
  numberOfEmployees: number | null;

  @ApiPropertyOptional()
  website: string | null;

  @ApiPropertyOptional()
  description: string | null;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
