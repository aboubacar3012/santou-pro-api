import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  account: Account;
}
