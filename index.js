
/**

Author: Seun Matt (smatt382@gmail.com);

Project Name: restore-backup-mongodb

Project Desc:

This module will restore backup of mongodb created by backup-mongodb
in .zip format.

@param(databaseUri) the uri to the mongodatabase e.g. mongodb://127.0.0.1:27017/test

@param (pathToZipFile) path/to/backupfile.zip

Usage:

var databaseUri = "mongodb://127.0.0.1:27017/test";

var filePath = "backup/dev_19_9_16.21.40.28.zip";

var Restore = require("restore-backup-mongodb");

new Restore(databaseUri, filePath).restore();


*
**/


var fs = require("fs-extra");
var path = require("path");
var unzip = require("unzip");

var mongodb = require("mongodb");
var mongoClient = require("mongodb").MongoClient;

var databaseUri;
var fileNames = [];
var jsonData = []; //this file will contain the loaded data
var db; //global db object
var zipPath; // path/to/zipfile.zip
var tempPath = __dirname + "/temp";


function Restore (dbaseUri, pathToZipFile) {

  if(!dbaseUri || !pathToZipFile) { console.log("invalid params"); return; }

	databaseUri = dbaseUri;
	zipPath = pathToZipFile;

}


Restore.prototype.restore = function() {

	mongoClient.connect(databaseUri, function(error, dbObj) {

		if(error) { console.log("ERROR CONNECTING TO MONGODB " + error); }
		else {

			console.log("Restore Script Connected to MongoDb successfully");
			db = dbObj;
			
			// first extract the zip file to tempPath
			 extractZip();
		}

	});
}


function extractZip() {
 	// this is the first thing to be done. It extracts the zip file
 	var unzipExtractor = unzip.Extract({ path: tempPath});
	unzipExtractor.on("close", function() { 
	console.log("Extraction Complete . . .");

	// now invoke getAllCollections to read the dir for the .json files
	getAllCollections();

	});

	fs.createReadStream(zipPath).pipe(unzipExtractor);

}



function getAllCollections() {

 // the zip has been extracted to tempPath
 // this will walk through the dir and read all the files in the tempPath
 // it will then save the names of each file in the fileNames[]
 // The files are collections from the database in .json format

	fs.readdir(tempPath, function(error, results) {
		if(error) { console.log("error reading dir from restore " + error); db.close(); return false;}
		else { 
			console.log("dir read and contains " + results.length + " files");
			
			for(var x in results) {

				if(results[x].indexOf(".zip") < 0) { // remove the .zip archive
					fileNames.push(path.win32.basename(results[x], ".json"));
			    }

				if(x == results.length - 1) { 
					console.log("fileNames = " + fileNames);
					loadJsonData(0);
				}
			}

			
		}
	});
}




function loadJsonData(z) {
    
	//this will load the data in the json files i.e the collections 
	//it will load the data for a single file per time and save the data to the db
	// after completing a file, it will progress to another file

	if(z > fileNames.length - 1) { 
		console.log("Restoration procedure complete..."); 
		db.close();
		fs.remove(tempPath, function(error){
			if(error) { console.log("error removing temporary path " + error); }

			else { console.log("tempPath removed"); }
		}); 

		return;	
	}

	else {

		console.log("\nload json data invoked " + z);

		var collectionName = fileNames[z];

		console.log("collection under processing = " + collectionName + "\n");

		fs.readJson(tempPath + "/" + collectionName + ".json", function(error, fileData) {
			if(error) { console.log("error reading file in Restore " + fileNames[z] + ": " + error); db.close(); return; }
			else {
				// function callback () { loadJsonData(z + 1); }
				saveToDb( fileData, 0, collectionName, function() { loadJsonData(z + 1) });
	          }
	    }); //end fs
	}
}




function saveToDb(fileData, x, collectionName, callback) {

	//this method will accept fileData which are the actual records in the collection file
	//it will save each record contained in the data to the database
	//if the record exits it will update it else it will just create it
	//once it's done it will call loadJsonData to load another file for processing

 if(x > fileData.length - 1) { console.log("Done Processing " + collectionName + "\n"); callback(); }
  
  else {

	console.log("fileData length = " + fileData.length);
	var collection = fileData[x];
	
	// add this data to the database
	db.collection(collectionName).update({"_id":collection._id}, collection, {upsert: true}, function(error, result){
    
    if(error) { console.log("error updating document " + fileName + " : " + error); }
	
	else { 
		
		console.log("update successful " + result); 
		saveToDb(fileData, (x + 1), collectionName, callback);
	    
	    }
	
	});

  }

}



module.exports = Restore;