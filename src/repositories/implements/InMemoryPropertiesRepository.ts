import { PropertiesRepository } from '@repositories';
import { Property } from '@entities';
import { PropertiesFilterDTO, PropertiesResponseDto } from '@dtos';
import { PaginationOptionsDto } from 'dtos/PaginationOptionsDTO';

export class InMemoryPropertiesRepository implements PropertiesRepository {
  private propertiesData: Property[] = [
    {
      id: 41,
      address: '2976 North British Colony Lndg #12306',
      price: 17236623,
      bedrooms: 3,
      bathrooms: 5,
      type: 'Townhouse',
    },
    {
      id: 42,
      address: '20349 North LOST SPRING Fwy #27536',
      price: 1066737,
      bedrooms: 2,
      bathrooms: 1,
      type: 'Townhouse',
    },
    {
      id: 43,
      address: '74434 East Sweet Bottom Br #18393',
      price: 20714261,
      bedrooms: 2,
      bathrooms: 5,
      type: null,
    },
    {
      id: 44,
      address: '8369 West MAJESTY STREET Path #1765',
      price: 9375751,
      bedrooms: 3,
      bathrooms: 6,
      type: null,
    },
    {
      id: 45,
      address: '90678 South VELLUM Extension #6A2',
      price: 12104869,
      bedrooms: 5,
      bathrooms: 4,
      type: null,
    },
    {
      id: 46,
      address: '34149 East GRANICUS Mews #I-7',
      price: 7857291,
      bedrooms: 6,
      bathrooms: 2,
      type: 'Condominium',
    },
    {
      id: 47,
      address: '21366 South Creek Mist Bluff #I-7',
      price: 13685168,
      bedrooms: 2,
      bathrooms: 3,
      type: 'Condominium',
    },
    {
      id: 48,
      address: '89810 East Running Doe Knoll #709S',
      price: 20764446,
      bedrooms: 5,
      bathrooms: 1,
      type: 'Townhouse',
    },
    {
      id: 49,
      address: '96294 West BEAD GRASS TER Gate #4059',
      price: 17450668,
      bedrooms: 1,
      bathrooms: 5,
      type: null,
    },
    {
      id: 50,
      address: '39781 West Old Woman Springs Rd Drive #APT 2B',
      price: 10114945,
      bedrooms: 6,
      bathrooms: 2,
      type: 'Condominium',
    },
  ];

  findAll(
    filters: PropertiesFilterDTO,
    paginationOptions: PaginationOptionsDto,
  ): Promise<PropertiesResponseDto> {
    const total = this.propertiesData.length;
    const lastPagee = Math.ceil(total / paginationOptions.perPage);

    paginationOptions.perPage;
    const properties = [...this.propertiesData];
    const response: PropertiesResponseDto = {
      properties: properties,
      status: 200,
      response: 'Sucessfull response',
      currentPage: paginationOptions.page,
      perPage: paginationOptions.perPage,
      lastPage: lastPagee,
      totalItems: total,
    };
    return Promise.resolve(response);
  }

  findOneById(propertyId: number): Promise<Property> {
    const foundProperty = this.propertiesData.find(
      (property) => property.id === propertyId,
    );
    return new Promise((resolve, reject) => {
      if (foundProperty) {
        resolve(foundProperty);
      }
      reject('Property not found');
    });
  }

  create(property: Property): Promise<Property> {
    const id = Math.floor(Math.random() * 100);
    property = { id, ...property };

    this.propertiesData.push(property);
    return Promise.resolve(property);
  }

  update(propertyId: number, property: Property): Promise<Property> {
    let updatedProperty: Property;
    const propertiesData = this.propertiesData.map((propertyData) => {
      if (propertyData.id === propertyId) {
        Object.assign(propertyData, property);
        updatedProperty = propertyData;
        return updatedProperty;
      }
      return property;
    });

    return new Promise((resolve, reject) => {
      if (updatedProperty) {
        this.propertiesData = propertiesData;
        resolve(updatedProperty);
      }
      reject('Property not found');
    });
  }

  delete(propertyId: number): Promise<void> {
    let deletedProperty: Property;

    const filteredProperties = this.propertiesData.filter((property) => {
      if (property.id === propertyId) {
        deletedProperty = property;
        return;
      }
      return property;
    });

    return new Promise((resolve, reject) => {
      if (deletedProperty) {
        this.propertiesData = filteredProperties;
        resolve();
      }
      reject('Property not found');
    });
  }
}
