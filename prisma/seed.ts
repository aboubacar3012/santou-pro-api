import { PrismaClient } from '@prisma/client';
import { seedEnterprises } from './seeders/enterprises';
import { seedAccounts } from './seeders/accounts';
import { seedClients } from './seeders/clients';
import { seedInvoices } from './seeders/invoices';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    // Création des entreprises
    const enterprises = await seedEnterprises(prisma);

    // Création des comptes utilisateurs
    await seedAccounts(prisma, enterprises);

    // Création des clients
    const clients = await seedClients(prisma, enterprises);

    // Création des factures
    await seedInvoices(prisma, clients, enterprises);

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    // close Prisma Client at the end
    prisma.$disconnect().catch((e) => {
      console.error('Failed to disconnect Prisma Client:', e);
    });
  });
