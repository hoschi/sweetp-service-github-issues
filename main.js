var sweetp = require("sweetp-base");
var service = require("./src/service.js");
var methods, client;

methods = sweetp.createMethods(service, "/tickets/");
client = sweetp.start("github-issues", methods);
