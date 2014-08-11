(function(root){
  var SG = root.SG = (root.SG || {});
  
  var UI = SG.UI = function($rootel) {
    this.$el = $rootel;
  };
  
  UI.KEYS = { 'w': 87, 'a': 65, 's': 83, 'd': 68 };
  
  UI.prototype.start = function(highscore) {  
    this.board = new SG.Board(highscore);
    // remove start game listener placed by #gameover
    $('.messages').empty;
    $('body').unbind('keydown');
    // bind keypress listener
    $('body').on('keydown', turnSnake.bind(this));
    
    this.clock = setInterval(step.bind(this), 60);
  };
  
  UI.prototype.stop = function() {
    clearInterval(this.clock);
  };
  
  UI.prototype.draw = function() {
    this.$el.html(this.board.render());
    $('.score').html("Score: " + this.board.score);
    $('.high-score').html('High Score: ' + this.board.highscore)
  };
  
  UI.prototype.gameover = function() {
    this.stop();
    $('.messages').html("You hit something and exploded into " + this.board.snake.segments.length + " pieces")
    if (this.board.score > this.board.highscore) {
      this.board.highscore = this.board.score;
      $('.messages').append(' but at least you got a new high score!')
    }
    $('.messages').append('<br>' + 'Press any key to play again!')
    $('body').on('keydown', function() {
      this.start(this.board.highscore)
    }.bind(this));
  };
  
  function turnSnake(event) {
    
    var snake = this.board.snake;
    
    if ( event.which === UI.KEYS['w'] ) {
      snake.turn('up');
    } else if ( event.which === UI.KEYS['d'] ) {
      snake.turn('right');
    } else if ( event.which === UI.KEYS['s'] ) {
      snake.turn('down');
    } else if ( event.which === UI.KEYS['a'] ) {
      snake.turn('left');
    }
  }
  
  function step() {
    if (this.board.snake.checkCollision()){
      this.gameover();
    }
    
    var snake = this.board.snake;
    
    var tail = snake.segments[snake.segments.length - 1];
    var x = tail.position[0];
    var y = tail.position[1];
    
    snake.move();
    if (this.board.checkApple()) {
      snake.segments.push(new SG.Segment([x,y]));
      
      this.board.apple = undefined;
      this.board.placeApple();
    }
    this.board.placeSnake();
    this.draw();
  }
  
  
})(this);

$(document).ready(function() {
  window.game = new SG.UI($('#snake'));
  window.game.start();
});

