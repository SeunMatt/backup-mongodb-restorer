backup-mongodb-restorer
=======================

version: 1.0.0

This module will restore backup of mongodb created by backup-mongodb.
You should use this module alongside [backup-mongodb](https://github.com/SeunMatt/backup-mongodb)

Usage Example
==============

~~~javaascript

var databaseUri = "mongodb://127.0.0.1:27017/dev";

var zipFilePath = "backup/dev_19_9_16.21.40.28.zip";

var Restore = require("backup-mongodb-restorer");

new Restore (databaseUri, zipFilePath).restore();

~~~

Installation
============

>npm install -save backup-mongodb-restorer

API Refrence
============
params
	* databaseUri [not optional]: the uri to the mongodatabase e.g. mongodb://127.0.0.1:27017/test
	* zipFilePath [not optional]: path/to/backupfile.zip

method
	calling new Restore(databaseUri, zipFilePath).restore(); does the job



Contributors
============
Author: Seun Matt (@SeunMmatt2)

To contribute to this project kindly create a pull request. Open an issue for discussion for the 
added feature(s)

LICENSE
========
[MIT License](backup-mongodb-restorer/LICENSE))
