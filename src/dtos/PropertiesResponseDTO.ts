import { Property } from '@entities';

import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class PropertiesResponseDto {
  @IsObject()
  properties?: Property | Property[];

  @IsNumber()
  @IsNotEmpty()
  status?: number;

  @IsString()
  response?: string;

  @IsNumber()
  @IsNotEmpty()
  currentPage?: number;

  @IsNumber()
  @IsNotEmpty()
  totalItems?: number;

  @IsNumber()
  @IsNotEmpty()
  lastPage?: number;

  @IsNumber()
  @IsNotEmpty()
  perPage?: number;
}
