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

module.exports = (query, count) => {
  const limit = parseInt(query.limit, 10) || 10;
  const page = parseInt(query.page, 10) || 1;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(count / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    limit,
    page,
    offset,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}