import {
  PrismaClient,
  AccountRole,
  AccountStatus,
  Permissions,
  Enterprise,
} from '@prisma/client';
import { hashPassword, commonPasswords } from './utils';

export async function seedAccounts(
  prisma: PrismaClient,
  enterprises: Enterprise[],
) {
  const passwords = {
    admin: await hashPassword(commonPasswords.admin),
    user: await hashPassword(commonPasswords.user),
  };

  const accounts = await Promise.all([
    // Super Admin global (sans enterprise)
    prisma.account.upsert({
      where: { email: 'superadmin@santu.pro' },
      update: {},
      create: {
        email: 'superadmin@santu.pro',
        password: passwords.admin,
        role: AccountRole.ADMIN,
        permissions: [
          Permissions.CREATE,
          Permissions.READ,
          Permissions.UPDATE,
          Permissions.DELETE,
        ],
        // Pas de enterpriseId pour le super admin
      },
    }),
    // Comptes pour AbouSolutions
    prisma.account.upsert({
      where: { email: 'admin@abousolutions.com' },
      update: {},
      create: {
        email: 'admin@abousolutions.com',
        password: passwords.admin,
        role: AccountRole.ENTERPRISE,
        permissions: [
          Permissions.CREATE,
          Permissions.READ,
          Permissions.UPDATE,
          Permissions.DELETE,
        ],
        enterpriseId: enterprises[0].id,
      },
    }),
    prisma.account.upsert({
      where: { email: 'user@abousolutions.com' },
      update: {},
      create: {
        email: 'user@abousolutions.com',
        password: passwords.user,
        role: AccountRole.USER,
        permissions: [Permissions.READ],
        enterpriseId: enterprises[0].id,
      },
    }),
    // Comptes pour EcoTech
    prisma.account.upsert({
      where: { email: 'admin@ecotech.com' },
      update: {},
      create: {
        email: 'admin@ecotech.com',
        password: passwords.admin,
        role: AccountRole.ENTERPRISE,
        permissions: [
          Permissions.CREATE,
          Permissions.READ,
          Permissions.UPDATE,
          Permissions.DELETE,
        ],
        enterpriseId: enterprises[1].id,
      },
    }),
    // Compte pour AgroPlus
    prisma.account.upsert({
      where: { email: 'admin@agroplus.com' },
      update: {},
      create: {
        email: 'admin@agroplus.com',
        password: passwords.admin,
        role: AccountRole.ENTERPRISE,
        status: AccountStatus.ACTIVE,
        permissions: [
          Permissions.CREATE,
          Permissions.READ,
          Permissions.UPDATE,
          Permissions.DELETE,
        ],
        enterpriseId: enterprises[2].id,
      },
    }),
    // Compte pour MédiaVision
    prisma.account.upsert({
      where: { email: 'admin@mediavision.com' },
      update: {},
      create: {
        email: 'admin@mediavision.com',
        password: passwords.admin,
        role: AccountRole.ENTERPRISE,
        permissions: [
          Permissions.CREATE,
          Permissions.READ,
          Permissions.UPDATE,
          Permissions.DELETE,
        ],
        enterpriseId: enterprises[3].id,
      },
    }),
    // Compte pour ConseilPro
    prisma.account.upsert({
      where: { email: 'admin@conseilpro.com' },
      update: {},
      create: {
        email: 'admin@conseilpro.com',
        password: passwords.admin,
        role: AccountRole.ENTERPRISE,
        permissions: [
          Permissions.CREATE,
          Permissions.READ,
          Permissions.UPDATE,
          Permissions.DELETE,
        ],
        enterpriseId: enterprises[4].id,
      },
    }),
    // Utilisateur standard supplémentaire pour AbouSolutions
    prisma.account.upsert({
      where: { email: 'finance@abousolutions.com' },
      update: {},
      create: {
        email: 'finance@abousolutions.com',
        password: passwords.user,
        role: AccountRole.USER,
        permissions: [Permissions.CREATE, Permissions.READ],
        enterpriseId: enterprises[0].id,
      },
    }),
  ]);

  console.log('Accounts created:', accounts);
  return accounts;
}
