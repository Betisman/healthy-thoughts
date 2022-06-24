const Systemic = require('systemic');
const initSlack = require('./initSlack');

module.exports = new Systemic({ name: 'slack' })
	.add('slack', initSlack())
	.dependsOn('config', 'logger');
