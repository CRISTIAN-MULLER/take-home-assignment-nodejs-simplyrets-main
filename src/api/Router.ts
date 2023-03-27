import { HttpServer } from './HttpServer';
import { PropertyRouter } from '@routes';
import { PropertiesController } from '@controllers';

export class Router {
  constructor(
    private httpServer: HttpServer,
    private propertiesController: PropertiesController,
  ) {}
  async init() {
    new PropertyRouter({
      httpServer: this.httpServer,
      propertiesController: this.propertiesController,
    }).init();
  }
}
