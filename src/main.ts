// src/main.ts

import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Middleware global
  // Utilisation de la classe ValidationPipe pour valider les données entrantes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Utilisation de la classe ClassSerializerInterceptor pour transformer les objets en JSON
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Configuration de Swagger pour générer la documentation de l'API
  const config = new DocumentBuilder()
    .setTitle('Santou Pro API')
    .setDescription('Santou Pro API - Documentation')
    .setVersion('0.1')
    .addBearerAuth()
    .addServer('http://localhost:3001')
    .addServer('https://api.template.com')
    .addTag(
      'Santou Pro',
      "L'application de facturation pour les petites entreprises et les indépendants",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Gestion des exceptions Prisma
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Démarrage de l'application
  await app.listen(3001);
}

// Initialisation de l'application
bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
