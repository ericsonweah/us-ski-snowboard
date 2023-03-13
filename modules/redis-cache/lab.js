router.get('/', async (ctx) => {
    const count = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) AS count FROM users', (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count);
        }
      });
    });
  
    const { limit, page, offset, totalPages, hasNextPage, hasPreviousPage } =
      pagination(ctx.query, count);
  
    const cacheKey = `users:${limit}:${page}`;
  
    client.get(cacheKey, async (err, cachedData) => {
      if (err) throw err;
  
      if (cachedData) {
        ctx.body = JSON.parse(cachedData);
      } else {
        const stmt = db.prepare(`SELECT * FROM users LIMIT ? OFFSET ?`);
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
        });
      }
    });
  });
  
  router.post('/', async (ctx) => {
    const { name, email, password } = ctx.request.body;
  
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password], (err) => {
        if (err) {
          reject(err);
        } else {
          io.emit('new-user', { name, email });
          resolve();
        }
      });
    });
  
    ctx.status = 201;
  });
  
  module.exports = router;
  