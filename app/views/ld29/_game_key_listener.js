var GameKeyListener =function(){
  this.map = {
    w:false,
    s:false,
    a:false,
    d:false,
    left_arrow:false,
    right_arrow:false,
    up_arrow:false,
    down_arrow:false,
    space:false,
    enter:false
  };

  this.init = function()
  {
    window.addEventListener("keydown",this.keyDown.bind(this),true);
    window.addEventListener("keyup",  this.keyUp.bind(this),  true);
  }
  this.keyDown = function(e)
  {
    this.setKey(e, true);
  };
  this.keyUp = function(e)
  {
    this.setKey(e, false);
  };
  this.setKey = function(e, state)
  {
    switch(e.keyCode)
    {
      case 13: 
        this.map.enter = state
        e.preventDefault();
      break;
      case 87: 
        this.map.w = state
        e.preventDefault();
      break;
      case 83:
        this.map.s = state
        e.preventDefault();
      break;
      case 65:
        this.map.a = state
        e.preventDefault();
      break;
      case 68: 
        this.map.d = state
        e.preventDefault();
      break;
      case 32: 
        this.map.space = state
        e.preventDefault();
      break;
      case 37: 
        this.map.left_arrow = state
        e.preventDefault();
      break;
      case 38: 
        this.map.up_arrow = state
        e.preventDefault();
      break;
      case 39: 
        this.map.right_arrow = state
        e.preventDefault();
      break;
      case 40: 
        this.map.down_arrow = state
        e.preventDefault();
      break;
    }
  };
  this.init();
}