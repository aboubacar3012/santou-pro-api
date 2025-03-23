import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('docs')
@ApiTags('Docs')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDoc(): string {
    return this.appService.getDoc();
  }
}
