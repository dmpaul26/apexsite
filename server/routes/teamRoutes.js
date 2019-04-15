module.exports = function(app) {
    var teamList = require('../controllers/teamListController');
  
    // user Routes
    app.get('/api/getTeamList', teamList.getAll)
    app.post('/api/getTeamList', teamList.getByDate)
  };