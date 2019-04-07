const { Pool } = require('pg')
const { dbUser, dbHost, dbDatabase, dbPassword, dbPort } = require('./config')

async function query(query) {
    const pool = new Pool({
        user: dbUser,
        host: dbHost,
        database: dbDatabase,
        password: dbPassword,
        port: dbPort
    })
        
    return await pool.query(query)
    .then((res) => {
        console.log(res.rows[0].player);
        pool.end()
        return res.rows;
    })
}

/* async function query(query, values) {
    const pool = new Pool({
        user: dbUser,
        host: dbHost,
        database: dbDatabase,
        password: dbPassword,
        port: dbPort
    })
        
    pool.query(query, values, (err, res) => {
        if (err) {
            console.log(err);
        } else if (res.rows.length === 0) {
            console.log('0 rows returned');
        } else {
            console.log(res.rows[0].player);
        }
        pool.end()
    })
} */

module.exports = {
    query
}