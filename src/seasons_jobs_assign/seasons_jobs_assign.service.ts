import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { jobModel } from 'src/db/models/job';
import { contactModel } from 'src/db/models/contact';
import { assignDto } from './seasonsAssign.dto';

@Injectable()
export class seasonsJobsAssignService {
  configService: any;

  constructor(private config: ConfigService) {}

  async update(id: string, email: string): Promise<any> {
    try {
      const assignee = await contactModel.findAll({
        where: { email },
      });
      const [rowsUpdated, [updatedEntity]] = await jobModel.update(
        { assigneeId: assignee[0].id },
        {
          where: { id },
          returning: true,
        },
      );
      return { data: updatedEntity, status: 200 };
    } catch (error) {
      return { status: 400, error: error };
    }
  }
}
