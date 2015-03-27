var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelper = require('./http-helpers');
var file = require('node-static');
// require more modules/folders here!

var router = {
  "GET": function (request, response) {
    var fileServer = new file.Server('./web/public');
    fileServer.serve(request, response);
  },

  "POST": function (request, response) {
    request.on('data', function (data) {
      var url=JSON.parse(data).url
      console.log(url)

    });
  },

  "OPTIONS": function (request, response) {
    // handle 201
  }
};

exports.handleRequest = function (request, response) {
  if (request.method) {
    router[request.method](request, response)
  }
};

