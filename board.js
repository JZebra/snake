(function(root){
  var SG = root.SG = (root.SG || {} )
  
  var Board = SG.Board = function(){
    this.snake = new SG.Snake();
    this.apple;
    this.grid = createGrid();
    this.placeApple();
    this.score = 0;
  };
  
  function createGrid() {
    var grid = [];
    _.times(20, function(){
      var row = [];
      _.times(40, function(){
        row.push('.')
      });
      grid.push(row);
    });
    return grid;
  }
  
  Board.prototype.placeSnake = function() {
    var that = this;
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if(this.grid[i][j] !== 'O') {
          this.grid[i][j] = '.';
        }
      }
    }
    
    _.each(this.snake.segments, function(segment){
      that.grid[segment.position[0]][segment.position[1]] = 'S';
    });
  }
 
  Board.prototype.render = function() {
    var boardString = ''
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        boardString += this.grid[i][j];
        if (j === 39) {
          boardString += "\n";
        }
      }
    }
    return boardString;
  };
  
  Board.prototype.placeApple = function() {
    var placedApple = false;
    if (this.apple === undefined) {
      while (!placedApple) {
        var x = Math.floor(Math.random() * 19);
        var y = Math.floor(Math.random() * 39);
        
        if (this.grid[x][y] === '.') {
          this.grid[x][y] = 'O';
          this.apple = [x, y];
          console.log(this.apple);
          placedApple = true;
        }
      }
    }
  };
  
  Board.prototype.checkApple = function () {
    var ateApple = false;
    var x = this.snake.head.position[0];
    var y = this.snake.head.position[1];
    
    var x2 = this.apple[0];
    var y2 = this.apple[1];
    
    if ((x === x2) && (y === y2)) {
      ateApple = true;
      this.score += 10;
    }
    
    return ateApple;
  }
  
  
   
})(this);