var sweetp = require('sweetp-base');
var _ = require('lodash');
var GithubApi = require('github');
var cacheManager = require('cache-manager');

exports.defaultCredentialService =  'password/manager/get';
exports.defaultCredentialKey =  'github';
exports.config = {
	githubApi:{
		version:'3.0.0'
	}
};

exports.getCredentials = function (params, callback) {
	var service, project, serviceParams, key;

	service = this.defaultCredentialService;
	project = params.config.name;
	key = this.defaultCredentialKey;

	if (params.config.github_issues.auth) {
		if (params.config.github_issues.auth.service) {
			service = params.config.github_issues.auth.service;
		}

		if (params.config.github_issues.auth.project) {
			project = params.config.github_issues.auth.project;
		}

		if (params.config.github_issues.auth.key) {
			key = params.config.github_issues.auth.key;
		}
	}

	serviceParams = {
		key:key
	};

    return sweetp.callService(params.url, project, service, serviceParams, false, callback);
};

exports.getParams = function (params, overrides, defaults) {
	var modifiedParams = _.cloneDeep(params);

	// TODO this is to remove not provided params like 'assignee', fix this in sweetp server?!
	modifiedParams = _.omit(modifiedParams, function (value) {
		return value === null;
	});

	if (defaults) {
		modifiedParams = _.defaults(modifiedParams, defaults);
	}

	if (overrides) {
		modifiedParams = _.assign(modifiedParams, overrides);
	}

	delete modifiedParams.config;
	return modifiedParams;
};

exports.transformTicketResponse = function (ticket) {
	if (!ticket) {
		return ticket;
	}

	if (ticket.body !== undefined) {
		ticket.description = ticket.body;
	}

	return _.pick(ticket, [
		'number',
		'title',
		'state',
		'description'
	]);
};

exports.getCacheKey = function (method, params) {
	return method + JSON.stringify(params);
};

exports.memoryCache = cacheManager.caching({store:'memory', max: 100, ttl: 3 /* seconds*/});
exports.eTagCache = cacheManager.caching({store:'memory', max: 100});
var eTagDict = {};

exports.callWithCache = function (id, get, callback) {
	exports.memoryCache.wrap(id, function (setInMemoryCache) {
		var eTag, writeToCacheAndReturn;

		writeToCacheAndReturn = function (response) {
			// save it in all caches
			exports.eTagCache.set(id, response);
			setInMemoryCache(null, response);
		};

		// not in cache, call API with or without etag
		eTag = eTagDict[id];

		get(eTag, function (err, response) {
			if (err) {
				return setInMemoryCache(new Error(err));
			}

			if (response.meta.status === "304 Not Modified") {
				// nothing new, try to get response from second cache
				response = exports.eTagCache.get(id);

				if (response) {
					// found response in second cache, return it
					return writeToCacheAndReturn(response);
				} else {
					// cache result was dismissed by max length, we must fetch it again
					// call API without etag to get fresh response
					return get(null, function (err, response) {
						if (err) {
							return setInMemoryCache(new Error(err));
						}

						writeToCacheAndReturn(response);
					});
				}
			} else {
				// no error, no 304, server returned result

				// save new etag
				eTagDict[id] = response.meta.etag;

				// return result
				writeToCacheAndReturn(response);
			}
		});
	}, callback);
};

exports.all = function (err, params, callback) {
	var parseResponse;
	if (err) { return callback(err); }

	if (params.withAllProperties === 'true') {
		// give all data directly to the client
		parseResponse = callback;
	} else {
		parseResponse = function (err, data) {
			var tickets;
			if (err) { return callback(err); }
			if (!data) { return callback(null, data); }

			tickets = data.map(exports.transformTicketResponse);
			callback(null, tickets);
		};
	}

	exports.getCredentials(params, function (err, credentials) {
		var github, apiParams, overrides, cacheKey;

		// initialize api
		github = new GithubApi(exports.config.githubApi);
		github.authenticate(_.assign({type:'basic'}, credentials));

		// setup overrides for paramaters which ar required by api but not in params
		overrides = {
			user:params.config.github_issues.user,
			repo:params.config.github_issues.repo
		};

		// setup params for api
		apiParams = exports.getParams(params, overrides, {
			state:'all'
		});

		// call api
		cacheKey = exports.getCacheKey('repoIssues', apiParams);
		exports.callWithCache(cacheKey, function (eTag, callback) {
			var finalParams;

			finalParams = exports.applyETagToParams(eTag, _.cloneDeep(apiParams));
			github.issues.repoIssues(finalParams, callback);
		}, parseResponse);
	});
};

exports.applyETagToParams = function (eTag, params) {
	if (eTag && params) {
		params.headers = params.headers || {};
		params.headers['If-None-Match'] = eTag;
	}

	return params;
};
