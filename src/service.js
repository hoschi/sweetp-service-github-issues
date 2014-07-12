var sweetp = require('sweetp-base');
var _ = require('lodash');
var GithubApi = require('github');

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
		var github, apiParams, overrides;

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
		github.issues.repoIssues(apiParams, parseResponse);
	});
};
