export default function (app) {
  app.use(function (req, res, next) {
    res.status(404).type('text').send('Not Found');
  });
}
