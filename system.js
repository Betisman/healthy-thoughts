const System = require('systemic');
const { join } = require('path');

module.exports = () =>
  new System({ name: 'healthy-thoughts' })
  .bootstrap(join(__dirname, 'components'));

