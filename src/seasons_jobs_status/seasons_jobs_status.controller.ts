import { seasonsJobsStatusServices } from './seasons_jobs_status.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Param, UseInterceptors, Patch, Get } from '@nestjs/common';
import { LoggerInterceptor } from 'src/interceptor/LoggerInterceptor';
import { TransactionInterceptor } from 'src/interceptor/TransactionInterceptor';
import { statusDto } from './status.dto';

@UseInterceptors(new LoggerInterceptor())
@Controller('seasons/:season_id/jobs/:job_id/status')
export class seasonsJobsStatusController {
  constructor(private seasonsJobsStatusService: seasonsJobsStatusServices) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  updateSeasonsJobsEvents(@Param('job_id') jobId: string, @Body() status: statusDto): Promise<any> {
    status.jobId = jobId;
    return this.seasonsJobsStatusService.create(status);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  getSeasonsJobsStatus(@Param('job_id') jobId: string): Promise<any> {
    return this.seasonsJobsStatusService.get(jobId);
  }
}

// /seasons/:season_id/jobs/:job_id/events
// POST: body: {}  // create event for a job
// GET: res: [{}] // get all event details of a job
// PATCH: /:event_id  // update event details
// DELETE: /:event_id // delete
