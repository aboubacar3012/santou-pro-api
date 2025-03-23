import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ClientType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: ClientType;

  @IsString()
  @ApiProperty()
  @Optional()
  company?: string;

  @IsString()
  @ApiProperty()
  @Optional()
  firstName?: string;

  @IsString()
  @ApiProperty()
  @Optional()
  lastName?: string;

  @IsString()
  @ApiProperty()
  @Optional()
  logo?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Optional()
  address: string;

  @IsString()
  @ApiProperty()
  @Optional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  @Optional()
  website: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  enterpriseId: string;
}
