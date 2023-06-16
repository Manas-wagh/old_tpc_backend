import { Module } from '@nestjs/common';
import { databaseModule } from 'src/db/database.module';
import { seasonsJobsService } from './seasons_jobs.service';
import { seasonsJobsController } from './seasons_jobs.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [databaseModule],
  controllers: [seasonsJobsController],
  providers: [ConfigService, seasonsJobsService],
})
export class SeasonsJobsModule {}
