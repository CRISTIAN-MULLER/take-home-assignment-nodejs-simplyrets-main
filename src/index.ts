import 'module-alias/register';
import { App } from './app';

const app = new App();

(async () => {
  try {
    await app.initializeDataSource();
    console.log('Database connected');

    await app.initializeDataBase();
    console.log('Database populated with test data');
    //initialize routes
    await app.initializeRoutes();

    //initialize server
    await app.initializeHttpServer();
  } catch (error) {
    console.error('Failed to start the server', error);
    process.exit(1);
  }
})();
