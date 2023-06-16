import { Module } from '@nestjs/common';
import { databaseModule } from 'src/db/database.module';
import { ConfigService } from '@nestjs/config';
import { seasonsJobsStatusController } from './seasons_jobs_status.controller';
import { seasonsJobsStatusServices } from './seasons_jobs_status.service';

@Module({
  imports: [databaseModule],
  controllers: [seasonsJobsStatusController],
  providers: [ConfigService, seasonsJobsStatusServices],
})
export class SeasonsJobsStatusModule {}
