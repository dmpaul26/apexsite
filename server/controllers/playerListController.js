var PlayerList = require('../models/playerListModel')

exports.getAll = function(req, res) {
    PlayerList.getAll(function(playerList, err=null) {
        if (err) {
            logger.error(err)
            res.status(500).send('Server error retrieving player list, ' + err)
        }
        else {
            res.send(playerList)
        }
    })
}