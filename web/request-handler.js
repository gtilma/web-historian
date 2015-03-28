var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelper = require('./http-helpers');
var file = require('node-static');
// require more modules/folders here!

var router = {
  "GET": function (request, response) {
    // TODO: better parsing (not /com/)
    if (/com/.test(request.url)) {
      fs.exists(path.join(archive.paths.archivedSites, request.url), function(exists){
        if (exists) {
          var archiveServer = new file.Server('./archives/sites');
          archiveServer.serve(request, response);
        }
      });
    } else { 
      var fileServer = new file.Server('./web/public');
      fileServer.serve(request, response);
    }

  },

  "POST": function (request, response) {
    request.on('data', function (data) {
      var url=JSON.parse(data).url
      console.log(url)
      archive.isUrlInList(url)
      
      //check sites.txt for url
        //if doesn't exist, append url to sites.txt

      //check if URL is archived
        // if it is, serve (/sites/url)

      request.on('end', function(){
        response.writeHead(201, httpHelper.headers)
        response.end()
      })
    });
  },

  "OPTIONS": function (request, response) {
    response.writeHead(201, httpHelper.headers)
    response.end()
  }
};

exports.handleRequest = function (request, response) {
  if (request.method) {
    router[request.method](request, response)
  }
};

