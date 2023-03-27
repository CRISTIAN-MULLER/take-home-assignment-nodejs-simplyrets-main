import { IsNumber, IsOptional } from 'class-validator';

export class PaginationOptionsDto {
  @IsNumber()
  @IsOptional()
  perPage: number;

  @IsNumber()
  @IsOptional()
  page: number;
}
