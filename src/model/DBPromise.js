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
 * @module DBPromise
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires sqlite3
 *
 * @classdesc DBPromise class
 */

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.cwd() +  '/data/sqlitedb');



class DBPromise extends require("../Base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(DBPromise);
    // auto invoke methods
    this.autoinvoker(DBPromise);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  dbPath(path = this.database || '/data/sqlitedb') {
    return process.cwd() + path
  }


   /**
   * @name all
   * @function
   *
   * @param {String} table the database table name
   *
   * @description makes an https get request to an api endpoint
   *
   * @return {Array|Object} the data from the database 
   *
   */
  async all(table = this.table || 'members') {
    const records = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${table}`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    return records;
  }


  /**
   * @name membersDetails
   * @function
   *
   * @param {String} table the database table name
   *
   * @description makes an https get request to an api endpoint
   *
   * @return {Array|Object} all members with their addresses
   *
   */
  async membersDetails() {
    const records = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM members INNER JOIN addresses ON members.id = addresses.memberId`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    return records;
  }


    /**
   * @name dropTable
   * @function
   *
   * @param {String} table the database table name
   *
   * @description makes an https get request to an api endpoint
   *
   * @return {Object|Boolean} results of droping a table
   *
   */
  async dropTable(table = this.table) {
    const records = await new Promise((resolve, reject) => {
      db.all(`DROP ${table}`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    return records;
  }


  /**
   * @name firstCountMembersDetails
   * @function
   *
   * @param {Integer} count quantity
   *
   * @description makes an https get request to an api endpoint
   *
   * @return {Object|Array}  all record found
   *
   */

  async firstCountMembersDetails(count = 10) {
    const records = await new Promise((resolve, reject) => {
      db.all(`SELECT DISTINCT * FROM members INNER JOIN addresses ON members.id = addresses.memberId LIMIT ${count}`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    return records;
  }


  /**
   * @name count
   * @function
   *
   * @param {String} table database table name
   *
   * @description count records in the given table
   *
   * @return {Object|Array}  all record found
   *
   */

  async count (table = this.table || 'members') {
    const count = await new Promise((resolve, reject) => {
      db.get(`SELECT COUNT(*) AS count FROM ${table}`, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count);
        }
      });
    });
    return count;

  }

  /**
   * @name findBy
   * @function
   *
   * @param {String} column database table column name
   * @param {String} value database table column value
   * @param {String} success success event
   * @param {String} error  error event
   * @param {String} table database table name
   *
   * @description find record by column name and column value
   *
   * @return {Object|Array}  all record found
   *
   */
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


     /**
   * @name findByQuery
   * @function
   *
   * @param {String} query database table column name
   * @param {String} success success event
   * @param {String} error  error event
   * @param {String} table database table name
   *
   * @description find record by column name and column value
   *
   * @return {Object|Array}  all record found
   *
   */
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


  /**
   * @name firstBy
   * @function
   *
   * @param {String} column database table column name
   * @param {String} value database table column value
   * @param {String} success success event
   * @param {String} error  error event
   * @param {String} table database table name
   *
   * @description find first record by column name and column value
   *
   * @return {Object}  first record found
   *
   */
  async firstBy(column = 'colum name', value = 'column value', success = 'success', error = 'error', table = this.table || 'members') {
    const records = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM ${table} WHERE ${column}='${value}' ORDER BY ${column} DESC LIMIT 1`, (err, rows) => {
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


   /**
   * @name lastBy
   * @function
   *
   * @param {String} column database table column name
   * @param {String} value database table column value
   * @param {String} success success event
   * @param {String} error  error event
   * @param {String} table database table name
   *
   * @description find last record by column name and column value
   *
   * @return {Object}  last record found
   *
   */
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

   /**
   * @name findById
   * @function
   *
   * @param {String} id table datum id
   * @param {String} table database table name
   *
   * @description find last record by column name and column value
   *
   * @return {Object}  last record found
   *
   */

  async findById(id, table = this.table || 'members') {
    const member = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM members INNER JOIN addresses ON members.id = addresses.memberId WHERE members.id='${id}' LIMIT 1`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    return member;
  }

  /**
   * @name findByFirstName
   * @function
   *
   * @param {String} firstName table datum firstName
   * @param {String} table database table name
   *
   * @description finds records by first name
   *
   * @return {Object}  all records
   *
   */
  async findByFirstName(firstName, table = this.table || 'members') {
    return await this.findBy('firstName', firstName, 'findByFirstName', 'findByFirstName-error', table);
  }


   /**
   * @name findByLastName
   * @function
   *
   * @param {String} lastName table datum lastName
   * @param {String} table database table name
   *
   * @description finds records by last name
   *
   * @return {Object}  all records
   *
   */

  async findByLastName(lastName, table = this.table || 'members') {
    return await this.findBy('lastName', lastName, 'findByLastName', 'findByLastName-error', table);
  }

  
   /**
   * @name findByPhone
   * @function
   *
   * @param {String} phone table datum phone number
   * @param {String} table database table name
   *
   * @description finds records by phone
   *
   * @return {Object}  all records
   *
   */
  async findByPhone(phone, table = this.table || 'members') {
    return await this.findBy('phone', phone, 'findByPhone', 'findByPhone-error', table);
  }


   /**
   * @name findByTitle
   * @function
   *
   * @param {String} tile table datum title
   * @param {String} table database table name
   *
   * @description finds records by title
   *
   * @return {Object}  all records
   *
   */
  async findByTitle(title, table = this.table || 'members') {
    return await this.findBy('title', title, 'findByTitle', 'findByTitle-error', table);
  }


    /**
   * @name findByZipCode
   * @function
   *
   * @param {String} zip table datum zip
   * @param {String} table database table name
   *
   * @description finds records by zip code
   *
   * @return {Object}  all records
   *
   */
  
  async findByZipCode(zip = '84105', table = this.table || 'members') {
    return await this.findBy('zip', zip, 'findByZipCode', 'findByZipCode-error', table);

  }

    /**
   * @name findByCity
   * @function
   *
   * @param {String} tile table datum city
   * @param {String} table database table name
   *
   * @description finds records by city
   *
   * @return {Object}  all records
   *
   */
  async findByCity(city = 'Park City', table = this.table || 'members') {
    return await this.findBy('city', city, 'findByCity', 'findByCity-error', table);

  }

    /**
   * @name findByState
   * @function
   *
   * @param {String} state table datum state
   * @param {String} table database table name
   *
   * @description finds records by statee
   *
   * @return {Object}  all records
   *
   */
  async findByState(state = 'Utah', table = this.table || 'members') {
    return await this.findBy('state', state, 'findByState', 'findByState-error', table);

  }

    /**
   * @name findByAddress
   * @function
   *
   * @param {String} address table datum address
   * @param {String} table database table name
   *
   * @description finds records by address
   *
   * @return {Object}  all records
   *
   */
  async findByAddress(address = 'address', table = this.table || 'members') {
    return await this.findBy('address', address, 'findByAddress', 'findByAddress-error', table);

  }

    /**
   * @name findByCompany
   * @function
   *
   * @param {String} company table datum company name
   * @param {String} table database table name
   *
   * @description finds records by company
   *
   * @return {Object}  all records
   *
   */
  async findByCompany(company = 'US Ski', table = this.table || 'members') {
    return await this.findBy('company', company, 'findByCompany', 'findByCompany-error', table);
  }

    /**
   * @name findByUrl
   * @function
   *
   * @param {String} url table datum url
   * @param {String} table database table name
   *
   * @description finds records by url
   *
   * @return {Object}  all records
   *
   */
  async findByUrl(url = 'www.google.com', table = this.table || 'members') {
    return await this.findBy('url', url, 'findByUrl', 'findByUrl-error', table);

  }

 

}

module.exports = DBPromise;





