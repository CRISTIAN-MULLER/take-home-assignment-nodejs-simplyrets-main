import { IsNumber, IsOptional, IsString } from 'class-validator';
export class PropertiesFilterDTO {
  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  bedrooms?: number;

  @IsNumber()
  @IsOptional()
  bathrooms?: number;

  @IsString()
  @IsOptional()
  type?: string | null;
}
