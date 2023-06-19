import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from './status.enum';

export class statusDto {
  @IsString()
  @IsOptional()
  public jobId: string;

  @IsEnum(Status)
  @IsOptional()
  public status: Status;

  @IsOptional()
  @IsString()
  public metaData: string;
}
