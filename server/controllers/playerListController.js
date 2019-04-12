var PlayerList = require('../models/playerListModel')

exports.getAll = function(req, res) {
    console.log(JSON.stringify(req.body))
    PlayerList.getAll(function(playerList, err=null) {
        if (err) {
            console.log(err)
            res.status(500).send('Server error retrieving player list, ' + err)
        }
        else {
            res.send(playerList)
        }
    })
}

exports.getByDate = function(req, res) {
    const date = req.body.date;
    PlayerList.getByDate(date, function(playerList, err=null) {
        if (err) {
            console.log(err)
            res.status(500).send('Server error retrieving player list, ' + err)
        }
        else {
            res.send(playerList)
        }
    })
}