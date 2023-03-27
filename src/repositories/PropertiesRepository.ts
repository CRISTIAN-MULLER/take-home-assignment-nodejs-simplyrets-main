import { PropertiesFilterDTO, PropertiesResponseDto } from '@dtos';
import { Property } from '@entities';
import { PaginationOptionsDto } from 'dtos/PaginationOptionsDTO';

export interface PropertiesRepository {
  findAll(
    filters: PropertiesFilterDTO,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PropertiesResponseDto>;
  findOneById(propertyId: number): Promise<Property>;
  create(property: Property): Promise<Property>;
  update(propertyId: number, property: Partial<Property>): Promise<Property>;
  delete(propertyId: number): Promise<void>;
}
