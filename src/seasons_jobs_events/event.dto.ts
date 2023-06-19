import { IsString, IsOptional, IsDateString } from 'class-validator';

export class eventDto {
  @IsString()
  @IsOptional()
  public jobId: string;

  @IsString()
  @IsOptional()
  public title: string;

  @IsOptional()
  @IsString()
  public venue: string;

  @IsOptional()
  @IsDateString()
  public startTime: Date;

  @IsOptional()
  @IsDateString()
  public endTime: Date;

  @IsOptional()
  @IsString()
  public metaData: string;
}
