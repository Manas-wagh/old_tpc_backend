import { seasonsJobsService } from './seasons_jobs.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Delete,
  ForbiddenException,
  UnauthorizedException,
  Param,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { LoggerInterceptor } from 'src/interceptor/LoggerInterceptor';
import { TransactionInterceptor } from 'src/interceptor/TransactionInterceptor';
import { randomUUID } from 'crypto';
import { jobDto } from './seasons_jobs.dto';

@UseInterceptors(new LoggerInterceptor())
@Controller('seasons/:season_id/jobs')
export class seasonsJobsController {
  constructor(private seasonsJobsService: seasonsJobsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  createseasonsJobs(@Param('season_id') seasonId: string, @Body() job: jobDto): Promise<any> {
    job.seasonId = seasonId;
    return this.seasonsJobsService.create(job);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  getseasonsJobs(@Param('season_id') seasonId: string): Promise<any> {
    return this.seasonsJobsService.get(seasonId);
  }

  @Patch(':job_id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  updateseasonsJobs(@Param() params: any, @Body() job: jobDto): Promise<any> {
    job.seasonId = params.season_id;
    return this.seasonsJobsService.update(params.job_id, job);
  }

  @Delete(':job_id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  deleteseasonsJobs(@Param('job_id') jobId: string): Promise<any> {
    return this.seasonsJobsService.delete(jobId);
  }
}

// /seasons/:season_id/jobs
// POST: body: { company_id: string, contact_ids: string[], eligibility_ids: string[] }
// create a new job in given season
// GET: res: [{id: uuid, }]  // get all jobs for a season
// PATCH: /:job_id | body: {} // update a job
// DELETE: /:job_id // delete a job
