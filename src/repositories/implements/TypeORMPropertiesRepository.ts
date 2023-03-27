import { PropertiesFilterDTO, PropertiesResponseDto } from '@dtos';
import { Property } from '@entities';
import { PropertiesRepository } from '@repositories';
import { PaginationOptionsDto } from 'dtos/PaginationOptionsDTO';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

export class TypeORMPropertiesRepository implements PropertiesRepository {
  private propertyRepository: Repository<Property>;
  private queryBuilder: SelectQueryBuilder<Property>;
  constructor(private dataSource: DataSource) {
    this.propertyRepository = dataSource.getRepository(Property);
  }

  async findAll(
    filters: PropertiesFilterDTO,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PropertiesResponseDto> {
    // typeorm will sanitize all properties because we are no using raw query
    // no problem with sql injection here
    this.queryBuilder = this.propertyRepository.createQueryBuilder('property');
    if (filters.address) {
      this.queryBuilder.andWhere('property.address like :address', {
        address: `%${filters.address}%`,
      });
    }

    if (filters.price) {
      this.queryBuilder.andWhere('property.price = :price', {
        price: filters.price,
      });
    }
    if (filters.bedrooms) {
      this.queryBuilder.andWhere('property.bedrooms = :bedrooms', {
        bedrooms: filters.bedrooms,
      });
    }
    if (filters.bathrooms) {
      this.queryBuilder.andWhere('property.bathrooms = :bathrooms', {
        bathrooms: filters.bathrooms,
      });
    }

    if (filters.type) {
      this.queryBuilder.andWhere('property.type = :type', {
        type: filters.type,
      });
    }

    const skip =
      paginationOptions.perPage * paginationOptions.page -
      paginationOptions.perPage;

    this.queryBuilder.take(paginationOptions.perPage);
    this.queryBuilder.skip(skip);

    const total = await this.queryBuilder.getCount();
    const lastPagee = Math.ceil(total / paginationOptions.perPage);

    const properties: Property[] = await this.queryBuilder.getMany();

    const response: PropertiesResponseDto = {
      properties: properties,
      status: 200,
      response: 'Sucessfull response',
      currentPage: paginationOptions.page,
      perPage: paginationOptions.perPage,
      lastPage: lastPagee,
      totalItems: total,
    };
    return response;
  }

  async findOneById(propertyId: number): Promise<Property> {
    const property = await this.propertyRepository.findOneByOrFail({
      id: propertyId,
    });

    return property;
  }

  async create(property: Property): Promise<Property> {
    let newProperty = await this.propertyRepository.create(property);
    newProperty = await this.propertyRepository.save(newProperty);
    return newProperty;
  }

  async update(propertyId: number, property: Property): Promise<Property> {
    let foundProperty = await this.propertyRepository.findOneByOrFail({
      id: propertyId,
    });

    foundProperty = await this.propertyRepository.save(
      Object.assign(foundProperty!, property),
    );
    return foundProperty;
  }

  async delete(propertyId: number): Promise<void> {
    await this.propertyRepository.delete({
      id: propertyId,
    });
  }
}
