backup-mongodb-restorer
=======================

This module will restore backup of mongodb in .zip created by [backup-mongodb](https://github.com/SeunMatt/backup-mongodb).

**You should use this module alongside [backup-mongodb](https://github.com/SeunMatt/backup-mongodb)**

Usage Example
==============

~~~javascript

var databaseUri = "mongodb://127.0.0.1:27017/dev";

var zipFilePath = "backup/dev_19_9_16.21.40.28.zip";

var Restore = require("backup-mongodb-restorer");

new Restore (databaseUri, zipFilePath).restore();

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

Note:
  * You will need to have [make](http://www.equation.com/servlet/equation.cmd?fa=make) installed on your system to run the test for windows

  * If you want to run on other OS other than windows, you might want to 
 Open the makefile in the project root dir and then change the path separator in
 .\node_modules\.bin\mocha


API Refrence
============
params

	* databaseUri [not optional]: the uri to the mongodatabase e.g. mongodb://127.0.0.1:27017/test

	* zipFilePath [not optional]: path/to/backupfile.zip

method

	* calling new Restore(databaseUri, zipFilePath).restore(); does the job



Contributors
============
Author: Seun Matt (twitter @SeunMmatt2)

To contribute to this project kindly create a pull request. Open an issue for discussion for the 
added feature(s)

LICENSE
========
[MIT License](https://github.com/SeunMatt/backup-mongodb-restorer/blob/master/LICENSE)
