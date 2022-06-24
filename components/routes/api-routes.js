const helmet = require('helmet');
const bodyParser = require('body-parser');
const validator = require('swagger-endpoint-validator');

module.exports = () => {
  const start = async ({ manifest = {}, app, config }) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // app.use(helmet());

    // await validator.init(app, config.swaggerValidator);

    app.get('/api/helloworld', (req, res) => res.json({ hello: 'world' }));

    return Promise.resolve();
  };

  return { start };
};
