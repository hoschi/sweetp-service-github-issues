var should = require('chai').should();
var nock = require('nock');
var _ = require('lodash');

var s = require('../src/service');

describe('Get credentials', function() {
    var params;

    params = {
        url: 'http://my-not-existing-localhost:42',
        config: {
            name: 'test',
            github_issues: {}
        }
    };

    it('should work without configuration.', function(done) {
        nock(params.url)
            .get('/services/' + params.config.name + '/' + s.defaultCredentialService + "?key=github")
            .reply(200, {
                service: {
                    username: 'foo',
                    password: 'bar'
                }
            });

        s.getCredentials(params, function(err, credentials) {
            should.not.exist(err);
            credentials.username.should.equal('foo');
            credentials.password.should.equal('bar');

            done();
        });
    });

    it('should work with specified key set.', function(done) {
        params.config.github_issues.auth = {
            key: 'foobar'
        };

        nock(params.url)
            .get('/services/' + params.config.name + '/' + s.defaultCredentialService + "?key=foobar")
            .reply(200, {
                service: {
                    username: 'foo',
                    password: 'bar'
                }
            });

        s.getCredentials(params, function(err, credentials) {
            should.not.exist(err);
            credentials.username.should.equal('foo');
            credentials.password.should.equal('bar');

            done();
        });
    });

    it('should work with specified project name set.', function(done) {
        params.config.github_issues.auth = {
            project: 'foobar'
        };

        nock(params.url)
            .get('/services/' + 'foobar' + '/' + s.defaultCredentialService + "?key=github")
            .reply(200, {
                service: {
                    username: 'foo',
                    password: 'bar'
                }
            });

        s.getCredentials(params, function(err, credentials) {
            should.not.exist(err);
            credentials.username.should.equal('foo');
            credentials.password.should.equal('bar');

            done();
        });
    });

    it('should work with specified service set.', function(done) {
        params.config.github_issues.auth = {
            service: 'foobar'
        };

        nock(params.url)
            .get('/services/' + params.config.name + '/' + 'foobar' + "?key=github")
            .reply(200, {
                service: {
                    username: 'foo',
                    password: 'bar'
                }
            });

        s.getCredentials(params, function(err, credentials) {
            should.not.exist(err);
            credentials.username.should.equal('foo');
            credentials.password.should.equal('bar');

            done();
        });
    });
});

describe('Get params', function() {
    it('should not touch params without defaults or overrides.', function() {
        var test, modifiedParams;

        test = {
            foo: 'bar'
        };

        modifiedParams = s.getParams(test);
        modifiedParams.should.eql({
            foo: 'bar'
        });
    });

    it('should remove null properties.', function() {
        var test, modifiedParams;

        test = {
            foo: 'bar',
            bar: null
        };

        modifiedParams = s.getParams(test);
        modifiedParams.should.eql({
            foo: 'bar'
        });
    });

    it('should delete config.', function() {
        var test, modifiedParams;

        test = {
            foo: 'bar',
            config: {}
        };

        modifiedParams = s.getParams(test);
        modifiedParams.should.eql({
            foo: 'bar'
        });
    });

    it('can apply overrides.', function() {
        var test, modifiedParams;

        test = {
            foo: 'bar',
            dont: false,
            foobar: null
        };

        modifiedParams = s.getParams(test, {
            foo: 'foo',
            addme: 'a'
        });
        modifiedParams.should.eql({
            // has new value
            foo: 'foo',
            // added value
            addme: 'a',
            // not touched
            dont: false,
        });
    });

    it('can apply defaults.', function() {
        var test, modifiedParams;

        test = {
            foo: 'bar',
            dont: false,
            foobar: null
        };

        modifiedParams = s.getParams(test, undefined, {
            foo: 'foo',
            addme: 'a'
        });
        modifiedParams.should.eql({
            // not touched, already has a value
            foo: 'bar',
            // added value
            addme: 'a',
            // not touched
            dont: false,
        });
    });

    it('should override provided defaults.', function() {
        var test, modifiedParams;

        test = {
            foo: 'bar',
            dont: false,
            foobar: null
        };

        modifiedParams = s.getParams(test, {
            addme: 'b'
        }, {
            addme: 'a'
        });
        modifiedParams.should.eql({
            // not touched, already has a value
            foo: 'bar',
            // added value
            addme: 'b',
            // not touched
            dont: false,
        });
    });

    it('should be read only.', function() {
        var test, modifiedParams;

        test = {
            foo: 'bar'
        };

        modifiedParams = s.getParams(test, {
            foo: 'foo'
        });
        modifiedParams.foo.should.equal('foo');
        // still the same
        test.should.eql({
            foo: 'bar'
        });
    });
});

