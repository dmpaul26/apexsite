var database = require('../database.js')

var TeamList = function(teamList){ 
    this.list = teamList;
};
TeamList.getAll = async function (result) {
    const query = 'select * from teamlist_total';
    var teamList = {}
    try {
        var queryResult = await database.query(query)
        var error = ''
        if (queryResult.length != 0) {
            teamList = queryResult;
            console.log('Loaded team list: ' + JSON.stringify(teamList))
        }
        else {
            error = 'Part.getPartById retrieved multiple records'
        }

        if (error) {
            console.log(error)
        }
        markMaxDamage(teamList)
        .then((teamList) => {
            result(teamList)
        })
    }
    catch (err) {
        console.log(err)
        result(err, teamList)
    }
}

TeamList.getByDate = async function (date, result) {
    if (date) {
        var query = 'select * from teamlist_date where date = $1';
        var values = [ date ];
    } else {
        var query = 'select * from teamlist_date';
        var values = undefined;
    }
    var teamList = {}
    try {
        if (values) {
            var queryResult = await database.query(query, values)
        } else {
            var queryResult = await database.query(query)
        }
        var error = ''
        if (queryResult.length != 0) {
            teamList = queryResult;
            console.log('Loaded player list: ' + JSON.stringify(teamList))
        }
        else {
            error = 'PlayerList.getByDate resulted in an error'
        }

        if (error) {
            console.log(error)
        }
        markMaxDamage(teamList)
        .then((teamList) => {
            result(teamList)
        })
    }
    catch (err) {
        console.log(err)
        result(err, teamList)
    }
}

async function markMaxDamage(teamList) {
    for (let i = 0; i < teamList.length; i++) {
        if (i === 0) {
            teamList[i].isMaxDamage = true;
        } else {
            teamList[i].isMaxDamage = false;
        }
    }

    return teamList;
}

module.exports = TeamList