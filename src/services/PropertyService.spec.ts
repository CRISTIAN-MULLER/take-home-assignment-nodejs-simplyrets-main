import { PropertyService } from '@services';
import { InMemoryPropertiesRepository } from '@repositories';
import { Property } from '@entities';
import { PaginationOptionsDto } from '../dtos/PaginationOptionsDTO';
import { PropertiesFilterDTO } from '@dtos';

const mockProperty: Property = {
  address: 'address',
  price: 1000000,
  bedrooms: 5,
  bathrooms: 5,
  type: 'SmallHouse',
};

let createdPropertyId: number = 0;

describe('PropertyService Unit Test', () => {
  const repository = new InMemoryPropertiesRepository();
  const service = new PropertyService(repository);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a property', async () => {
    const repoSpy = jest.spyOn(service, 'create');
    const createdProperty = await service.create(mockProperty);
    createdPropertyId = createdProperty.id!;
    expect(createdProperty).toEqual({
      id: expect.any(Number),
      ...mockProperty,
    });
    expect(repoSpy).toHaveBeenCalledTimes(1);
  });

  it('should get all properties', async () => {
    const filters: PropertiesFilterDTO = {
      address: 'address',
      price: 1000000,
      bedrooms: 5,
      bathrooms: 5,
      type: 'SmallHouse',
    };
    const paginationOptions: PaginationOptionsDto = {
      page: 1,
      perPage: 5,
    };
    const repoSpy = jest.spyOn(service, 'findAll');
    expect(await service.findAll(filters, paginationOptions)).toEqual({
      properties: expect.any(Array),
      currentPage: paginationOptions.page,
      perPage: paginationOptions.perPage,
      response: 'Sucessfull response',
      status: 200,
      totalItems: 11,
      lastPage: 3,
    });
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toBeCalledWith(filters, paginationOptions);
  });

  it('should get property by given id', async () => {
    const repoSpy = jest.spyOn(service, 'findOneById');
    expect(await service.findOneById(createdPropertyId)).toEqual({
      id: createdPropertyId,
      ...mockProperty,
    });
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toBeCalledWith(createdPropertyId);
  });

  it('should throw Error if the given ID is invalid on findOneById', async () => {
    const repoSpy = jest.spyOn(service, 'findOneById');
    const randomId = Math.floor(Math.random() * 100);

    await expect(service.findOneById(randomId)).rejects.toThrowError(
      'Property not found',
    );
    expect(repoSpy).toHaveBeenCalledTimes(2);
    expect(repoSpy).toHaveBeenCalledWith(randomId);
  });

  it('should update a property', async () => {
    const repoSpy = jest.spyOn(service, 'update');
    const updatedProperty: Property = {
      ...mockProperty,
      address: 'update address',
    };

    expect(await service.update(createdPropertyId, updatedProperty)).toEqual({
      id: createdPropertyId,
      ...updatedProperty,
    });
    expect(repoSpy).toHaveBeenCalledTimes(1);
  });

  it('should delete a property', async () => {
    const repoSpy = jest.spyOn(service, 'delete');

    expect(await service.delete(createdPropertyId)).resolves;
    expect(repoSpy).toHaveBeenCalledTimes(1);
  });
});
