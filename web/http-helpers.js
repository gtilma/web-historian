var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
  
};

exports.serveAssets = function(response, asset, contentType, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  // response === response
  // asset === '/Users/student/MKS14-web-historian/web/public/index.html'
  // callback === fs.readFile

  headers['Content-Type'] = contentType;
  callback(asset, function(err, data) {
    // debugger;
    if (err) throw err;
    response.writeHead(200, headers);
    response.end(data);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
