import { ForbiddenException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { jobDto } from './seasons_jobs.dto';
import { jobModel } from 'src/db/models/job';

@Injectable()
export class seasonsJobsService {
  configService: any;

  constructor(private config: ConfigService) {}

  async create(job: jobDto): Promise<any> {
    try {
      const { hrDetails, assigneeId, eligibilityIds, seasonId, companyId } = job;
      const newjob = await jobModel.create({ hrDetails, assigneeId, eligibilityIds, seasonId, companyId });
      return {
        status: 200,
        data: newjob,
      };
    } catch (error) {
      return { status: 400, error: error };
    }
  }

  async get(seasonId: string): Promise<any> {
    try {
      const jobs = await jobModel.findAll({
        where: { seasonId },
      });
      return { data: jobs, status: 200 };
    } catch (error) {
      return { status: 400, error: error };
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const del_rows = await jobModel.destroy({
        where: {
          id,
        },
      });
      return { data: del_rows, status: 200 };
    } catch (error) {
      return { status: 400, error: error };
    }
  }

  async update(id: typeof randomUUID, job: jobDto): Promise<any> {
    try {
      const [rowsUpdated, [updatedEntity]] = await jobModel.update(job, {
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
