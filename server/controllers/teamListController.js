var TeamList = require('../models/teamListModel')

exports.getAll = function(req, res) {
    console.log(JSON.stringify(req.body))
    TeamList.getAll(function(teamList, err=null) {
        if (err) {
            console.log(err)
            res.status(500).send('Server error retrieving team list, ' + err)
        }
        else {
            res.send(teamList)
        }
    })
}

exports.getByDate = function(req, res) {
    const date = req.body.date;
    TeamList.getByDate(date, function(teamList, err=null) {
        if (err) {
            console.log(err)
            res.status(500).send('Server error retrieving team list, ' + err)
        }
        else {
            res.send(teamList)
        }
    })
}