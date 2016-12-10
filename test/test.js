

var expect = require('chai').expect;
var databaseUri = "mongodb://127.0.0.1:27017/bbcbot";
var zipFilePath = "./test/bbcbot_8_12_16.17.47.51.zip";
var Restore = require("../index");
var winston = require("winston");

var useObjectID = true; //this tells the module that your collections uses the default generated mongodb ObjectID.

// var done = function() { winston.info("Database Restoration Complete from Done Callback"); }

//you can call this to do the restoration
 new Restore(databaseUri, zipFilePath, useObjectID).restore();

 //or you can specify a done callback in the for the restore method
 // new Restore(databaseUri, zipFilePath).restore(done);


//to run this section, modify the package.json file and change the test in the scripts
//section to make test instead of node ./test/test.js and uncomment the describe below


// Note:
  // * You will need to have [make](http://www.equation.com/servlet/equation.cmd?fa=make) installed on your system 
  // 	to run the test for windows

// describe("restore", function() {
  
//   it("resotres the sample backupfile dev_19_9_16.21.40.28.zip into test db", function(done) {

//   	var restore = new Restore(databaseUri, zipFilePath);

//     expect( function() { restore.restore(done); } ).to.not.throw(Error);
    
//   });

// });