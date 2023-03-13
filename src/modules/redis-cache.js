const redis = require('redis');
const client = redis.createClient
const pagination = require('./pagination');

module.exports = (ctx, count) => {
  
  const { limit, page, offset, totalPages, hasNextPage, hasPreviousPage } = pagination(ctx.query, count);

  const cacheKey = `members:${limit}:${page}`;

  client.get(cacheKey, async (err, cachedData) => {
    if (err) throw err;

    if (cachedData) {
      ctx.body = JSON.parse(cachedData);
    } else {
      const stmt = db.prepare(`SELECT * FROM members LIMIT ? OFFSET ?`);
      const users = [];
      const cursor = stmt.iterate(limit, offset);

      cursor.on('data', (row) => {
        users.push(row);
      });

      cursor.on('end', () => {
        stmt.finalize();

        const data = {
          users,
          pagination: {
            total: count,
            limit,
            page,
            totalPages,
            hasNextPage,
            hasPreviousPage,
          },
        };

        client.setex(cacheKey, 3600, JSON.stringify(data));
        ctx.body = data;
        //ctx.render('index', {members: data});
      });
    }
  });
}