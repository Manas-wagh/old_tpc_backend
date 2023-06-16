import { IsNotEmpty, IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class companiesContactDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  @Length(10, 15, { message: 'Phone Number has to be between 10 to 15 characters ' })
  public primaryNumber?: string;

  @IsString()
  @IsOptional()
  @Length(10, 15, { message: 'Phone Number has to be between 10 to 15 characters ' })
  public secondaryNumber?: string;

  @IsString()
  public role: string;
}
