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
 * @module AsyncAwait
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires sqlite3
 *
 * @classdesc AsyncAwait class
 */

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sqlitedb');

class AsyncAwait extends require("./Base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(AsyncAwait);
    // auto invoke methods
    this.autoinvoker(AsyncAwait);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  dbPath(path = this.database || '/data/sqlitedb') {
    return process.cwd() + path
  }

  async all(table = this.table || 'members') {
    const records = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${table}`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    return records;
  }

  async membersDetails() {
    const records = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM members INNER JOIN addresses ON members.id = addresses.memberId`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    return records;
  }

  async findBy(column = 'colum name', value = 'column value', success = 'success', error = 'error', table = this.table || 'members') {
    const records = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${table} WHERE ${column}='${value}'`, (err, rows) => {
        if (err) {
          this.emit(error, err);
          reject(err);
        } else {
          this.emit(success, rows);
          resolve(rows);
        }
      });
    });
    return records;
  }
  async findByQuery(query, success = 'success', error = 'error', table = this.table || 'members') {
    const records = await new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          this.emit(error, err);
          reject(err);
        } else {
          this.emit(success, rows);
          resolve(rows);
        }
      });
    });
    return records;
  }
  async firstBy(column = 'colum name', value = 'column value', success = 'success', error = 'error', table = this.table || 'members') {
    const records = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${table} WHERE ${column}='${value}' ORDER BY ${column} DESC LIMIT 1`, (err, rows) => {
        if (err) {
          this.emit(error, err);
          reject(err);
        } else {
          this.emit(success, rows);
          resolve(rows);
        }
      });
    });
    return records;
  }

  async lastBy(column = 'colum name', value = 'column value', success = 'success', error = 'error', table = this.table || 'members') {
    const records = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${table} WHERE ${column}='${value}' ORDER BY ${column} ASC LIMIT 1`, (err, rows) => {
        if (err) {
          this.emit(error, err);
          reject(err);
        } else {
          this.emit(success, rows);
          resolve(rows);
        }
      });
    });
    return records;
  }

  async findByFirstName(firstName, table = this.table || 'members') {
    return await this.findBy('firstName', firstName, 'findByFirstName', 'findByFirstName-error', table);
  }

  async findByLastName(lastName, table = this.table || 'members') {
    return await this.findBy('lastName', lastName, 'findByLastName', 'findByLastName-error', table);
  }
  async findByPhone(phone, table = this.table || 'members') {
    return await this.findBy('phone', phone, 'findByPhone', 'findByPhone-error', table);
  }
  async findByTitle(title, table = this.table || 'members') {
    return await this.findBy('title', title, 'findByTitle', 'findByTitle-error', table);
  }

  async findByZipCode(zip = '84105', table = this.table || 'members') {
    return await this.findBy('zip', zip, 'findByZipCode', 'findByZipCode-error', table);

  }
  async findByCity(city = 'Park City', table = this.table || 'members') {
    return await this.findBy('city', city, 'findByCity', 'findByCity-error', table);

  }
  async findByState(state = 'Utah', table = this.table || 'members') {
    return await this.findBy('state', state, 'findByState', 'findByState-error', table);

  }
  async findByAddress(address = 'address', table = this.table || 'members') {
    return await this.findBy('address', address, 'findByAddress', 'findByAddress-error', table);

  }

  async findByCompany(company = 'US Ski', table = this.table || 'members') {
    return await this.findBy('company', company, 'findByCompany', 'findByCompany-error', table);
  }
  async findByUrl(url = 'www.google.com', table = this.table || 'members') {
    return await this.findBy('url', url, 'findByUrl', 'findByUrl-error', table);

  }

  // first 
  async firstByFirstName(firstName = 'Darren', table = this.table || 'members') {
    return await this.firstBy('firstName', firstName, 'firstByFirstName', 'firstByFirstName-error', table);
  }
  async firstByLastName(lastName = 'Johnston', table = this.table || 'members') {
    return await this.firstBy('lastName', lastName, 'firstByLastName', 'firstByLastName-error', table);

  }
  async firstByZipCode(zip = '84105', table = this.table || 'members') {
    return await this.firstBy('zip', zip, 'firstByZipCode', 'firstByZipCode-error', table);

  }
  async firstByCity(city = 'Park City', table = this.table || 'members') {
    return await this.firstBy('city', city, 'firstByCity', 'firstByCity-error', table);

  }
  async firstByState(state = 'Utah', table = this.table || 'members') {
    return await this.firstBy('state', state, 'firstByState', 'firstByState-error', table);

  }
  async firstByAddress(address = 'address', table = this.table || 'members') {
    return await this.firstBy('address', address, 'firstByAddress', 'firstByAddress-error', table);

  }
  async firstByTitle(title = 'title', table = this.table || 'members') {
    return await this.firstBy('title', title, 'firstByTitle', 'firstByTitle-error', table);

  }
  async firstByPhone(phone = 'phone', table = this.table || 'members') {
    return await this.firstBy('phone', phone, 'firstByPhone', 'firstByPhone-error', table);

  }
  async firstByCompany(company = 'US Ski', table = this.table || 'members') {
    return await this.firstBy('company', company, 'firstByCompany', 'firstByCompany-error', table);
  }
  async firstByUrl(url = 'www.google.com', table = this.table || 'members') {
    return await this.firstBy('url', url, 'firstByUrl', 'firstByUrl-error', table);

  }


  // Last

  async lastByFirstName(firstName = 'Darren', table = this.table || 'members') {
    return await this.lastBy('firstName', firstName, 'lastByFirstName', 'lastByFirstName-error', table);
  }
  async lastByLastName(lastName = 'Johnston', table = this.table || 'members') {
    return await this.lastBy('lastName', lastName, 'lastByLastName', 'lastByLastName-error', table);

  }
  async lastByZipCode(zip = '84105', table = this.table || 'members') {
    return await this.lastBy('zip', zip, 'lastByZipCode', 'lastByZipCode-error', table);

  }
  async lastByCity(city = 'Park City', table = this.table || 'members') {
    return await this.lastBy('city', city, 'lastByCity', 'lastByCity-error', table);

  }
  async lastByState(state = 'Utah', table = this.table || 'members') {
    return await this.lastBy('state', state, 'lastByState', 'lastByState-error', table);

  }
  async lastByAddress(address = 'address', table = this.table || 'members') {
    return await this.lastBy('address', address, 'lastByAddress', 'lastByAddress-error', table);

  }
  async lastByTitle(title = 'title', table = this.table || 'members') {
    return await this.lastBy('title', title, 'lastByTitle', 'lastByTitle-error', table);

  }
  async lastByPhone(phone = 'phone', table = this.table || 'members') {
    return await this.lastBy('phone', phone, 'lastByPhone', 'lastByPhone-error', table);

  }
  async lastByCompany(company = 'US Ski', table = this.table || 'members') {
    return await this.lastBy('company', company, 'lastByCompany', 'lastByCompany-error', table);
  }
  async lastByUrl(url = 'www.google.com', table = this.table || 'members') {
    return await this.lastBy('url', url, 'lastByUrl', 'lastByUrl-error', table);

  }

}

module.exports = AsyncAwait;


