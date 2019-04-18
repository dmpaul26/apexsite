module.exports = function(app) {
    var teamList = require('../controllers/teamListController');
    var team = require('../controllers/teamController');
  
    // user Routes
    app.get('/api/getTeamList', teamList.getAll)
    app.get('/api/getTeamGameLog/:players', team.getByPlayers)
    app.post('/api/getTeamList', teamList.getByDate)
  };