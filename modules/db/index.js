#!/usr/bin/env node

"use strict";

/**
 * Author
 *  @name Ericson S. Weah  
 *  @email afrosintech@gmail.com
 *  @website https://www.afrosintech.com
 *  @github https://github.com/afrosintech
 *  @gitlab https://gitlab.com/afrosintech
 *  @npm https://www.npmjs.com/~afrosintech
 *  @phone +1.385.204.5167
 *
 * @module Entry
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc Entry class
 */

module.exports = (dbPath = '/data/sqlitedb') => new require('sqlite3').verbose().Database(process.cwd() +  dbPath)