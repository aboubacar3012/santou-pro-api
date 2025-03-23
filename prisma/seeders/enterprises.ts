import { PrismaClient } from '@prisma/client';

export async function seedEnterprises(prisma: PrismaClient) {
  const enterprises = await Promise.all([
    prisma.enterprise.upsert({
      where: { id: '00000000-0000-0000-0000-000000000001' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'AbouSolutions',
        legalForm: 'SARL',
        registrationNum: 'RC123456',
        taxId: 'TAX123456',
        vatNumber: 'VAT123456',
        industry: 'Technologie',
        numberOfEmployees: 10,
        website: 'https://www.abousolutions.com',
        description: 'Entreprise de développement logiciel',
        currency: 'GNF',
      },
    }),
    prisma.enterprise.upsert({
      where: { id: '00000000-0000-0000-0000-000000000002' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000002',
        name: 'EcoTech Guinée',
        legalForm: 'SA',
        registrationNum: 'RC654321',
        taxId: 'TAX654321',
        vatNumber: 'VAT654321',
        industry: 'Énergie Renouvelable',
        numberOfEmployees: 25,
        website: 'https://www.ecotechguinee.com',
        description: 'Solutions énergétiques durables',
        currency: 'GNF',
      },
    }),
    prisma.enterprise.upsert({
      where: { id: '00000000-0000-0000-0000-000000000003' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'AgroPlus',
        legalForm: 'SARL',
        registrationNum: 'RC789012',
        taxId: 'TAX789012',
        vatNumber: 'VAT789012',
        industry: 'Agriculture',
        numberOfEmployees: 50,
        website: 'https://www.agroplus.gn',
        description: 'Innovations agricoles et agroalimentaires',
        currency: 'GNF',
      },
    }),
    prisma.enterprise.upsert({
      where: { id: '00000000-0000-0000-0000-000000000004' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000004',
        name: 'MédiaVision',
        legalForm: 'EURL',
        registrationNum: 'RC345678',
        taxId: 'TAX345678',
        vatNumber: 'VAT345678',
        industry: 'Médias',
        numberOfEmployees: 15,
        website: 'https://www.mediavision.gn',
        description: 'Production audiovisuelle et médiatique',
        currency: 'GNF',
      },
    }),
    prisma.enterprise.upsert({
      where: { id: '00000000-0000-0000-0000-000000000005' },
      update: {},
      create: {
        id: '00000000-0000-0000-0000-000000000005',
        name: 'ConseilPro',
        legalForm: 'SAS',
        registrationNum: 'RC901234',
        taxId: 'TAX901234',
        vatNumber: 'VAT901234',
        industry: 'Conseil',
        numberOfEmployees: 8,
        website: 'https://www.conseilpro.gn',
        description: "Cabinet de conseil en stratégie d'entreprise",
        currency: 'GNF',
      },
    }),
  ]);

  console.log('Enterprises created:', enterprises);
  return enterprises;
}
