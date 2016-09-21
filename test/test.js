

var expect = require('chai').expect;
var databaseUri = "mongodb://127.0.0.1:27017/test";
var zipFilePath = "./test/dev_19_9_16.21.40.28.zip";
var Restore = require("../index");

 // new Restore(databaseUri, zipFilePath).restore();


describe("restore", function() {
  
  it("resotres the sample backupfile dev_19_9_16.21.40.28.zip into test db", function(done) {

  	var restore = new Restore(databaseUri, zipFilePath);

    expect( function() { restore.restore(done); } ).to.not.throw(Error);
    
  });

});