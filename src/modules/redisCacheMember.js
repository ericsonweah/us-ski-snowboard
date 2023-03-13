module.exports = async ctx => {
    const cacheKey = `my_table_${ctx.query.id}`;
    const cachedData = await ctx.redis.get(cacheKey);

    if (cachedData) {
        ctx.body = JSON.parse(cachedData);
    } else {
        const rows = await ctx.state.db.all('SELECT * FROM members WHERE id = ?', [ctx.query.id]);
        const jsonData = JSON.stringify(rows);
        await ctx.redis.set(cacheKey, jsonData, 'EX', 60);
        ctx.body = rows;
    }
}