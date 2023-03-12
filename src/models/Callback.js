"use strict";

/**
 * @author Ericson S. Weah  
 *    emaiil: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericsonweah
 *    phone: +1.385.204.5167
 *    Dev Profile: https://www.ericsonsweah.dev 
 *    Dev Website: https://www.ericsonweah.dev
 *    Other Website: https://www.ericsonsweah.com
 *
 * @module Callback
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires MongoClient
 * @requires ObjectId
 * @requires EventEmitter
 *
 * @classdesc Callback class
 */

const sqlite3 = require('sqlite3').verbose();

class Callback extends require("./Base") {

    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(Callback);
        // auto invoke methods
        this.autoinvoker(Callback);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
      }

      dbPath(path = this.database || '/data/sqlitedb'){
        return process.cwd() + path
      }
      onClose(){
        this.db().close(err => err ? this.emit('close-connection-error', err.message) : this.emit('close-connection', 'Close the database connection.'));
      }
      db(){
        return new sqlite3.Database(this.dbPath(), sqlite3.OPEN_READWRITE, err => err ? this.emit('connection-error', err.message) : this.emit('connection', 'Connected'));
      }
      find(){
        this.db().serialize(() => this.db().each(`SELECT * FROM ${table}`, (err, row) => err ? this.emit('all-error', err.message): this.emit('all', row)));
      }
      findBy(column = 'column name', value = 'column value', successEvent = 'success', errorEvent = 'error', table = this.table || 'members'){
        this.db().serialize(() => this.db().each(`SELECT * FROM ${table} WHERE ${column}= '${value}'`, (err, row) => err ? this.emit(errorEvent, err.message): this.emit(successEvent, row)));
        this.onClose();
      }
      firstBy(column = 'column name', value = 'column value', successEvent = 'success', errorEvent = 'error', table = this.table || 'members'){
        this.db().serialize(() => this.db().each(`SELECT * FROM ${table} WHERE ${column}= '${value}' ORDER BY ${column} ASC LIMIT 1`, (err, row) => err ? this.emit(errorEvent, err.message): this.emit(successEvent, row)));
        this.onClose();
      }
      lastBy(column = 'column name', value = 'column value', successEvent = 'success', errorEvent = 'error', table = this.table || 'members'){
        this.db().serialize(() => this.db().each(`SELECT * FROM ${table} WHERE ${column}= '${value}' ORDER BY ${column} DESC LIMIT 1`, (err, row) => err ? this.emit(errorEvent, err.message): this.emit(successEvent, row)));
        this.onClose();
      }
      all(table = this.table){
        this.db().serialize(() => this.db().each(`SELECT * FROM ${table}`, (err, row) => err ? this.emit('all-error', err.message): this.emit('all', row)));
        this.onClose();
    }
    findById(){
        this.db().serialize(() => this.db().each(`SELECT * FROM ${table}`, (err, row) => err ? this.emit('all-error', err.message): this.emit('all', row)));
        this.onClose();
        
    }
    findByFirstName(firstName = 'Darren', table = this.table || 'members'){
        this.findBy('firstName',firstName, 'findByFirstName', 'findByFirstName-error', table);
    }
    findByLastName(lastName = 'Johnston', table  = this.table || 'members'){
        this.findBy('lastName',lastName, 'findByLastName', 'findByLastName-error', table);
        
    }
    findByZipCode(zip = '84105', table = this.table || 'members'){
        this.findBy('zip',zip, 'findByZipCode', 'findByZipCode-error', table);
        
    }
    findByCity(city = 'Park City', table = this.table || 'members'){
        this.findBy('city',city, 'findByCity', 'findByCity-error', table);
        
    }
    findByState(state = 'Utah', table = this.table || 'members'){
        this.findBy('state',state, 'findByState', 'findByState-error', table);
        
    }
    findByAddress(address = 'address', table = this.table || 'members'){
        this.findBy('address',address, 'findByAddress', 'findByAddress-error', table);
        
    }
    findByTitle(title = 'title', table = this.table || 'members'){
        this.findBy('title',title, 'findByTitle', 'findByTitle-error', table);
        
    }
    findByPhone(phone = 'phone', table = this.table || 'members'){
        this.findBy('phone',phone, 'findByPhone', 'findByPhone-error', table);
        
    }
    findByCompany(company = 'US Ski', table = this.table || 'members'){
        this.findBy('company',company, 'findByCompany', 'findByCompany-error', table);
    }
    findByUrl(url = 'www.google.com', table = this.table || 'members'){
        this.findBy('url',url, 'findByUrl', 'findByUrl-error', table);
        
    }


