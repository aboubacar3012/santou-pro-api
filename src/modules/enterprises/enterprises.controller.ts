import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EnterpriseEntity } from './entities/enterprise.entity';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';

/**
 * Contrôleur pour gérer les opérations CRUD liées aux entreprises.
 * Ce contrôleur fournit des endpoints pour créer, lire, mettre à jour et supprimer des entreprises.
 * Toutes les routes sont protégées par JwtAuthGuard et nécessitent une authentification.
 */
@Controller('api/enterprises')
@ApiTags('Enterprises')
export class EnterprisesController {
  /**
   * Constructeur du contrôleur entreprise.
   * @param enterprisesService - Service d'injection de dépendance pour gérer les opérations liées aux entreprises.
   */
  constructor(private readonly enterprisesService: EnterprisesService) {}

  /**
   * Créer une nouvelle entreprise.
   * @param createEnterpriseDto - Objet de transfert de données pour créer une entreprise.
   * @returns L'entité entreprise créée.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: EnterpriseEntity })
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    const enterprise =
      await this.enterprisesService.create(createEnterpriseDto);
    return new EnterpriseEntity(enterprise);
  }

  /**
   * Récupérer toutes les entreprises avec pagination.
   * @param query - Paramètres de requête pour la pagination.
   * @returns Une liste d'entités entreprise et les informations de pagination.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: EnterpriseEntity, isArray: true })
  async findAll(@Query() query: PaginationDto) {
    const response = await this.enterprisesService.findAll(query);
    return {
      items: Array.isArray(response.items)
        ? response.items.map((enterprise) => new EnterpriseEntity(enterprise))
        : [],
      pagination: response.pagination,
    };
  }

  /**
   * Récupérer une entreprise par son ID.
   * @param id - L'ID de l'entreprise à récupérer.
   * @returns L'entité entreprise.
   * @throws NotFoundException si l'entreprise n'est pas trouvée.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: EnterpriseEntity })
  async findOne(@Param('id') id: string) {
    const enterprise = await this.enterprisesService.findOne(id);
    if (!enterprise) {
      throw new NotFoundException(
        `Entreprise avec l'identifiant ${id} non trouvée`,
      );
    }
    return new EnterpriseEntity(enterprise);
  }

  /**
   * Mettre à jour une entreprise par son ID.
   * @param id - L'ID de l'entreprise à mettre à jour.
   * @param updateEnterpriseDto - Objet de transfert de données pour mettre à jour une entreprise.
   * @returns L'entité entreprise mise à jour.
   * @throws NotFoundException si l'entreprise n'est pas trouvée.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: EnterpriseEntity })
  async update(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    const updatedEnterprise = await this.enterprisesService.update(
      id,
      updateEnterpriseDto,
    );
    if (!updatedEnterprise) {
      throw new NotFoundException(
        `Entreprise avec l'identifiant ${id} non trouvée`,
      );
    }
    return new EnterpriseEntity(updatedEnterprise);
  }

  /**
   * Supprimer une entreprise par son ID.
   * @param id - L'ID de l'entreprise à supprimer.
   * @returns L'entité entreprise supprimée.
   * @throws NotFoundException si l'entreprise n'est pas trouvée.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: EnterpriseEntity })
  async remove(@Param('id') id: string) {
    const deletedEnterprise = await this.enterprisesService.remove(id);
    if (!deletedEnterprise) {
      throw new NotFoundException(
        `Entreprise avec l'identifiant ${id} non trouvée`,
      );
    }
    return new EnterpriseEntity(deletedEnterprise);
  }
}
