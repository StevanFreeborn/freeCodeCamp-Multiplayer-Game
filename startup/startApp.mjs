import runner from '../test-runner.js';

export default function (app) {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${server.address().port}`);
    if (process.env.NODE_ENV === 'test') {
      console.log('Running Tests...');
      setTimeout(function () {
        try {
          runner.run();
        } catch (error) {
          console.log('Tests are not valid:');
          console.error(error);
        }
      }, 1500);
    }
  });
}
