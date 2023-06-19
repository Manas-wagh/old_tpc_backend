import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { studentModel } from 'src/db/models/student';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class seasonsStudentsServices {
  configService: any;

  constructor(private config: ConfigService) {}

  async get(SeasonId: string) {
    try {
      const [interns, placements] = await Promise.all([
        studentModel.findAll({
          where: {
            'internshipDetails.SeasonID': SeasonId,
          },
        }),
        studentModel.findAll({
          where: {
            'placementDetails.SeasonID': SeasonId,
          },
        }),
      ]);
      return { status: 200, data: { interns: interns, placements: placements } };
    } catch (error) {
      return { status: 400, error: error };
    }
  }

  async delete(id: string) {
    try {
      const del_rows = await studentModel.destroy({
        where: { id },
      });
      return { status: 200, data: del_rows };
    } catch (error) {
      return { status: 400, error: error };
    }
  }
}
