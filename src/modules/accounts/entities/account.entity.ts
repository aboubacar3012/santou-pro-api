import { AccountRole, AccountStatus, Permissions } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AccountEntity {
  constructor(partial: Partial<AccountEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: AccountRole, default: AccountRole.USER })
  role: AccountRole;

  @ApiProperty({ enum: AccountStatus, default: AccountStatus.ACTIVE })
  status: AccountStatus;

  @ApiProperty({
    enum: Permissions,
    isArray: true,
    default: [Permissions.READ],
  })
  permissions: Permissions[];

  @ApiProperty({ default: true })
  isFirstLogin: boolean;

  @ApiPropertyOptional()
  enterpriseId: string | null;

  @ApiPropertyOptional()
  clientId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
