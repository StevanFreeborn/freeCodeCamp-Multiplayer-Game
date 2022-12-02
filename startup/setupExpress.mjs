import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import views from '../routes/views.mjs';
import fccTestingRoutes from '../routes/fcctesting.js';
import notFoundMiddleware from '../middleware/notFoundMiddleware.mjs';
import loggingMiddleware from '../middleware/loggingMiddleware.mjs';
import requestIdMiddleware from '../middleware/requestIdMiddleware.mjs';
import helmetMiddleware from '../middleware/helmetMiddleware.mjs';

export default function () {
  const app = express();
  app.disable('x-powered-by');
  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/shared', express.static(process.cwd() + '/shared'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: '*' }));
  helmetMiddleware(app);
  views(app);
  fccTestingRoutes(app);
  requestIdMiddleware(app);
  loggingMiddleware(app);
  notFoundMiddleware(app);
  return app;
}
