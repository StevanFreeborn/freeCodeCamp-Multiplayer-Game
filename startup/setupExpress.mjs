import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

export default function () {
  const app = express();
  
  app.disable('x-powered-by');

  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/assets', express.static(process.cwd() + '/assets'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors({ origin: '*' }));
  
  return app;
}
