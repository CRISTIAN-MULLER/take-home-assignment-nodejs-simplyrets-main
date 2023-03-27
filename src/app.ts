import { ExpressAdapter, HttpServer, Router } from '@api';
import { PropertiesController } from '@controllers';
import { TypeORMPropertiesRepository } from '@repositories';
import { PropertyService } from '@services';
import { ValidationService } from '@utils';

import AppDataSource, { seedDb } from './dataSource';

export class App {
  private httpServer: HttpServer;
  private PORT: number;

  constructor() {
    this.httpServer = new ExpressAdapter();
    this.PORT = Number(process.env.PORT) || 3000;
  }

  async initializeDataSource() {
    await AppDataSource.initialize();
  }

  async initializeDataBase() {
    await seedDb();
  }

  async initializeHttpServer() {
    this.httpServer.listen(this.PORT);
  }

  async initializeRoutes() {
    // this can be used to test database like functions using a InMeory strategy
    // is helpfull to do a quick test

    //const propertiesRepository = new InMemoryPropertiesRepository();
    const propertiesRepository = new TypeORMPropertiesRepository(AppDataSource);
    const validationService = new ValidationService();
    const propertyService = new PropertyService(propertiesRepository);
    const propertiesController = new PropertiesController(
      propertyService,
      validationService,
    );

    const router = new Router(this.httpServer, propertiesController);
    router.init();
  }
}
