import { App } from '../../app';
import request from 'supertest';
import { Property } from '@entities';

const app = new App();

const httpServer = 'http://localhost:3000';

const mockProperty: Property = {
  address: 'address',
  price: 1000000,
  bedrooms: 5,
  bathrooms: 5,
  type: 'SmallHouse',
};

let createdPropertyId: number = 0;

describe('propertyRoutes', () => {
  beforeAll(async () => {
    await app.initializeDataSource();
    await app.initializeDataBase();
    await app.initializeRoutes();
    await app.initializeHttpServer();
  });

  describe('Properties Controller (e2e)', () => {
    it('should return all properties', async () => {
      const response = await request(httpServer).get('/properties');
      expect(response.status).toBe(200);
    });

    it('should create a property successfully', async () => {
      const { body } = await request(httpServer)
        .post('/property')
        .send(mockProperty)
        .expect('Content-Type', /json/);
      expect(body.status).toBe(201);
      expect(body.response).toBeDefined();
      expect(body.error).not.toBeDefined();
    });
  });
});
