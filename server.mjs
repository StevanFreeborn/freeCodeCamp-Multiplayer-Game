import dotenv from 'dotenv'
import setupExpress from './startup/setupExpress.mjs';
import views from './routes/views.mjs';
import fccTestingRoutes from './routes/fcctesting.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.mjs';
import startApp from './startup/startApp.mjs';
import loggingMiddleware from './middleware/loggingMiddleware.mjs';
import requestIdMiddleware from './middleware/requestIdMiddleware.mjs';
import setupSocketIO from './startup/setupSocketIO.mjs';
import helmetMiddleware from './middleware/helmetMiddleware.mjs';
dotenv.config();

let app = setupExpress();

helmetMiddleware(app);
views(app);
fccTestingRoutes(app);
requestIdMiddleware(app);
loggingMiddleware(app);
notFoundMiddleware(app);

app = setupSocketIO(app);
startApp(app);

export default app;
