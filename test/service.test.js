var should = require('chai').should();
var nock = require('nock');
var _ = require('lodash');

var s = require('../src/service');

describe('Call with cache', function () {
	var getTestResponseBase;

	getTestResponseBase = function () {
		var testResponseBasic;

		testResponseBasic = ['foo'];
		testResponseBasic.meta = {
			status:"200",
			etag:"myEtag"
		};

		return testResponseBasic;
	};

	beforeEach(function () {
		s.memoryCache.reset();
		s.eTagCache.reset();
	});

	it('should work when testing happy cases.', function (done) {
		var id, testResponse, testResponse2;

		id = "test-0";
		testResponse = getTestResponseBase();
		testResponse2 = getTestResponseBase();
		testResponse2[0] = 'bar';
		testResponse2.meta.etag = "myEtag2";

		// set in cache
		function get (eTagFromCacheForId, callback) {
            should.not.exist(eTagFromCacheForId);
			callback(undefined, testResponse);
		}

		function resultCallback (err, response) {
            should.not.exist(err);
			response.should.eql(testResponse);

			s.memoryCache.get(id).should.eql(testResponse);
			s.eTagCache.get(id).should.eql(testResponse);

			// get from memory cache
			s.callWithCache(id, undefined, resultCallbackWithMemoryCacheResult);
		}

		function resultCallbackWithMemoryCacheResult (err, response) {
            should.not.exist(err);
			response.should.eql(testResponse);

			s.memoryCache.get(id).should.eql(testResponse);
			s.eTagCache.get(id).should.eql(testResponse);

			// remove from memory cache (simulate timeout)
			s.memoryCache.del(id);

			// and get from eTag cache
			s.callWithCache(id, getWithETag, resultCallbackWithETagCacheResult);
		}

		function getWithETag (eTagFromCacheForId, callback) {
            eTagFromCacheForId.should.equal("myEtag");
			// don't return response, only meta, response should come from cache
			callback(undefined, {
				meta:{
					status:"304 Not Modified"
				}
			});
		}

		function resultCallbackWithETagCacheResult (err, response) {
            should.not.exist(err);
			response.should.eql(testResponse);

			// retrieval through eTag cache also refreshs memory cache
			s.memoryCache.get(id).should.eql(testResponse);
			s.eTagCache.get(id).should.eql(testResponse);

			// remove from memory cache (simulate timeout)
			s.memoryCache.del(id);

			s.callWithCache(id, getWithChangedResult, resultCallbackWithChangedResult);
		}

		function getWithChangedResult (eTagFromCacheForId, callback) {
            eTagFromCacheForId.should.equal("myEtag");
			// return changed response with changed eTag
			callback(undefined, testResponse2);
		}

		function resultCallbackWithChangedResult (err, response) {
            should.not.exist(err);
			response.should.eql(testResponse2);
			response.meta.etag.should.equal("myEtag2");

			// retrieval through eTag cache also refreshs memory cache
			s.memoryCache.get(id).should.eql(testResponse2);
			s.eTagCache.get(id).should.eql(testResponse2);

			// remove from memory cache (simulate timeout)
			s.memoryCache.del(id);

			// trigger eTag cache again, this should still work when method
			// under test saved new result for the not changed id
			s.callWithCache(id, getWithETagOfChangedResult, resultCallbackWithETagCacheResultForChangedETag);
		}

		function getWithETagOfChangedResult (eTagFromCacheForId, callback) {
            eTagFromCacheForId.should.equal("myEtag2");

			// don't return response, only meta, response should come from cache
			callback(undefined, {
				meta:{
					status:"304 Not Modified"
				}
			});
		}

		function resultCallbackWithETagCacheResultForChangedETag (err, response) {
            should.not.exist(err);
			response.should.eql(testResponse2);
			response.meta.etag.should.equal("myEtag2");

			// retrieval through eTag cache also refreshs memory cache
			s.memoryCache.get(id).should.eql(testResponse2);
			s.eTagCache.get(id).should.eql(testResponse2);

			// remove from memory cache (simulate timeout)
			s.memoryCache.del(id);
			// remove from etag cache (simulate exhaustion of cache space)
			s.eTagCache.del(id);

			// now method under test can't return cache result from eTagCache
			// when server response without a result and a 304, it must fetch
			// it again
			s.callWithCache(id, getWithETagOfChangedResultAndFetchSameResultForUndefinedETag, resultCallbackWithNewlyFetchedResponse);
		}

		function getWithETagOfChangedResultAndFetchSameResultForUndefinedETag (eTagFromCacheForId, callback) {
			if (eTagFromCacheForId) {
				// return 304 and trigger total cache miss, which triggers
				// refetching. the else case of this if
				callback(undefined, {
					meta:{
						status:"304 Not Modified"
					}
				});
			} else {
				// same result as the one which was in the cache before we
				// simulated exhaustion of cache space
				callback(undefined, testResponse2);
			}
		}

		function resultCallbackWithNewlyFetchedResponse (err, response) {
            should.not.exist(err);
			response.should.eql(testResponse2);
			response.meta.etag.should.equal("myEtag2");

			// retrieval through eTag cache also refreshs memory cache
			s.memoryCache.get(id).should.eql(testResponse2);
			s.eTagCache.get(id).should.eql(testResponse2);

			done();
		}

		s.callWithCache(id, get, resultCallback);
	});

	it('should pass errors always to result callback.', function (done) {
		var id, testResponse, callCounter;

		id = "test-0";
		testResponse = getTestResponseBase();
		callCounter = 0;

		function get (eTag, callback) {
			// simulate error when fething result
			callback("my error");
		}

		function resultCallback (err) {
			err.message.should.equal("my error");

			s.callWithCache(id, getWithNotModifiedNotExistingReponse, resultCallback2);
		}

		function getWithNotModifiedNotExistingReponse (eTag, callback) {
			if (callCounter === 0) {
				callCounter++;
				// respond with 304, but the cache hit is empty so it gets
				// called again to fetch the content
				callback(undefined, {
					meta:{
						status:"304 Not Modified"
					}
				});
			} else {
				callback("my second error");
			}
		}

		function resultCallback2 (err) {
			err.message.should.equal("my second error");
			done();
		}

		s.callWithCache(id, get, resultCallback);
	});
});

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

        completeGithubTicket = require('../fixtures/complete_github_ticket.js');

        s.transformTicketResponse(completeGithubTicket).should.eql({
            description: "I'm having a problem with this.",
            number: 1347,
            state: "open",
            title: "Found a bug"
        });
    });
});

