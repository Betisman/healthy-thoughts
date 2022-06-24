const expect = require('expect.js');
const system = require('../system');
const supertest = require('supertest');

describe('Service Tests', () => {
	let request;
	const sys = system();

	before(async () => {
		const { app } = await sys.start();
		request = supertest(app);
	});

	after(() => sys.stop());

	it.skip('returns manifest', () =>
		request
			.get('/__/manifest')
			.expect(200)
			.then(response => {
				expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
				expect(response.headers['x-frame-options']).to.equal('SAMEORIGIN');
				expect(response.headers['x-download-options']).to.equal('noopen');
				expect(response.headers['x-dns-prefetch-control']).to.equal('off');
				expect(response.headers['x-content-type-options']).to.equal('nosniff');
				expect(response.headers['strict-transport-security']).to.equal('max-age=15552000; includeSubDomains');
			}));

});
