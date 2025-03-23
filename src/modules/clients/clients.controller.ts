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
import { ClientService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientEntity } from '@/modules/clients/entities/client.entity';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';

/**
 * Contrôleur pour gérer les opérations CRUD liées aux clients.
 * Ce contrôleur fournit des endpoints pour créer, lire, mettre à jour et supprimer des clients.
 * Toutes les routes sont protégées par JwtAuthGuard et nécessitent une authentification.
 */
@Controller('api/clients')
@ApiTags('Clients')
export class ClientController {
  /**
   * Constructeur du contrôleur client.
   * @param clientService - Service d'injection de dépendance pour gérer les opérations liées aux clients.
   */
  constructor(private readonly clientService: ClientService) {}

  /**
   * Créer un nouveau client.
   * @param createClientDto - Objet de transfert de données pour créer un client.
   * @returns L'entité client créée.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ClientEntity })
  async create(@Body() createClientDto: CreateClientDto) {
    const client = await this.clientService.create(createClientDto);
    return new ClientEntity(client);
  }

  /**
   * Récupérer tous les clients avec pagination.
   * @param query - Paramètres de requête pour la pagination.
   * @returns Une liste d'entités client et les informations de pagination.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: ClientEntity, isArray: true })
  async findAll(@Query() query: PaginationDto) {
    const response = await this.clientService.findAll(query);
    return {
      items: response.items.map((client) => new ClientEntity(client)),
      pagination: response.pagination,
    };
  }

  /**
   * Récupérer un client par son ID.
   * @param id - L'ID du client à récupérer.
   * @returns L'entité client.
   * @throws NotFoundException si le client n'est pas trouvé.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: ClientEntity })
  async findOne(@Param('id') id: string) {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new NotFoundException(`Client avec l'identifiant ${id} non trouvé`);
    }
    return new ClientEntity(client);
  }

  /**
   * Mettre à jour un client par son ID.
   * @param id - L'ID du client à mettre à jour.
   * @param updateClientDto - Objet de transfert de données pour mettre à jour un client.
   * @returns L'entité client mise à jour.
   * @throws NotFoundException si le client n'est pas trouvé.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: ClientEntity })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const updatedClient = await this.clientService.update(id, updateClientDto);
    if (!updatedClient) {
      throw new NotFoundException(`Client avec l'identifiant ${id} non trouvé`);
    }
    return new ClientEntity(updatedClient);
  }

  /**
   * Supprimer un client par son ID.
   * @param id - L'ID du client à supprimer.
   * @returns L'entité client supprimée.
   * @throws NotFoundException si le client n'est pas trouvé.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: ClientEntity })
  async remove(@Param('id') id: string) {
    const deletedClient = await this.clientService.remove(id);
    if (!deletedClient) {
      throw new NotFoundException(`Client avec l'identifiant ${id} non trouvé`);
    }
    return new ClientEntity(deletedClient);
  }
}
