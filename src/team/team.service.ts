import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { teamDto } from './team.dto';
import { ConfigService } from '@nestjs/config';
import { authModel } from 'src/db/models/auth';
import { contactModel } from 'src/db/models/contact';
import { companyModel } from 'src/db/models/company';

import { sequelizeInstance } from 'src/db/database.providers';

@Injectable()
export class teamService {
  configService: any;
  companyId: typeof randomUUID;
  companyName = 'TPC';
  constructor(private config: ConfigService) {}

  async init() {
    const results = await companyModel.findAll({ where: { name: this.companyName } });
    this.companyId = results[0].id;
  }

  async create(member: teamDto): Promise<any> {
    const { email, role } = member;
    let transaction;
    try {
      transaction = await sequelizeInstance.transaction();
      const [contactValues, authValues] = await Promise.all([
        contactModel.create({ email, role, companyId: this.companyId }),
        authModel.create({ email, role: 'MEMBER' }),
      ]);
      await transaction.commit();
      return { data: contactValues, status: 200 };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return { data: null, status: 400 };
    }
  }

  async get(): Promise<any> {
    try {
      const values = await contactModel.findAll({ where: { companyId: this.companyId } });
      return { data: values, status: 200 };
    } catch (error) {
      return { data: null, status: 400 };
    }
  }

  async update(id: typeof randomUUID, company: teamDto): Promise<any> {
    let transaction;
    try {
      transaction = await sequelizeInstance.transaction();
      const contact = await contactModel.findAll({ where: { id } });
      const [newContact, newAuth] = await Promise.all([
        contactModel.update(company, {
          where: { id },
          returning: true,
        }),
        authModel.update(
          { email: company.email, role: 'MEMBER' },
          {
            where: { email: contact[0].email },
            returning: true,
          },
        ),
      ]);
      await transaction.commit();
      return { data: newContact, status: 200 };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return { data: null, status: 400 };
    }
  }

  async delete(id: typeof randomUUID): Promise<any> {
    let transaction;
    try {
      transaction = await sequelizeInstance.transaction();
      const contact = await contactModel.findAll({ where: { id } });
      const [delContact, delAuth] = await Promise.all([
        contactModel.destroy({
          where: { id },
        }),
        authModel.destroy({
          where: { email: contact[0].email },
        }),
      ]);
      return { data: delContact, status: 200 };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return { data: null, status: 400 };
    }
  }
}
