import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AccountRole } from '@prisma/client';

export class SignupDto {
  @ApiProperty({
    description: "Email de l'utilisateur",
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Rôle du compte',
    enum: AccountRole,
    default: AccountRole.USER,
    required: false,
  })
  @IsOptional()
  role?: AccountRole;

  @ApiProperty({
    description: "ID de l'entreprise (optionnel)",
    example: 'e5b5f7d8-c355-4d9c-a959-1a4552b7a8fe',
    required: false,
  })
  @IsOptional()
  @IsString()
  enterpriseId?: string;
}
