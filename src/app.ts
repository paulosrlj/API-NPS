import express, { Express } from 'express';

import './database';

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.app.use(express.json());
  }
}

export default new App().app;
