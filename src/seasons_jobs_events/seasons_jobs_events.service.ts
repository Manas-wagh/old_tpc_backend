import { ForbiddenException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { eventDto } from './event.dto';
import { eventModel } from 'src/db/models/event';

@Injectable()
export class seasonsJobsEventsService {
  configService: any;

  constructor(private config: ConfigService) {}

  async create(event: eventDto): Promise<any> {
    try {
      const { jobId, venue, startTime, endTime, title, metaData } = event;
      const newjob = await eventModel.create({ jobId, venue, startTime, endTime, title, metaData });
      return {
        status: 200,
        data: newjob,
      };
    } catch (error) {
      return { status: 400, error: error };
    }
  }

  async get(jobId: string): Promise<any> {
    try {
      const events = await eventModel.findAll({
        where: { jobId },
      });
      return { data: events, status: 200 };
    } catch (error) {
      return { status: 400, error: error };
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const del_rows = await eventModel.destroy({
        where: {
          id,
        },
      });
      return { data: del_rows, status: 200 };
    } catch (error) {
      return { status: 400, error: error };
    }
  }

  async update(id: typeof randomUUID, event: eventDto): Promise<any> {
    try {
      const [rowsUpdated, [updatedEntity]] = await eventModel.update(event, {
        where: {
          id,
        },
        returning: true,
      });
      return { data: updatedEntity, status: 200 };
    } catch (error) {
      return { status: 400, error: error };
    }
  }
}
