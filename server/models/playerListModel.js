var database = require('../database.js')

var PlayerList = function(playerList){ 
    this.list = playerList;
};
PlayerList.getAll = async function (result) {
    const query = 'select * from playerlist';
    var playerList = {}
    try {
        var queryResult = await database.query(query)
        var error = ''
        if (queryResult.length != 0) {
            playerList = queryResult;
            console.log('Loaded player list: ' + JSON.stringify(playerList))
        }
        else {
            error = 'Part.getPartById retrieved multiple records'
        }

        if (error) {
            console.log(error)
        }
        result(playerList)
    }
    catch (err) {
        console.log(err)
        result(err, playerList)
    }
}

module.exports = PlayerList