/**
首先是定义 Player 构造函数和 player 对象的原型方法，在 player 对象的这些原型方法 中，不再负责具体的执行逻辑，而是把操作转交给中介者对象，我们把中介者对象命名为 playerDirector
*/
function Player(name, teamColor) {
  this.name = name; // 角色名字    
  this.teamColor = teamColor; // 队伍颜色      
  this.state = 'alive'; // 玩家生存状态
};

Player.prototype.win = function () {
  console.log(this.name + ' won ');
};

Player.prototype.lose = function () {
  console.log(this.name + ' lost');
};

/*******************玩家换队*****************/

Player.prototype.changeTeam = function (color) {
  playerDirector.reciveMessage('changeTeam', this, color); // 给中介者发送消息，玩家换队
};

/*******************玩家死亡*****************/

Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.reciveMessage('playerDead', this); // 给中介者发送消息，玩家死亡 
};

/*******************移除玩家*****************/

Player.prototype.remove = function () {
  playerDirector.reciveMessage('removePlayer', this); // 给中介者发送消息，移除一个玩家
};


/**创建玩家对象的工厂函数 */
var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor); // 创造一个新的玩家对象     
  playerDirector.reciveMessage('addPlayer', newPlayer); // 给中介者发送消息，新增玩家 

  return newPlayer;
};

/** 实现中介者对象 */
var playerDirector = (function () {
  var players = {}, // 保存所有玩家       
    operations = {}; // 中介者可以执行的操作 

  /****************新增一个玩家***************************/
  operations.addPlayer = function (player) {
    var teamColor = player.teamColor; // 玩家的队伍颜色        
    players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍         players[ teamColor ].push( player );   // 添加玩家进队伍     
  };

  /****************移除一个玩家***************************/
  operations.removePlayer = function (player) {
    var teamColor = player.teamColor, // 玩家的队伍颜色    
      teamPlayers = players[teamColor] || []; // 该队伍所有成员    
    for (var i = teamPlayers.length - 1; i >= 0; i--) { // 遍历删除 
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };
  /****************玩家换队***************************/
  operations.changeTeam = function (player, newTeamColor) { // 玩家换队    
    operations.removePlayer(player); // 从原队伍中删除        
    player.teamColor = newTeamColor; // 改变队伍颜色        
    operations.addPlayer(player); // 增加到新队伍中   
  };

  operations.playerDead = function (player) { // 玩家死亡       
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor]; // 玩家所在队伍 

    var all_dead = true;

    for (var i = 0, player; player = teamPlayers[i++];) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    if (all_dead === true) { // 全部死亡 

      for (var i = 0, player; player = teamPlayers[i++];) {
        player.lose(); // 本队所有玩家 lose    
      }

      for (var color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color]; // 其他队伍的玩家  
          for (var i = 0, player; player = teamPlayers[i++];) {
            player.win(); // 其他队伍所有玩家 win    
          }
        }
      }
    }
  };

  var reciveMessage = function () {
    var message = Array.prototype.shift.call(arguments); // arguments 的第一个参数为消息名称    
    operations[message].apply(this, arguments);
  };

  return {
    reciveMessage: reciveMessage
  }

})();

/**
 * 可以看到，除了中介者本身，没有一个玩家知道其他任何玩家的存在，玩家与玩家之间的耦 合关系已经完全解除，
 * 某个玩家的任何操作都不需要通知其他玩家，而只需要给中介者发送一个 消息，中介者处理完消息之后会把处理结果反馈给其他的玩家对象。
 * 我们还可以继续给中介者扩 展更多功能，以适应游戏需求的不断变化。 
 */

// 红队：
var player1 = playerFactory('皮蛋', 'red'),
  player2 = playerFactory('小乖', 'red'),
  player3 = playerFactory('宝宝', 'red'),
  player4 = playerFactory('小强', 'red');

// 蓝队： 
var player5 = playerFactory('黑妞', 'blue'),
  player6 = playerFactory('葱头', 'blue'),
  player7 = playerFactory('胖墩', 'blue'),
  player8 = playerFactory('海盗', 'blue');

player1.die();
player2.die();
player3.die();
player4.die();