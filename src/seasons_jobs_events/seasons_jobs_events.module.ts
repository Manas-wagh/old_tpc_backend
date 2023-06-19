import { Module } from '@nestjs/common';
import { databaseModule } from 'src/db/database.module';
import { ConfigService } from '@nestjs/config';
import { seasonsJobsEventsController } from './seasons_jobs_events.controler';
import { seasonsJobsEventsService } from './seasons_jobs_events.service';

@Module({
  imports: [databaseModule],
  controllers: [seasonsJobsEventsController],
  providers: [ConfigService, seasonsJobsEventsService],
})
export class SeasonsJobsEventsModule {}
