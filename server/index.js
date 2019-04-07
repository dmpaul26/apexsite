const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      port = 3000

const database = require('./database');
app.use(bodyParser.json())

const cors = require('cors')
cors({credentials: true, origin: true})
app.use(cors())

app.get('/api/db/getTest', async (req, res) => {
    //const result = await db.testQuery()
    /* const result = await db.testListQuery() */
    const result = '';
    res.send({ result: result })
    console.log(result)
});

app.listen(port, () => console.log(`Listening on port ${port}...`))

/* database.query('INSERT INTO gamelog(timestamp, player, damage, kills, revives, respawns, win)' + 
               ' VALUES(to_timestamp($1), $2, $3, $4, $5, $6, $7)',
               [Date.now()/1000, 'Orange', 1, 1, 1, 1, true]) */

//retrieveStatsDayPlayer();

async function retrieveStatsDayPlayer() {
    var gamesRef = db.collection('games')

    const resultTable = await gamesRef.get()
    .then((snapshot) => {
        var docs = []
        snapshot.forEach((doc) => {
            if (doc.data()/* .timestamp._seconds > 1554585777 */) {
                docs.push(doc.data());
            }
        });
        return docs;
    });

/*     insertAllGames(resultTable); */
    console.log(resultTable.length + ' loaded');
    return resultTable;
}

/* function insertAllGames(gamelog) {
    for (let i = 0; i < gamelog.length; i++) {
        database.query('INSERT INTO gamelog(timestamp, player, damage, kills, revives, respawns, win)' + 
                       ' VALUES(to_timestamp($1), $2, $3, $4, $5, $6, $7)',
                       [gamelog[i].timestamp._seconds, gamelog[i].playerName, gamelog[i].damage, gamelog[i].kills, gamelog[i].revives, gamelog[i].respawns, gamelog[i].win])
    }
} */

var routes = require('./routes')
routes.player(app)