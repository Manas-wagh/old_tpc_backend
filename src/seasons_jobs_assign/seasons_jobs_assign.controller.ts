import { seasonsJobsAssignService } from './seasons_jobs_assign.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Param, UseInterceptors, Patch, Get } from '@nestjs/common';
import { LoggerInterceptor } from 'src/interceptor/LoggerInterceptor';
import { TransactionInterceptor } from 'src/interceptor/TransactionInterceptor';
import { assignDto } from './seasonsAssign.dto';

@UseInterceptors(new LoggerInterceptor())
@Controller('seasons/:season_id/jobs/:job_id/assign')
export class seasonsJobsAssignController {
  constructor(private seasonsJobsAssignService: seasonsJobsAssignService) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  SeasonsJobsAssign(@Param('job_id') jobId: string, @Body() assignee: assignDto): Promise<any> {
    return this.seasonsJobsAssignService.update(jobId, assignee.email);
  }
}

// /seasons/:season_id/jobs/:job_id/assign
// POST: {email: string} // assign a company to tpc member using email
