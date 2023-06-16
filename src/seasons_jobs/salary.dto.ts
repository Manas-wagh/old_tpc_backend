import { IsNumber } from 'class-validator';

export class SalaryDTO {
  @IsNumber()
  CTC_1_yr: number;

  @IsNumber()
  CTC_4_yr: number;

  @IsNumber()
  stipend: number | null;
}
