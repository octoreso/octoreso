var GameModel = function(ctrl){
  this.ctrl = ctrl
  
  this.MODEL_FPS = 60

  this.player      = null
  this.world       = null
  this.keys        = null
  this.blockTypes  = null

  this.tickTimer   = null
  this.tick_ts     = new Date().getTime()
  this.tick_ms     = 0

  this.init = function()
  {
    this.blockTypes = new GameBlockTypes(this);
    this.player     = new GamePlayer(this);
    this.world      = new GameWorld(this);
    this.keys       = new GameKeyListener(this);
  }

  this.start = function()
  {
    // SET UP MODEL TICKS
    this.tickTimer = setInterval(this.tick,(1000/this.MODEL_FPS), this);
  }


  this.tick = function(model)
  {
    ms = 1000/model.MODEL_FPS
    model.step(ms)
    var new_ts = new Date().getTime()
    model.tick_ms = (new_ts - model.tick_ts)
    model.tick_ts = new_ts
  }
  
  this.step = function(ms)
  {
    // world collides before player input step
    this.world.step(ms)
    this.player.step(ms) 
  }

  // we have no menu yet.
  this.init();
};