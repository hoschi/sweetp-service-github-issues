var sweetp = require("sweetp-base");
var service = require("./service");

exports.all = {
    options: {
        route: {
            method: sweetp.ROUTER_METHODS.configExists,
            property: 'github_issues'
        },
        params: {
            url: sweetp.PARAMETER_TYPES.url,
            config: sweetp.PARAMETER_TYPES.projectConfig,
            assignee: sweetp.PARAMETER_TYPES.one,
            state: sweetp.PARAMETER_TYPES.one,
            withAllProperties : sweetp.PARAMETER_TYPES.one
        },
        description: {
            summary: "test."
        },
        returns: "string"
    },
    fn: service.all
};
