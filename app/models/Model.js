"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Model
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires MongoClient
 * @requires ObjectId
 * @requires EventEmitter
 *
 * @classdesc Model class
 */


class Model extends require('../../src/model') {

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
        // this.methodizer(AsyncAwait);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
      }


}

module.exports = Model;


