(function(root){
  var SG = root.SG = (root.SG || {});
  
  var Segment = SG.Segment = function Segment(position) {
    this.position = position;
  }

  Segment.prototype.plus = function(vector) {
    var x = this.position[0] + vector[0];
    var y = this.position[1] + vector[1];
    this.position = [x, y];
  };
  
  
  var Snake = SG.Snake = function() {
    this.receivedInput = false; //fixes multiple inputs per tick error
    this.dir = Snake.DIRS[0];
    this.head = new Segment([10, 20]);
    this.segments = [this.head, new Segment([10, 21])];
  };
  
  Snake.DIRS = ['left', 'down', 'right', 'up'];
  Snake.VECTS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  
  Snake.prototype.move = function() {
    var vectIndex = Snake.DIRS.indexOf(this.dir);
    var currentPosition;
    var tempPosition = this.head.position
    _.each(this.segments, function(segment, index, list) {
      if (index === 0) { return; }
      currentPosition = segment.position;
      segment.position = tempPosition;
      tempPosition = currentPosition;
    });
    this.head.plus(Snake.VECTS[vectIndex]);
    this.receivedInput = false;
  };
  
  Snake.prototype.turn = function (turnDir) {
    if (!this.receivedInput) {
      var idx = Snake.DIRS.indexOf(this.dir);
      var idx2 = Snake.DIRS.indexOf(turnDir);
      if ( (idx % 2 == 0) && (idx2 % 2) == 0 ) {
        return;      
      } else if ( (idx % 2 == 1) && (idx2 % 2) == 1 ) {
        return;
      }
      this.dir = turnDir;
    }
    this.receivedInput = true
  };
  
  Snake.prototype.checkCollision = function () {
    var youDead = false;
    var segments = this.segments;
    
    var x = this.head.position[0];
    var y = this.head.position[1];
    
    //Checking if the player hit a wall
    
    if ( (x <= 0) || (x >= 19) ) {
      youDead = true;
    } else if ( (y <= 0) || (y >= 39) ) {
      youDead = true;
    }
    
    //Checking if the player bit himself
    
    _.each(segments, function(segment, index) {
      //Don't check to bite your own head with your own head
      if (index === 0) {
        return;
      }
      
      var x2 = segment.position[0];
      var y2 = segment.position[1];
      
      if ((x === x2) && (y === y2)) {
        youDead = true;
      }
    });
    return youDead;
  }
    
})(this);