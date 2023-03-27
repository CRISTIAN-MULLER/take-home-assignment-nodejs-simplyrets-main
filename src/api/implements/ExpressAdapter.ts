import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { HttpMethods, HttpServer } from '@api';

export class ExpressAdapter implements HttpServer {
  app: Express;

  constructor() {
    this.app = express();

    //Helmet can help protect our app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    this.app.use(helmet());

    //It can help to provide an extra layer of security to reduce server fingerprinting.
    this.app.disable('x-powered-by');

    //enable cors to block connection from unknow origins
    const corsOptions = {
      origin: 'http://localhost',
      optionsSuccessStatus: 200,
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }
  on(method: HttpMethods, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const urlParams = req.params;
      const body = req.body;
      const { perPage, page, price, bedrooms, bathrooms, ...rest } = req.query;

      const paginationOptions = {
        perPage: Number(perPage) || 10,
        page: Number(page) || 1,
      };
      const filters = {
        price: Number(price) || undefined,
        bedrooms: Number(bedrooms) || undefined,
        bathrooms: Number(bathrooms) || undefined,
        ...rest,
      };

      const response = await callback(
        urlParams,
        body,
        filters,
        paginationOptions,
      );
      res.json(response);
    });
  }
  listen(port: number): void {
    this.app.listen(port, () =>
      console.log(`server running on http://localhost:${port}`),
    );
  }
}
