var sweetp = require("sweetp-base");

exports.defaultCredentialService =  'password/manager/get';
exports.getCredentials = function (params, callback) {
	var service, project, serviceParams, key;

	service = this.defaultCredentialService;
	project = params.config.name;
	key = 'github';

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

exports.all = function (err, params, callback) {
	if (err) { callback(err); }

	exports.getCredentials(params, callback);
};
