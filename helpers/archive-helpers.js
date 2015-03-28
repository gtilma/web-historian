var fs = require('fs');
var path = require('path');
var _ = require('underscore');
// var request= require ("http-request")
var http = require("http");


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  
  fs.readFile(this.paths.list, {encoding: 'utf-8'}, function(err,data){
    if (err) throw err;
    callback(data.split("\n"));
  });

};

exports.isUrlInList = function(url, callback){

  this.readListOfUrls(function (data) {
    if (data.indexOf(url) > -1) {
      callback(true);
    }
    callback(false);
  });

};

exports.addUrlToList = function(url, callback){
  callback(
    fs.appendFile(this.paths.list, url+'\n', function (err) {
      if (err) throw err;
    })
  )

  // On running test -->
  // function (
  //   fs.appendFile(this.paths.list, '\n'+url, function (err) {
  //     if (err) throw err;
  //   }){
  //       archive.isUrlInList("someurl.com", function (is) {
  //         expect(is);
  //         done();
  //       });
  // ) 
};

exports.isUrlArchived = function(url, callback){
  callback(
    fs.open(path.join(this.paths.archivedSites, url), 'r', function (err) {
      if (err) return false;
      return true;
    })  
  )
};

// CRON scheduled
exports.downloadUrls = function(urlArray){
  for (var i = 0; i < urlArray.length; i++){
    
    var context = this;
    callback = function(response) {
      var text = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (data) {
        text += data;
        console.log(data)
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        fs.writeFile(path.join(context.paths.archivedSites, "/" + urlArray[i]), text);
      });
    }

    http.get({host: urlArray[i]}, callback).end();

    // request.get(urlArray[i], path.join(this.paths.archivedSites, "/"+urlArray[i]), function(err){
    //   console.log('in request')
    //   if (err) throw err; 
    // })
  }
};
