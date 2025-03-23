import { ClientType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClientEntity {
  constructor(partial: Partial<ClientEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ClientType })
  type: ClientType;

  @ApiPropertyOptional()
  company: string | null;

  @ApiPropertyOptional()
  firstName: string | null;

  @ApiPropertyOptional()
  lastName: string | null;

  @ApiPropertyOptional()
  logo: string | null;

  @ApiProperty()
  address: string;

  @ApiPropertyOptional()
  email: string | null;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional()
  website: string | null;

  @ApiProperty()
  enterpriseId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