describe('Apply ETag to params', function () {
	it('should handle non existing ETag.', function () {
		s.applyETagToParams(undefined, {foo:'bar'}).should.eql({foo:'bar'});
	});

	it('should handle non existing ETag and params.', function () {
		should.not.exist(s.applyETagToParams(undefined, undefined));
	});

	it('should handle non existing params.', function () {
		should.not.exist(s.applyETagToParams('etag', undefined));
	});

	it('should create headers and assign ETag inplace.', function () {
		var params;

		params = {};
		s.applyETagToParams('etag', params).should.eql(params);
		params.headers['If-None-Match'].should.equal('etag');
	});

	it('should not override existing headers.', function () {
		var params;

		params = {
			headers:{
				foo:'bar'
			}
		};
		s.applyETagToParams('etag', params).should.eql(params);
		params.headers['If-None-Match'].should.equal('etag');
		params.headers.foo.should.equal('bar');
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
		require('../fixtures/method_all.js');
        s.all(null, params, function(err, data) {
            should.not.exist(err);
            data.should.has.length(30);
            data[0].title.should.equal('commit widget bug');
            should.not.exist(data[0].html_url);

			//var fs = require('fs');
			//fs.writeFileSync('../fixtures/method_all.js', "var nock = require('nock');\n" + nock.recorder.play().join('\n'));
            done();
        });

    });

    it('should be able to fetch all properties.', function(done) {
		var params;
		params = _.cloneDeep(baseParams);
		params.withAllProperties = 'true';

		//nock.recorder.rec({ dont_print:true });
		require('../fixtures/method_all_with_all_props.js');
        s.all(null, params, function(err, data) {
            should.not.exist(err);
            data.should.has.length(30);
            data[0].title.should.equal('commit widget bug');
            data[0].html_url.should.equal('https://github.com/sweetp/dashboard/issues/33');

			//var fs = require('fs');
			//fs.writeFileSync('../fixtures/method_all_with_all_props.js', "var nock = require('nock');\n" + nock.recorder.play().join('\n'));
            done();
        });

    });

    it('should has a param to fetch tickets with a different state (open).', function(done) {
		var params;
		params = _.cloneDeep(baseParams);
		params.state = 'open';

		//nock.recorder.rec({ dont_print:true });
		require('../fixtures/method_all_state_open.js');
        s.all(null, params, function(err, data) {
            should.not.exist(err);
			data.forEach(function(item) {
				item.state.should.equal('open');
			});

			//var fs = require('fs');
			//fs.writeFileSync('../fixtures/method_all_state_open.js', "var nock = require('nock');\n" + nock.recorder.play().join('\n'));
            done();
        });
    });

    it('should has a param to fetch tickets with a different state (closed).', function(done) {
		var params;
		params = _.cloneDeep(baseParams);
		params.state = 'closed';

		//nock.recorder.rec({ dont_print:true });
		require('../fixtures/method_all_state_closed.js');
        s.all(null, params, function(err, data) {
            should.not.exist(err);
			data.forEach(function(item) {
				item.state.should.equal('closed');
			});

			//var fs = require('fs');
			//fs.writeFileSync('../fixtures/method_all_state_closed.js', "var nock = require('nock');\n" + nock.recorder.play().join('\n'));
            done();
        });
    });
});