describe('Transform ticket response', function() {
    it('should handle no ticket at all.', function() {
        should.not.exist(s.transformTicketResponse());
        should.not.exist(s.transformTicketResponse(null));
    });

    it('should copy values as they are.', function() {
        s.transformTicketResponse({}).should.eql({});
        s.transformTicketResponse({
            body: null
        }).should.eql({
            description: null
        });
        s.transformTicketResponse({
            body: ''
        }).should.eql({
            description: ''
        });
        s.transformTicketResponse({
            body: 'foo'
        }).should.eql({
            description: 'foo'
        });

        s.transformTicketResponse({
            title: null
        }).should.eql({
            title: null
        });
        s.transformTicketResponse({
            title: ''
        }).should.eql({
            title: ''
        });
        s.transformTicketResponse({
            title: 'foo'
        }).should.eql({
            title: 'foo'
        });
    });

    it('should only pick certain properties.', function() {
        var completeGithubTicket;

        completeGithubTicket = require('fixtures/complete_github_ticket.js');

        s.transformTicketResponse(completeGithubTicket).should.eql({
            description: "I'm having a problem with this.",
            number: 1347,
            state: "open",
            title: "Found a bug"
        });
    });
});

describe('Service method to fetch all tickets', function() {
    var baseParams;

    baseParams = {
        url: 'http://localhost:8800',
        config: {
            name: 'test-github-issues',
            github_issues: {
                user: 'sweetp',
                repo: 'dashboard'
            }
        }
    };

    it("doesn't handle errors.", function(done) {
        s.all(true, undefined, function(err) {
            err.should.equal(true);
            done();
        });
    });

    it('should fetch all tickets by default.', function(done) {
		var params;
		params = _.cloneDeep(baseParams);

		//nock.recorder.rec({ dont_print:true });
		require('fixtures/method_all.js');
        s.all(null, params, function(err, data) {
            should.not.exist(err);
            data.should.has.length(30);
            data[0].title.should.equal('commit widget bug');
            should.not.exist(data[0].html_url);

			//var fs = require('fs');
			//fs.writeFileSync('fixtures/method_all.js', "var nock = require('nock');\n" + nock.recorder.play().join('\n'));
            done();
        });

    });

    it('should be able to fetch all properties.', function(done) {
		var params;
		params = _.cloneDeep(baseParams);
		params.withAllProperties = 'true';

		//nock.recorder.rec({ dont_print:true });
		require('fixtures/method_all_with_all_props.js');
        s.all(null, params, function(err, data) {
            should.not.exist(err);
            data.should.has.length(30);
            data[0].title.should.equal('commit widget bug');
            data[0].html_url.should.equal('https://github.com/sweetp/dashboard/issues/33');

			//var fs = require('fs');
			//fs.writeFileSync('fixtures/method_all_with_all_props.js', "var nock = require('nock');\n" + nock.recorder.play().join('\n'));
            done();
        });

    });

    it('should has a param to fetch tickets with a different state (open).', function(done) {
		var params;
		params = _.cloneDeep(baseParams);
		params.state = 'open';

		//nock.recorder.rec({ dont_print:true });
		require('fixtures/method_all_state_open.js');
        s.all(null, params, function(err, data) {
            should.not.exist(err);
			data.forEach(function(item) {
				item.state.should.equal('open');
			});

			//var fs = require('fs');
			//fs.writeFileSync('fixtures/method_all_state_open.js', "var nock = require('nock');\n" + nock.recorder.play().join('\n'));
            done();
        });
    });

    it('should has a param to fetch tickets with a different state (closed).', function(done) {
		var params;
		params = _.cloneDeep(baseParams);
		params.state = 'closed';

		//nock.recorder.rec({ dont_print:true });
		require('fixtures/method_all_state_closed.js');
        s.all(null, params, function(err, data) {
            should.not.exist(err);
			data.forEach(function(item) {
				item.state.should.equal('closed');
			});

			//var fs = require('fs');
			//fs.writeFileSync('fixtures/method_all_state_closed.js', "var nock = require('nock');\n" + nock.recorder.play().join('\n'));
            done();
        });
    });
});
