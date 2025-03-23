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
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { AccountEntity } from './entities/account.entity';

/**
 * Contrôleur pour gérer les opérations CRUD liées aux comptes.
 * Ce contrôleur fournit des endpoints pour créer, lire, mettre à jour et supprimer des comptes.
 * Toutes les routes sont protégées par JwtAuthGuard et nécessitent une authentification.
 */
@Controller('accounts')
@ApiTags('Accounts')
export class AccountsController {
  /**
   * Constructeur du contrôleur des comptes.
   * @param accountsService - Service d'injection de dépendance pour gérer les opérations liées aux comptes.
   */
  constructor(private readonly accountsService: AccountsService) {}

  /**
   * Créer un nouveau compte.
   * @param createAccountDto - Objet de transfert de données pour créer un compte.
   * @returns L'entité compte créée.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AccountEntity })
  async create(@Body() createAccountDto: CreateAccountDto) {
    const account = await this.accountsService.create(createAccountDto);
    return new AccountEntity(account);
  }

  /**
   * Récupérer tous les comptes avec pagination.
   * @param query - Paramètres de requête pour la pagination.
   * @returns Une liste d'entités compte et les informations de pagination.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: AccountEntity, isArray: true })
  async findAll(@Query() query: PaginationDto) {
    const response = await this.accountsService.findAll(query);
    return {
      items: response.items.map((account) => new AccountEntity(account)),
      pagination: response.pagination,
    };
  }

  /**
   * Récupérer un compte par son ID.
   * @param id - L'ID du compte à récupérer.
   * @returns L'entité compte.
   * @throws NotFoundException si le compte n'est pas trouvé.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: AccountEntity })
  async findOne(@Param('id') id: string) {
    const account = await this.accountsService.findOne(id);
    if (!account) {
      throw new NotFoundException(`Compte avec l'identifiant ${id} non trouvé`);
    }
    return new AccountEntity(account);
  }

  /**
   * Mettre à jour un compte par son ID.
   * @param id - L'ID du compte à mettre à jour.
   * @param updateAccountDto - Objet de transfert de données pour mettre à jour un compte.
   * @returns L'entité compte mise à jour.
   * @throws NotFoundException si le compte n'est pas trouvé.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: AccountEntity })
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const updatedAccount = await this.accountsService.update(
      id,
      updateAccountDto,
    );
    if (!updatedAccount) {
      throw new NotFoundException(`Compte avec l'identifiant ${id} non trouvé`);
    }
    return new AccountEntity(updatedAccount);
  }

  /**
   * Supprimer un compte par son ID.
   * @param id - L'ID du compte à supprimer.
   * @returns L'entité compte supprimée.
   * @throws NotFoundException si le compte n'est pas trouvé.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: AccountEntity })
  async remove(@Param('id') id: string) {
    const deletedAccount = await this.accountsService.remove(id);
    if (!deletedAccount) {
      throw new NotFoundException(`Compte avec l'identifiant ${id} non trouvé`);
    }
    return new AccountEntity(deletedAccount);
  }
}
