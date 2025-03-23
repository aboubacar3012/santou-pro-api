import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateEnterpriseDto {
  @ApiProperty({ description: "Le nom de l'entreprise" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: "La forme juridique de l'entreprise" })
  @IsOptional()
  @IsString()
  legalForm?: string;

  @ApiPropertyOptional({
    description: "Le numéro d'immatriculation de l'entreprise",
  })
  @IsOptional()
  @IsString()
  registrationNum?: string;

  @ApiPropertyOptional({ description: "L'identifiant fiscal de l'entreprise" })
  @IsOptional()
  @IsString()
  taxId?: string;

  @ApiPropertyOptional({ description: "Le numéro de TVA de l'entreprise" })
  @IsOptional()
  @IsString()
  vatNumber?: string;

  @ApiPropertyOptional({ description: "Le secteur d'activité de l'entreprise" })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiPropertyOptional({
    description: "Le nombre d'employés dans l'entreprise",
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfEmployees?: number;

  @ApiPropertyOptional({ description: "Le site web de l'entreprise" })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ description: "La description de l'entreprise" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "La devise utilisée par l'entreprise",
    default: 'GNF',
  })
  @IsOptional()
  @IsString()
  currency?: string = 'GNF';
}
