(function(root){
  var SG = root.SG = (root.SG || {});
  
  var UI = SG.UI = function($rootel) {
    this.$el = $rootel;
  };
  
  UI.KEYS = { 'w': 87, 'a': 65, 's': 83, 'd': 68 };
  
  UI.prototype.start = function() {  
    this.board = new SG.Board();
    
    $('body').on('keydown', turnSnake.bind(this));
    
    this.clock = setInterval(step.bind(this), 60);
  };
  
  UI.prototype.stop = function() {
    clearInterval(this.clock);
  }
  
  UI.prototype.draw = function() {
    this.$el.html(this.board.render());
    $('h1').html('SNAKE ' + this.board.score);
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
      this.stop();
      alert("Sucka");
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

