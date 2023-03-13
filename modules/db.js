const sqlite3 = require('sqlite3').verbose();
module.exports = (dbPath = '/data/sqlitedb') =>  new sqlite3.Database(process.cwd() +  dbPath);