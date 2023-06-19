import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [seasonsJobsStatusController],
  providers: [seasonsJobsStatusService],
})
export class SeasonsJobsStatusModule {}
