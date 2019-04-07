var GameLog = require('../models/gameLogModel')

exports.getByPlayerName = function(req, res) {
    const playerName = req.params.playerName;
    GameLog.getByPlayerName(playerName, function(gameLog, err=null) {
        if (err) {
            console.log('hey' + err)
            res.status(500).send('Server error retrieving player list, ' + err)
        }
        else {
            res.send(gameLog)
        }
    })
}