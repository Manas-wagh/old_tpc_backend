import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { statusDto } from './status.dto';
import { statusModel } from 'src/db/models/status';

@Injectable()
export class seasonsJobsStatusServices {
  configService: any;

  constructor(private config: ConfigService) {}

  async create(Status: statusDto): Promise<any> {
    try {
      const { jobId, metaData, status } = Status;
      const [statusFound, created] = await statusModel.findOrCreate({
        where: { jobId },
        defaults: { jobId, metaData, status },
      });
      if (!created) {
        const [rowsUpdated, [updatedEntity]] = await statusModel.update(Status, {
          where: { jobId },
          returning: true,
        });
        return { data: updatedEntity, status: 200 };
      } else {
        return { data: statusFound, status: 200 };
      }
    } catch (error) {
      return { status: 400, error: error };
    }
  }
  async get(jobId: string) {
    try {
      const status = await statusModel.findAll({
        where: { jobId },
      });
      return { status: 200, data: status };
    } catch (error) {
      return { status: 400, error: error };
    }
  }
}
