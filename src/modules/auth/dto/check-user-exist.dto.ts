import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckUserExistDto {
  @ApiProperty({
    description: "L'adresse email de l'utilisateur à vérifier",
    example: 'utilisateur@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
