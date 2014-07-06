var sweetp = require("sweetp-base");

exports.all = {
	options: {
		params: {
			config: sweetp.PARAMETER_TYPES.projectConfig
		},
		description: {
			summary:"test."
		},
		returns: "string"
	},
	fn:function(err, params, callback) {
		callback(null, "Hello world, project " + params.config.name);
	}
};
