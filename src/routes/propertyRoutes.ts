import express from 'express';
import bodyParser from 'body-parser';
import { HttpMethods, HttpServer } from '@api';
import { PropertiesController } from '@controllers';
import { CreatePropertyDTO } from '@dtos';
import { PropertiesFilterDTO } from '@dtos';
import { PaginationOptionsDto } from 'dtos/PaginationOptionsDTO';

interface PropertiesRouterProps {
  httpServer: HttpServer;
  propertiesController: PropertiesController;
}

export const propertyRoutes = express.Router();

propertyRoutes.use(bodyParser.json());

export class PropertyRouter {
  private httpServer!: HttpServer;
  private propertiesController!: PropertiesController;

  constructor(private props: PropertiesRouterProps) {
    Object.assign(this, this.props);
  }

  async init() {
    this.httpServer.on(
      HttpMethods.GET,
      '/properties',
      async (
        params: any,
        body: any,
        filters: PropertiesFilterDTO,
        paginationOptions: PaginationOptionsDto,
      ) => {
        const response = await this.propertiesController.findAll(
          filters,
          paginationOptions,
        );
        return response;
      },
    );

    this.httpServer.on(
      HttpMethods.GET,
      '/property/:id',
      async (params: any) => {
        const response = await this.propertiesController.findOneById(params.id);
        return response;
      },
    );

    this.httpServer.on(
      HttpMethods.POST,
      '/property',
      async (params: any, body: CreatePropertyDTO) => {
        const response = await this.propertiesController.create(body);
        return response;
      },
    );

    this.httpServer.on(
      HttpMethods.PUT,
      '/property/:id',
      async (params: any, body: CreatePropertyDTO) => {
        const response = await this.propertiesController.update(
          params.id,
          body,
        );
        return response;
      },
    );

    this.httpServer.on(
      HttpMethods.DELETE,
      '/property/:id',
      async (params: any, body: CreatePropertyDTO) => {
        const response = await this.propertiesController.delete(params.id);
        return response;
      },
    );
  }
}
