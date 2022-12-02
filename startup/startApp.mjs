import runner from '../test-runner.js';
import logger from '../logging/logger.mjs'

export default function (app) {
  const server = app.listen(process.env.PORT || 3000, () => {
    logger.info(`Listening on port ${server.address().port}`);
    if (process.env.NODE_ENV === 'test') {
      logger.info('Running Tests...');
      setTimeout(function () {
        try {
          runner.run();
        } catch (error) {
          logger.error('Tests are not valid', error);
        }
      }, 1500);
    }
  });
}
