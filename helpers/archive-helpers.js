var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.readListOfUrls = function(){
  // fs.readFile....
  debugger; 
  return fs.readFile(this.paths.list, {encoding: 'utf-8'}, function(err,data){
    if (err) throw err;
    console.log(data.split("\n"));
    return data.split("\n")
  })
  // return urlList;
};

exports.isUrlInList = function(url){
  var urls = this.readListOfUrls()
  console.log(urls)
  // if (readListOfUrls doesn't contain {{url}}) { ... addUrlToList(url) ... }
};

exports.addUrlToList = function(){
  // append to sites.txt
};

exports.isUrlArchived = function(url){
  // look in archives/sites for {{url}}
};

exports.downloadUrls = function(){
  // if (!isUrlArchived) { ... download ... }
};
