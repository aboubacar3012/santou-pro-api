import { PrismaClient, ClientType } from '@prisma/client';

export async function seedClients(prisma: PrismaClient, enterprises: any[]) {
  const clients = await Promise.all([
    // Clients pour AbouSolutions
    prisma.client.upsert({
      where: { email: 'client1@example.com' },
      update: {},
      create: {
        type: ClientType.PROFESSIONAL,
        company: 'Entreprise ABC',
        firstName: 'John',
        lastName: 'Doe',
        address: 'Kaloum, Conakry',
        email: 'client1@example.com',
        phone: '+224 622111222',
        website: 'www.entrepriseabc.com',
        enterpriseId: enterprises[0].id,
      },
    }),
    prisma.client.upsert({
      where: { email: 'client2@example.com' },
      update: {},
      create: {
        type: ClientType.PARTICULAR,
        firstName: 'Jane',
        lastName: 'Smith',
        address: 'Matam, Conakry',
        email: 'client2@example.com',
        phone: '+224 622333444',
        enterpriseId: enterprises[0].id,
      },
    }),
    prisma.client.upsert({
      where: { email: 'techfirm@example.com' },
      update: {},
      create: {
        type: ClientType.PROFESSIONAL,
        company: 'TechFirm Solutions',
        firstName: 'Robert',
        lastName: 'Johnson',
        address: 'Kipé, Conakry',
        email: 'techfirm@example.com',
        phone: '+224 622444555',
        website: 'www.techfirm.com',
        enterpriseId: enterprises[0].id,
      },
    }),
    // Client pour EcoTech
    prisma.client.upsert({
      where: { email: 'greenlife@example.com' },
      update: {},
      create: {
        type: ClientType.PROFESSIONAL,
        company: 'GreenLife',
        firstName: 'Michael',
        lastName: 'Green',
        address: 'Koloma, Conakry',
        email: 'greenlife@example.com',
        phone: '+224 622566788',
        website: 'www.greenlife.org',
        enterpriseId: enterprises[1].id,
      },
    }),
    // Client pour AgroPlus
    prisma.client.upsert({
      where: { email: 'farmcoop@example.com' },
      update: {},
      create: {
        type: ClientType.PROFESSIONAL,
        company: 'Farm Cooperative',
        firstName: 'Pierre',
        lastName: 'Dubois',
        address: 'Kindia, Guinée',
        email: 'farmcoop@example.com',
        phone: '+224 622677899',
        website: 'www.farmcoop.gn',
        enterpriseId: enterprises[2].id,
      },
    }),
    // Client pour MédiaVision
    prisma.client.upsert({
      where: { email: 'tvplus@example.com' },
      update: {},
      create: {
        type: ClientType.PROFESSIONAL,
        company: 'TV Plus',
        firstName: 'Sophie',
        lastName: 'Martin',
        address: 'Dixinn, Conakry',
        email: 'tvplus@example.com',
        phone: '+224 622788900',
        website: 'www.tvplus.gn',
        enterpriseId: enterprises[3].id,
      },
    }),
    // Client pour ConseilPro
    prisma.client.upsert({
      where: { email: 'startupinc@example.com' },
      update: {},
      create: {
        type: ClientType.PROFESSIONAL,
        company: 'StartUp Inc',
        firstName: 'Emma',
        lastName: 'Miller',
        address: 'Ratoma, Conakry',
        email: 'startupinc@example.com',
        phone: '+224 622899001',
        website: 'www.startupinc.com',
        enterpriseId: enterprises[4].id,
      },
    }),
    // Autres clients pour AbouSolutions
    prisma.client.upsert({
      where: { email: 'client3@example.com' },
      update: {},
      create: {
        type: ClientType.PARTICULAR,
        firstName: 'Mohamed',
        lastName: 'Camara',
        address: 'Cosa, Conakry',
        email: 'client3@example.com',
        phone: '+224 622112233',
        enterpriseId: enterprises[0].id,
      },
    }),
    prisma.client.upsert({
      where: { email: 'client4@example.com' },
      update: {},
      create: {
        type: ClientType.PROFESSIONAL,
        company: 'Boutique Élégance',
        firstName: 'Fatoumata',
        lastName: 'Diallo',
        address: 'Taouyah, Conakry',
        email: 'client4@example.com',
        phone: '+224 622223344',
        enterpriseId: enterprises[0].id,
      },
    }),
  ]);

  console.log('Clients created:', clients);
  return clients;
}
