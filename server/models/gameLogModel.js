var database = require('../database.js')

var GameLog = function(gameLog){ 
    this.list = gameLog;
};
GameLog.getByPlayerName = async function (playerName, result) {
    const query = 'select timestamp, damage, kills, revives, respawns, win from gamelog where player = $1';
    const values = [playerName];
    var gameLog = {}
    try {
        var queryResult = await database.query(query, values)
        var error = ''
        if (queryResult.length != 0) {
            gameLog = queryResult;
            console.log('Loaded game log: ' + JSON.stringify(gameLog))
        }
        else {
            error = 'error'
        }

        if (error) {
            console.log(error)
        }
        
        result(gameLog)
    }
    catch (err) {
        console.log(err)
        result(err, gameLog)
    }
}

async function formatDates(gameLog) {
    for (let i = 0; i < gameLog.length; i++) {
        var timestamp = gameLog[i].timestamp;
        gameLog[i].timestamp = gameLog[i].timestamp.substring(0, 10);
    }

    return gameLog;
}
module.exports = GameLog