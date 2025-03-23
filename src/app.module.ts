import { Logger, Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
// import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaModule, QueryInfo, loggingMiddleware } from 'nestjs-prisma';
import { AuthModule } from '@/modules/auth/auth.module';
import { AccountsModule } from '@/modules/accounts/accounts.module';
import { ClientsModule } from '@/modules/clients/clients.module';
import { EnterprisesModule } from './modules/enterprises/enterprises.module';
import { InvoicesModule } from './modules/invoices/invoices.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
      },
    }),
    AuthModule,
    ClientsModule,
    AccountsModule,
    EnterprisesModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
