backup-mongodb-restorer
=======================

[![npm version](https://badge.fury.io/js/backup-mongodb-restorer.svg)](https://badge.fury.io/js/backup-mongodb-restorer)

[![https://nodei.co/npm/backup-mongodb-restorer.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/backup-mongodb-restorer.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/backup-mongodb-restorer)

[![HitCount](https://hitt.herokuapp.com/SeunMatt/backup-mongodb-restorer.svg)](https://github.com/SeunMatt/backup-mongodb-restorer)


This module will restore backup of mongodb in .zip created by [backup-mongodb](https://github.com/SeunMatt/backup-mongodb).

**You should use this module alongside [backup-mongodb](https://github.com/SeunMatt/backup-mongodb)**

Usage Example
==============

~~~javascript

//example dbUri with no authentication
var databaseUri = "mongodb://127.0.0.1:27017/dev";

//example dbUri with username and password for the database test
// var dbUri = "mongodb://username:pwd@127.0.0.1:27017/test";


var zipFilePath = "test/dev_19_9_16.21.40.28.zip";

//this tells the module that your collections uses the default generated mongodb ObjectID.
//default is true
var useObjectID = true;

var Restore = require("backup-mongodb-restorer");

new Restore (databaseUri, zipFilePath, useObjectID).restore();

//optionally you can call new Restore (databaseUri, zipFilePath, useObjectID).restore(done);
//where done is the callback to be called when done

~~~

Installation
============

>npm install -save backup-mongodb-restorer

Test
=====
> clone this git repo and cd into it.
>
> then run $ npm install to install all the dependencies
>
> then run the command $ npm test to run the tests


API Refrence
============
params

	* databaseUri [required]: the uri to the mongodatabase e.g. mongodb://127.0.0.1:27017/test

	* zipFilePath [required]: path/to/backupfile.zip

	* useObjectID [optional]: Default = true;

method

	* calling new Restore(databaseUri, zipFilePath, useObjectID).restore(); does the job
	* OR new Restore(databaseUri, zipFilePath, useObjectID).restore(done); where done is a callback to be invoke on completion


Changelog
=========
* v1.1.0 - feature for ObjectID was added. It restores the _id field as mongodb ObjectID except otherwise specified.
			dependencies were updated

* v1.0.6 - first stable release

Contributors
============
Author: Seun Matt [connect me on linkedIn](https://ng.linkedin.com/in/seun-matt-06351955)

Fork and star this project; create a pull request to submmit your contributions.

LICENSE
========
[MIT License](https://github.com/SeunMatt/backup-mongodb-restorer/blob/master/LICENSE)
