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
 * @module Model
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires DBPromise
 *
 * @classdesc Model class
 */

const DBPromise = require('db-promise')

class Model extends require("base") {

    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(Model);
        // auto invoke methods
        this.autoinvoker(Model);
        // add other classes method if methods do not already exist. Argument order matters!
        this.methodizer(DBPromise);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
      }


}

module.exports = Model;


