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
    it('should create a property successfully', async () => {
      const { body, status } = await request(httpServer)
        .post('/property')
        .send(mockProperty)
        .expect('Content-Type', /json/);
      expect(status).toBe(201);
      expect(body.response).toBeDefined();
      expect(body.error).not.toBeDefined();
      createdPropertyId = body.properties.id;
    });

    it('should not create a property with worng data values', async () => {
      const { body, status } = await request(httpServer)
        .post('/property')
        .send({ ...mockProperty, price: '1000' })
        .expect('Content-Type', /json/);
      expect(status).toBe(400);
      expect(body.error).toBeDefined();
    });

    it('should return all properties', async () => {
      const { body, status } = await request(httpServer).get('/properties');
      expect(status).toBe(200);
      expect(body.response).toBeDefined();
      expect(body.error).not.toBeDefined();
    });

    it('should fails returning properties with wrong filters', async () => {
      const { body, status } = await request(httpServer).get(
        '/properties?price=text',
      );
      expect(status).toBe(400);
      expect(body.error).toBeDefined();
    });

    it('should return a property using Id', async () => {
      const { body, status } = await request(httpServer).get(
        `/property/${createdPropertyId}`,
      );
      expect(status).toBe(200);
      expect(body.response).toBeDefined();
      expect(body.error).not.toBeDefined();
    });

    it('should fails returning a property using wrong Id', async () => {
      const { body, status } = await request(httpServer).get(
        `/property/${100000}`,
      );
      expect(status).toBe(400);
      expect(body.error).toBeDefined();
    });

    it('should update a property successfully', async () => {
      const { body, status } = await request(httpServer)
        .put(`/property/${createdPropertyId}`)
        .send({ ...mockProperty, address: 'new address' })
        .expect('Content-Type', /json/);
      expect(status).toBe(200);
      expect(body.response).toBeDefined();
      expect(body.error).not.toBeDefined();
    });

    it('should fails updating a property with wrong data', async () => {
      const { body, status } = await request(httpServer)
        .put(`/property/${createdPropertyId}`)
        .send({ ...mockProperty, bedrooms: '5' })
        .expect('Content-Type', /json/);
      expect(status).toBe(400);
      expect(body.error).toBeDefined();
    });

    it('should delete a property successfully', async () => {
      const { body, status } = await request(httpServer).delete(
        `/property/${createdPropertyId}`,
      );
      expect(status).toBe(204);
    });

    it('should fails delting a property with wrong data', async () => {
      const { body, status } = await request(httpServer).delete(
        `/property/${100000}`,
      );
      expect(status).toBe(400);
      expect(body.error).toBeDefined();
    });
  });
});