// first 
    firstByFirstName(firstName = 'Darren', table = this.table || 'members'){
        this.firstBy('firstName',firstName, 'firstByFirstName', 'firstByFirstName-error', table);
    }
    firstByLastName(lastName = 'Johnston', table  = this.table || 'members'){
        this.firstBy('lastName',lastName, 'firstByLastName', 'firstByLastName-error', table);
        
    }
    firstByZipCode(zip = '84105', table = this.table || 'members'){
        this.firstBy('zip',zip, 'firstByZipCode', 'firstByZipCode-error', table);
        
    }
    firstByCity(city = 'Park City', table = this.table || 'members'){
        this.firstBy('city',city, 'firstByCity', 'firstByCity-error', table);
        
    }
    firstByState(state = 'Utah', table = this.table || 'members'){
        this.firstBy('state',state, 'firstByState', 'firstByState-error', table);
        
    }
    firstByAddress(address = 'address', table = this.table || 'members'){
        this.firstBy('address',address, 'firstByAddress', 'firstByAddress-error', table);
        
    }
    firstByTitle(title = 'title', table = this.table || 'members'){
        this.firstBy('title',title, 'firstByTitle', 'firstByTitle-error', table);
        
    }
    firstByPhone(phone = 'phone', table = this.table || 'members'){
        this.firstBy('phone',phone, 'firstByPhone', 'firstByPhone-error', table);
        
    }
    firstByCompany(company = 'US Ski', table = this.table || 'members'){
        this.firstBy('company',company, 'firstByCompany', 'firstByCompany-error', table);
    }
    firstByUrl(url = 'www.google.com', table = this.table || 'members'){
        this.firstBy('url',url, 'firstByUrl', 'firstByUrl-error', table);
        
    }


    // Last

    lastByFirstName(firstName = 'Darren', table = this.table || 'members'){
        this.lastBy('firstName',firstName, 'lastByFirstName', 'lastByFirstName-error', table);
    }
    lastByLastName(lastName = 'Johnston', table  = this.table || 'members'){
        this.lastBy('lastName',lastName, 'lastByLastName', 'lastByLastName-error', table);
        
    }
    lastByZipCode(zip = '84105', table = this.table || 'members'){
        this.lastBy('zip',zip, 'lastByZipCode', 'lastByZipCode-error', table);
        
    }
    lastByCity(city = 'Park City', table = this.table || 'members'){
        this.lastBy('city',city, 'lastByCity', 'lastByCity-error', table);
        
    }
    lastByState(state = 'Utah', table = this.table || 'members'){
        this.lastBy('state',state, 'lastByState', 'lastByState-error', table);
        
    }
    lastByAddress(address = 'address', table = this.table || 'members'){
        this.lastBy('address',address, 'lastByAddress', 'lastByAddress-error', table);
        
    }
    lastByTitle(title = 'title', table = this.table || 'members'){
        this.lastBy('title',title, 'lastByTitle', 'lastByTitle-error', table);
        
    }
    lastByPhone(phone = 'phone', table = this.table || 'members'){
        this.lastBy('phone',phone, 'lastByPhone', 'lastByPhone-error', table);
    }
    lastByCompany(company = 'US Ski', table = this.table || 'members'){
        this.lastBy('company',company, 'lastByCompany', 'lastByCompany-error', table);
    }
    lastByUrl(url = 'www.google.com', table = this.table || 'members'){
        this.lastBy('url',url, 'lastByUrl', 'lastByUrl-error', table);
        
    }

}

module.exports = Callback;


