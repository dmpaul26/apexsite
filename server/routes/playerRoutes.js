    
module.exports = function(app) {
    var playerList = require('../controllers/playerListController');
  
    // user Routes
    app.get('/api/getPlayerList', playerList.getAll)
  };