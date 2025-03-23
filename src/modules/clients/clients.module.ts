import { Module } from '@nestjs/common';
import { ClientService } from './clients.service';
import { ClientController } from './clients.controller';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientsModule {}
