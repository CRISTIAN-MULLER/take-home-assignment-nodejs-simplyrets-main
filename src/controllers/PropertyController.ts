import { PropertyService } from '@services';
import {
  CreatePropertyDTO,
  PropertiesFilterDTO,
  PropertiesResponseDto,
  UpdatePropertyDTO,
} from '@dtos';
import { ValidationService } from 'utils/Validation';
import { PaginationOptionsDto } from '@dtos';

export class PropertiesController {
  constructor(
    private propertyService: PropertyService,
    private validation: ValidationService,
  ) {}

  async findAll(
    filters: PropertiesFilterDTO,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PropertiesResponseDto> {
    try {
      const newFilters = new PropertiesFilterDTO();
      const newPagination = new PaginationOptionsDto();
      Object.assign(newFilters, filters);
      Object.assign(newPagination, paginationOptions);
      await this.validation.validate(newFilters);
      const properties = await this.propertyService.findAll(
        filters,
        paginationOptions,
      );

      return properties;
    } catch (error) {
      const response = {
        status: 400,
        response: `An error occurred while find properties`,
        error,
      };
      return response;
    }
  }

  async findOneById(propertyId: number): Promise<PropertiesResponseDto> {
    try {
      const properties = await this.propertyService.findOneById(propertyId);
      const response = {
        properties: properties,
        status: 200,
        response: 'Sucessfull response',
      };
      return response;
    } catch (error: any) {
      const response = {
        status: 400,
        response: `An error occurred while find properties`,
        error: error,
      };
      return response;
    }
  }

  async create(data: CreatePropertyDTO): Promise<PropertiesResponseDto> {
    try {
      const newProperty = new CreatePropertyDTO();
      Object.assign(newProperty, data);
      await this.validation.validate(newProperty);
      const property = await this.propertyService.create(data);
      const response = {
        properties: property,
        status: 201,
        response: 'Property created successfully',
      };
      return response;
    } catch (error) {
      const response = {
        status: 400,
        response: `An error occurred while creating a new property`,
        error,
      };
      return response;
    }
  }

  async update(
    id: number,
    data: UpdatePropertyDTO,
  ): Promise<PropertiesResponseDto> {
    try {
      const propertyId = Number(id);
      const newProperty = new UpdatePropertyDTO();
      Object.assign(newProperty, data);
      await this.validation.validate(newProperty);
      const property = await this.propertyService.update(propertyId, data);

      const response = {
        properties: property,
        status: 200,
        response: 'Property updated with success',
      };

      return response;
    } catch (error: any) {
      const response = {
        status: 400,
        response: `An error occurred while updating a property`,
        error,
      };
      return response;
    }
  }

  async delete(id: number): Promise<PropertiesResponseDto> {
    try {
      const propertyId = Number(id);
      await this.propertyService.delete(propertyId);
      const response = {
        status: 204,
        response: 'Property deleted with success.',
      };
      return response;
    } catch (error) {
      const response = {
        status: 400,
        response: `An error occurred while deleting a property`,
        error,
      };
      return response;
    }
  }
}
