import { PropertiesController } from '@controllers';
import { PropertiesFilterDTO } from '@dtos';
import { Property } from '@entities';
import { InMemoryPropertiesRepository } from '@repositories';
import { PropertyService } from '@services';
import { ValidationService } from '@utils';
import { PaginationOptionsDto } from 'dtos/PaginationOptionsDTO';

const mockProperty: Property = {
  address: 'address',
  price: 1000000,
  bedrooms: 5,
  bathrooms: 5,
  type: 'SmallHouse',
};

let createdProperty: any;

describe('PropertiesController Unit Test', () => {
  const repository = new InMemoryPropertiesRepository();
  const service = new PropertyService(repository);
  const validation = new ValidationService();
  let controller = new PropertiesController(service, validation);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a property', async () => {
    const reponse = await controller.create(mockProperty);
    createdProperty = reponse.properties!;
    expect(reponse).toEqual({
      properties: {
        id: expect.any(Number),
        ...mockProperty,
      },
      response: expect.stringContaining('Property created successfully'),
      status: 201,
    });
  });

  it('should not create a property with wrong data', async () => {
    const invalidProperty = new Property();
    expect(await controller.create(invalidProperty)).toEqual({
      error: expect.any(Array),
      response: expect.stringContaining(
        'An error occurred while creating a new property',
      ),
      status: 400,
    });
  });

  it('should findOneById', async () => {
    expect(await controller.findOneById(createdProperty.id)).toEqual({
      properties: {
        id: expect.any(Number),
        ...mockProperty,
      },
      response: expect.stringContaining('Sucessfull response'),
      status: 200,
    });
  });

  it('should throw error when findOneById with wrong ID', async () => {
    const randomId = Math.floor(Math.random() * 100);
    expect(await controller.findOneById(randomId)).toEqual({
      error: expect.stringContaining('Property not found'),
      response: expect.stringContaining(
        'An error occurred while find properties',
      ),
      status: 400,
    });
  });

  it('should findAll', async () => {
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

    expect(await controller.findAll(filters, paginationOptions)).toMatchObject({
      properties: [
        {
          id: expect.any(Number),
          ...mockProperty,
        },
      ],
      response: expect.stringContaining('Sucessfull response'),
      status: 200,
    });
  });

  it('should update', async () => {
    expect(
      await controller.update(createdProperty.id, {
        price: 20000,
      }),
    ).toMatchObject({
      properties: {
        id: createdProperty.id,
        ...mockProperty,
        price: 20000,
      },
      response: expect.stringContaining('Property updated with success'),
      status: 200,
    });
  });

  it('should throw error when update with wrong ID', async () => {
    const randomId = Math.floor(Math.random() * 100);
    expect(
      await controller.update(randomId, {
        price: 20000,
      }),
    ).toEqual({
      error: expect.stringContaining('Property not found'),
      response: expect.stringContaining(
        'An error occurred while updating a property',
      ),
      status: 400,
    });
  });

  it('should delete', async () => {
    expect(await controller.delete(createdProperty.id)).resolves;
  });

  it('should throw error when delete with wrong ID', async () => {
    const randomId = Math.floor(Math.random() * 100);
    expect(await controller.delete(randomId)).toEqual({
      error: expect.stringContaining('Property not found'),
      response: expect.stringContaining(
        'An error occurred while deleting a property',
      ),
      status: 400,
    });
  });
});
