var chai = require('chai');
chai.should();

var s = require('../lib/service');

describe('All method', function () {
	var params;

	params = {
		config:{
			name:'test'
		}
	};

	it('should return hello world', function (done) {
		s.all.fn(null, params, function (err, response) {
			response.should.equal('Hello world, project test');
			done();
		});
	});
});
