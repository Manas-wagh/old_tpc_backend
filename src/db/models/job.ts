import { randomUUID } from 'crypto';
import sequelize from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { seasonModel } from './season';
import { companyModel } from './company';
import { contactModel } from './contact';
import { Types } from './job.enum';

@Table({
  tableName: 'job',
})
export class jobModel extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
  })
  id: typeof randomUUID;

  //
  @ForeignKey(() => seasonModel)
  @Column(sequelize.UUID)
  seasonId: string;
  @BelongsTo(() => seasonModel, 'seasonId')
  season: seasonModel;

  //
  @ForeignKey(() => companyModel)
  @Column(sequelize.UUID)
  companyId: string;
  @BelongsTo(() => companyModel, 'companyId')
  company: companyModel;

  //
  //
  @ForeignKey(() => contactModel)
  @Column(sequelize.UUID)
  hrDetails: string;
  @BelongsTo(() => contactModel, 'hrDetails')
  contact1: contactModel;

  //

  //
  @ForeignKey(() => contactModel)
  @Column(sequelize.UUID)
  assigneeId: string;
  @BelongsTo(() => contactModel, 'assigneeId')
  contact2: contactModel;

  //

  @Column(DataType.ARRAY(DataType.STRING))
  eligibilityIds: string[];

  @Column({
    type: sequelize.ENUM,
    values: Object.values(Types),
  })
  type: Types;

  @Column
  role: string;

  @Column
  descriptionOfRole: string;

  @Column
  filledJafLink: string;

  @Column
  jobDescription: string;

  @Column({
    type: sequelize.JSONB,
    defaultValue: {
      CTC_1_yr: 0,
      CTC_4_yr: 0,
      stipend: null,
    },
  })
  salary: {
    CTC_1_yr: number;
    CTC_4_yr: number;
    stipend: number | null;
  };

  @Column({ defaultValue: false })
  core: boolean;

  @Column({ defaultValue: true })
  domestic: boolean;

  @Column
  metaData: string;
}
