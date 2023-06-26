import { ForbiddenException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { jobDto } from './seasons_jobs.dto';
import { jobModel } from 'src/db/models/job';
import { companyModel } from 'src/db/models/company';
import { contactModel } from 'src/db/models/contact';
import { statusModel } from 'src/db/models/status';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { seasonModel } from 'src/db/models/season';

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
      const jobs = await statusModel.findAll({
        include: [
          {
            model: jobModel,
            include: [
              {
                model: companyModel,
                as: 'company',
              },
              {
                model: contactModel,
                as: 'contact1',
              },
              {
                model: contactModel,
                as: 'contact2',
              },
            ],
          },
        ],
      });
      const Jobs = jobs.map((job) => {
        return {
          seasonId: job.job.seasonId,
          jobId: job.job.id,
          status: job.status,
          companyName: job.job.company.name,
          imageLink: job.job.company.imageLink,
          jobDescription: job.job.jobDescription,
          hrDetails: job.job.contact1,
          assignee: job.job.contact2,
          eligibilities: [],
          type: job.job.type,
          role: job.job.role,
          descriptionOfRole: job.job.descriptionOfRole,
          filledJafLink: job.job.filledJafLink,
          salary: job.job.salary,
          core: job.job.core,
          domestic: job.job.domestic,
          metaData: job.job.metaData,
        };
      });
      return { data: Jobs, status: 200 };
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
