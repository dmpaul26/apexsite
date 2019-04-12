    
module.exports = function(app) {
    var playerList = require('../controllers/playerListController');
    var player = require('../controllers/playerController');
  
    // user Routes
    app.get('/api/getPlayerList', playerList.getAll)
    app.get('/api/getGameLog/:playerName', player.getByPlayerName)
    app.post('/api/getPlayerList', playerList.getByDate)
  };