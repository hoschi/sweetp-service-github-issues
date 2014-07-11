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
            config: sweetp.PARAMETER_TYPES.projectConfig
        },
        description: {
            summary: "test."
        },
        returns: "string"
    },
    fn: service.all
};
