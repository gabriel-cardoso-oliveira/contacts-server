/* eslint-disable global-require */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import http from 'http';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      req.io = this.io;

      next();
    });
  }

  routes() {
    this.app.use(routes);
    this.app.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Intenal server error' });
    });
  }
}

export default new App().server;
