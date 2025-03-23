import { ApiProperty } from '@nestjs/swagger';
import { AccountRole, AccountStatus, Permissions } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsEnum,
} from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(AccountRole)
  @IsOptional()
  @ApiProperty({ enum: AccountRole, default: AccountRole.USER })
  role?: AccountRole;

  @IsEnum(AccountStatus)
  @IsOptional()
  @ApiProperty({ enum: AccountStatus, default: AccountStatus.ACTIVE })
  status?: AccountStatus;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: [String],
    enum: Permissions,
    isArray: true,
    default: [Permissions.READ],
  })
  permissions?: Permissions[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: true })
  isFirstLogin?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  enterpriseId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  clientId?: string;
}
