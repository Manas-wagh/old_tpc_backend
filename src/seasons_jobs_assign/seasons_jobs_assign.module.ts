import { Module } from '@nestjs/common';
import { databaseModule } from 'src/db/database.module';
import { ConfigService } from '@nestjs/config';
import { seasonsJobsAssignController } from './seasons_jobs_assign.controller';
import { seasonsJobsAssignService } from './seasons_jobs_assign.service';

@Module({
  imports: [databaseModule],
  controllers: [seasonsJobsAssignController],
  providers: [seasonsJobsAssignService, ConfigService],
})
export class SeasonsJobsAssignModule {}
