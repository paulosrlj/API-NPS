import express, { Express } from 'express';

import './database';

import routes from './routes';

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', routes);
  }
}

export default new App().app;
