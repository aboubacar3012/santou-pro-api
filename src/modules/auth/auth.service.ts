//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from '@/modules/auth/entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { Account } from '@prisma/client';

@Injectable()
export class AuthService {
  /**
   * Constructeur du AuthService
   * @param {PrismaService} prisma - Le service Prisma
   * @param {JwtService} jwtService - Le service JWT
   */
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Connecte un utilisateur avec email et mot de passe
   * @param {string} email - L'email de l'utilisateur
   * @param {string} password - Le mot de passe de l'utilisateur
   * @returns {Promise<AuthEntity>} - L'entité d'authentification contenant le jeton d'accès
   * @throws {NotFoundException} - Si aucun utilisateur n'est trouvé pour l'email donné
   * @throws {UnauthorizedException} - Si le mot de passe est invalide
   */
  async login(email: string, password: string): Promise<AuthEntity> {
    // Étape 1: Récupérer un utilisateur avec l'email fourni
    const account = await this.prisma.account.findUnique({
      where: { email: email },
    });

    // Si aucun utilisateur n'est trouvé, lancer une erreur
    if (!account) {
      throw new NotFoundException(`No account found for email: ${email}`);
    }

    // Étape 2: Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, account.password);

    // Si le mot de passe ne correspond pas, lancer une erreur
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Étape 3: Générer un JWT contenant l'ID de l'utilisateur et le retourner
    return {
      accessToken: this.jwtService.sign({ userId: account.id }),
    };
  }

  /**
   * Vérifie si un utilisateur existe dans la base de données par son email.
   * @param {string} email - L'email de l'utilisateur à vérifier.
   * @returns {Promise<{ exists: boolean }>} Un objet indiquant si l'utilisateur existe.
   */
  async checkUserExist(email: string): Promise<{ exists: boolean }> {
    const user = await this.prisma.account.findUnique({
      where: { email },
    });

    return { exists: !!user };
  }

  /**
   * Trouve un utilisateur par son ID.
   * @param {string} id - L'ID de l'utilisateur à trouver.
   * @returns {Promise<any>} L'utilisateur trouvé.
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async findOne(id: string): Promise<Account | null> {
    return await this.prisma.account.findUnique({
      where: { id },
    });
  }
}
