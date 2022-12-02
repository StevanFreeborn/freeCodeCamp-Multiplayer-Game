import dotenv from 'dotenv'
import setupExpress from './startup/setupExpress.mjs';
import startApp from './startup/startApp.mjs';
import setupSocketIO from './startup/setupSocketIO.mjs';
dotenv.config();

let app = setupExpress();
app = setupSocketIO(app);

startApp(app);

export default app;
