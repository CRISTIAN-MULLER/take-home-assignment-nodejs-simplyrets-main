import { PropertiesFilterDTO, PropertiesResponseDto } from '@dtos';
import { Property } from '@entities';
import { PropertiesRepository } from '@repositories';

import { PaginationOptionsDto } from 'dtos/PaginationOptionsDTO';

export class PropertyService {
  constructor(private propertiesRepository: PropertiesRepository) {}
  async findAll(
    filters: PropertiesFilterDTO,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PropertiesResponseDto> {
    try {
      const properties = await this.propertiesRepository.findAll(
        filters,
        paginationOptions,
      );

      return properties;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  async findOneById(propertyId: number): Promise<Property> {
    try {
      const property = await this.propertiesRepository.findOneById(propertyId);
      return property;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  async create(property: Property): Promise<Property> {
    const createdProperty = await this.propertiesRepository.create(property);
    return createdProperty;
  }

  async update(
    propertyId: number,
    property: Partial<Property>,
  ): Promise<Property> {
    try {
      const updatedProperty = await this.propertiesRepository.update(
        propertyId,
        property,
      );
      return updatedProperty;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  async delete(propertyId: number): Promise<void> {
    await this.propertiesRepository.delete(propertyId);
    return;
  }
}
