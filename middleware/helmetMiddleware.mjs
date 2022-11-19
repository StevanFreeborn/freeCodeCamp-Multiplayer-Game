import helmet from 'helmet';
import nocache from 'nocache';

export default function (app) {
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(nocache());
  app.use((req, res, next) => {
    res.header('x-powered-by', 'PHP 7.4.3');
    next();
  })
}