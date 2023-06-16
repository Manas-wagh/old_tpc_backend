import { seasonsJobsEventsService } from './seasons_jobs_events.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { LoggerInterceptor } from 'src/interceptor/LoggerInterceptor';
import { TransactionInterceptor } from 'src/interceptor/TransactionInterceptor';
import { eventDto } from './event.dto';

@UseInterceptors(new LoggerInterceptor())
@Controller('seasons/:season_id/jobs/:job_id/events')
export class seasonsJobsEventsController {
  constructor(private seasonsJobsEventsService: seasonsJobsEventsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  createseasonsJobsEvents(@Param('job_id') jobId: string, @Body() event: eventDto): Promise<any> {
    event.jobId = jobId;
    return this.seasonsJobsEventsService.create(event);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  getseasonsJobsEvents(@Param('job_id') jobId: string): Promise<any> {
    return this.seasonsJobsEventsService.get(jobId);
  }

  @Patch(':event_id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  updateseasonsJobsEvents(@Param() params: any, @Body() event: eventDto): Promise<any> {
    event.jobId = params.job_id;
    return this.seasonsJobsEventsService.update(params.event_id, event);
  }

  @Delete(':event_id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransactionInterceptor)
  deleteseasonsJobsEvents(@Param('event_id') eventId: string): Promise<any> {
    return this.seasonsJobsEventsService.delete(eventId);
  }
}

// /seasons/:season_id/jobs/:job_id/events
// POST: body: {}  // create event for a job
// GET: res: [{}] // get all event details of a job
// PATCH: /:event_id  // update event details
// DELETE: /:event_id // delete
