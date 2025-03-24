import {
  PrismaClient,
  PaymentMode,
  InvoiceStatus,
  PaymentCondition,
  Client,
  Enterprise,
} from '@prisma/client';

export async function seedInvoices(
  prisma: PrismaClient,
  clients: Client[],
  enterprises: Enterprise[],
) {
  // Factures pour AbouSolutions
  const invoicesForAbouSolutions = await Promise.all([
    prisma.invoice.create({
      data: {
        invoiceNumber: 'FACTURE-2023-001',
        name: 'Facture Services Informatiques',
        date: '2023-05-15',
        amount: '5000000',
        paymentMode: PaymentMode.VIREMENT,
        status: InvoiceStatus.PAID,
        paymentCondition: PaymentCondition.THIRTY,
        tva: '18',
        remark: 'Paiement reçu avec remerciements',
        clientId: clients[0].id,
        enterpriseId: enterprises[0].id,
        articles: {
          create: [
            {
              name: 'Développement site web',
              description: "Création d'un site web vitrine responsive",
              quantity: '1',
              price: '3000000',
            },
            {
              name: 'Hébergement annuel',
              description: 'Hébergement premium avec support 24/7',
              quantity: '1',
              price: '2000000',
            },
          ],
        },
      },
    }),
    prisma.invoice.create({
      data: {
        invoiceNumber: 'FACTURE-2023-002',
        name: 'Facture Maintenance',
        date: '2023-06-01',
        amount: '1500000',
        paymentMode: PaymentMode.OM,
        status: InvoiceStatus.SENT,
        paymentCondition: PaymentCondition.FIFTEEN,
        tva: '18',
        clientId: clients[1].id,
        enterpriseId: enterprises[0].id,
        articles: {
          create: [
            {
              name: 'Maintenance mensuelle',
              description: 'Maintenance et mises à jour du système',
              quantity: '3',
              price: '500000',
            },
          ],
        },
      },
    }),
    prisma.invoice.create({
      data: {
        invoiceNumber: 'FACTURE-2023-003',
        name: 'Développement Application Mobile',
        date: '2023-07-10',
        amount: '8000000',
        paymentMode: PaymentMode.CB,
        status: InvoiceStatus.DRAFT,
        paymentCondition: PaymentCondition.SIXTY,
        tva: '18',
        clientId: clients[2].id,
        enterpriseId: enterprises[0].id,
        articles: {
          create: [
            {
              name: 'Développement Android',
              description: 'Développement application Android native',
              quantity: '1',
              price: '4000000',
            },
            {
              name: 'Développement iOS',
              description: 'Développement application iOS native',
              quantity: '1',
              price: '4000000',
            },
          ],
        },
      },
    }),
    prisma.invoice.create({
      data: {
        invoiceNumber: 'FACTURE-2023-004',
        name: 'Formation en Cybersécurité',
        date: '2023-08-05',
        amount: '2000000',
        paymentMode: PaymentMode.CASH,
        status: InvoiceStatus.PAID,
        paymentCondition: PaymentCondition.NOW,
        tva: '18',
        clientId: clients[7].id,
        enterpriseId: enterprises[0].id,
        articles: {
          create: [
            {
              name: 'Formation Sécurité Informatique',
              description: 'Formation complète de 5 jours sur la cybersécurité',
              quantity: '1',
              price: '1500000',
            },
            {
              name: 'Documentation et Supports',
              description: 'Supports de cours et documents de référence',
              quantity: '1',
              price: '500000',
            },
          ],
        },
      },
    }),
    prisma.invoice.create({
      data: {
        invoiceNumber: 'FACTURE-2023-005',
        name: 'Audit Système Informatique',
        date: '2023-09-15',
        amount: '3500000',
        paymentMode: PaymentMode.VIREMENT,
        status: InvoiceStatus.SENT,
        paymentCondition: PaymentCondition.FORTYFIVE,
        tva: '18',
        clientId: clients[8].id,
        enterpriseId: enterprises[0].id,
        articles: {
          create: [
            {
              name: 'Audit de sécurité',
              description: 'Audit complet des systèmes informatiques',
              quantity: '1',
              price: '2000000',
            },
            {
              name: 'Rapport et Recommandations',
              description: 'Rapport détaillé avec recommandations',
              quantity: '1',
              price: '1000000',
            },
            {
              name: 'Présentation des résultats',
              description: "Présentation des résultats à l'équipe de direction",
              quantity: '1',
              price: '500000',
            },
          ],
        },
      },
    }),
  ]);

  // Factures pour EcoTech
  const invoicesForEcoTech = await Promise.all([
    prisma.invoice.create({
      data: {
        invoiceNumber: 'ECO-2023-001',
        name: 'Installation Panneaux Solaires',
        date: '2023-06-10',
        amount: '12000000',
        paymentMode: PaymentMode.VIREMENT,
        status: InvoiceStatus.PAID,
        paymentCondition: PaymentCondition.THIRTY,
        tva: '18',
        clientId: clients[3].id,
        enterpriseId: enterprises[1].id,
        articles: {
          create: [
            {
              name: 'Panneaux solaires 250W',
              description: '10 panneaux solaires polycrystallin 250W',
              quantity: '10',
              price: '800000',
            },
            {
              name: 'Batteries de stockage',
              description: "Système de stockage d'énergie 5kWh",
              quantity: '1',
              price: '3000000',
            },
            {
              name: 'Installation et configuration',
              description: 'Installation complète et mise en service',
              quantity: '1',
              price: '1000000',
            },
          ],
        },
      },
    }),
  ]);

  // Factures pour AgroPlus
  const invoicesForAgroPlus = await Promise.all([
    prisma.invoice.create({
      data: {
        invoiceNumber: 'AGRO-2023-001',
        name: 'Équipements Agricoles',
        date: '2023-07-05',
        amount: '15000000',
        paymentMode: PaymentMode.VIREMENT,
        status: InvoiceStatus.SENT,
        paymentCondition: PaymentCondition.SIXTY,
        tva: '18',
        clientId: clients[4].id,
        enterpriseId: enterprises[2].id,
        articles: {
          create: [
            {
              name: 'Tracteur compact',
              description: 'Tracteur compact 30CV avec accessoires',
              quantity: '1',
              price: '12000000',
            },
            {
              name: "Système d'irrigation",
              description:
                "Système d'irrigation goutte à goutte pour 2 hectares",
              quantity: '1',
              price: '3000000',
            },
          ],
        },
      },
    }),
  ]);

  // Factures pour MédiaVision
  const invoicesForMediaVision = await Promise.all([
    prisma.invoice.create({
      data: {
        invoiceNumber: 'MEDIA-2023-001',
        name: 'Production Publicitaire',
        date: '2023-08-10',
        amount: '7500000',
        paymentMode: PaymentMode.VIREMENT,
        status: InvoiceStatus.PAID,
        paymentCondition: PaymentCondition.THIRTY,
        tva: '18',
        clientId: clients[5].id,
        enterpriseId: enterprises[3].id,
        articles: {
          create: [
            {
              name: 'Spot publicitaire 30s',
              description: "Création et production d'un spot TV de 30 secondes",
              quantity: '1',
              price: '5000000',
            },
            {
              name: 'Adaptation radio',
              description: 'Adaptation du spot pour la radio',
              quantity: '1',
              price: '1500000',
            },
            {
              name: 'Diffusion TV nationale',
              description: '10 diffusions sur chaîne nationale',
              quantity: '1',
              price: '1000000',
            },
          ],
        },
      },
    }),
  ]);

  // Factures pour ConseilPro
  const invoicesForConseilPro = await Promise.all([
    prisma.invoice.create({
      data: {
        invoiceNumber: 'CONSEIL-2023-001',
        name: 'Conseil en Stratégie',
        date: '2023-09-01',
        amount: '6000000',
        paymentMode: PaymentMode.VIREMENT,
        status: InvoiceStatus.SENT,
        paymentCondition: PaymentCondition.FORTYFIVE,
        tva: '18',
        clientId: clients[6].id,
        enterpriseId: enterprises[4].id,
        articles: {
          create: [
            {
              name: 'Étude de marché',
              description: 'Analyse complète du marché et de la concurrence',
              quantity: '1',
              price: '2500000',
            },
            {
              name: 'Plan stratégique',
              description: "Élaboration d'un plan stratégique sur 3 ans",
              quantity: '1',
              price: '2000000',
            },
            {
              name: 'Accompagnement',
              description: 'Accompagnement mensuel pendant 3 mois',
              quantity: '3',
              price: '500000',
            },
          ],
        },
      },
    }),
  ]);

  console.log('Invoices created for various enterprises');

  return {
    invoicesForAbouSolutions,
    invoicesForEcoTech,
    invoicesForAgroPlus,
    invoicesForMediaVision,
    invoicesForConseilPro,
  };
}
