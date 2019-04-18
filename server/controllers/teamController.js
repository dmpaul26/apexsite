var GameLog = require('../models/gameLogModel')

exports.getByPlayers = function(req, res) {
    const players = req.params.players;
    GameLog.getByPlayers(players, function(gameLog, err=null) {
        if (err) {
            console.log(err)
            res.status(500).send('Server error retrieving player list, ' + err)
        }
        else {
            res.send(gameLog)
        }
    })
}