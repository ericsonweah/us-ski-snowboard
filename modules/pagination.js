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