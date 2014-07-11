var should = require('chai').should();
var nock = require('nock');

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

describe('All method', function() {
    var params;

    params = {
        url: 'http://my-not-existing-localhost:42',
        config: {
            name: 'test',
            github_issues: {}
        }
    };

    it('should work.', function(done) {
        nock(params.url)
            .get('/services/' + params.config.name + '/' + s.defaultCredentialService + "?key=github")
            .reply(200, {
                service: {
                    username: 'foo',
                    password: 'bar'
                }
            });

        s.all(null, params, function(err) {
            should.not.exist(err);

            done();
        });
    });
});
