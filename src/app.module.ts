import { Logger, Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
// import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaModule, QueryInfo, loggingMiddleware } from 'nestjs-prisma';
import { ArticlesModule } from '@/modules/articles/articles.module';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ClientModule } from '@/modules/client/client.module';

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
    ArticlesModule,
    UsersModule,
    AuthModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
