import { IsEmail } from 'class-validator';

export class assignDto {
  @IsEmail()
  public email: string;
}
