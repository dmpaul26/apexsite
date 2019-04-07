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

 async function query(query, values) {
    const pool = new Pool({
        user: dbUser,
        host: dbHost,
        database: dbDatabase,
        password: dbPassword,
        port: dbPort
    })

    console.log('querying: ' + query);
        
    return await pool.query(query, values)
    .then((res) => {
        console.log(res.rows);
        pool.end()
        return res.rows;
    })
} 

module.exports = {
    query
}