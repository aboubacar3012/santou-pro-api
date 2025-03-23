import { Module } from '@nestjs/common';
import { ArticlesService } from '@/modules/articles/articles.service';
// import { ArticlesController } from '@/articles/articles.controller';

@Module({
  controllers: [
    // ArticlesController,
  ],
  providers: [ArticlesService],
  imports: [],
})
export class ArticlesModule {}
