import { IsNotEmpty, IsString, IsArray, IsBoolean, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from './types.enum';
import { SalaryDTO } from './salary.dto';

export class jobDto {
  @IsString()
  @IsOptional()
  public seasonId: string;

  @IsNotEmpty()
  @IsString()
  public companyId: string;

  @IsNotEmpty()
  @IsString()
  public hrDetails: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public assigneeId: string;

  @IsArray()
  @IsOptional()
  public eligibilityIds: string[];

  @IsEnum(Types)
  @IsOptional()
  public type: Types;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  descriptionOfRole: string;

  @IsString()
  @IsOptional()
  filledJafLink: string;

  @IsString()
  @IsOptional()
  jobDescription: string;

  @ValidateNested()
  @Type(() => SalaryDTO)
  @IsOptional()
  salary: SalaryDTO;

  @IsBoolean()
  @IsOptional()
  public core: boolean;

  @IsBoolean()
  @IsOptional()
  public domestic: boolean;

  @IsString()
  @IsOptional()
  public metadata: string;
}
