var GameModel = function(ctrl){
  this.ctrl = ctrl
  this.idle = true  
  
  this.MODEL_FPS = 60

  this.player      = null
  this.world       = null
  this.keys        = null
  this.blockTypes  = null
  this.menu        = null

  this.tickTimer   = null
  this.tick_ts     = new Date().getTime()
  this.tick_ms     = 0

  this.init = function()
  {
    this.blockTypes = new GameBlockTypes(this);
    this.menu       = new GameMenu(this);
    this.keys       = new GameKeyListener(this);
  }

  this.start = function()
  {
    // SET UP MODEL TICKS
    this.player     = new GamePlayer(this);
    this.world      = new GameWorld(this);
    this.tickTimer  = window.setInterval(this.tick,(1000/this.MODEL_FPS), this);
  }

  this.stop = function()
  {
    window.clearInterval(this.tickTimer)
    this.player = null;
    this.world  = null;
    //this.world = null;
  }

  this.tick = function(model)
  {
    this.idle = false
      ms = 1000/model.MODEL_FPS
      model.step(ms)
      var new_ts = new Date().getTime()
      model.tick_ms = (new_ts - model.tick_ts)
      model.tick_ts = new_ts
    this.idle = true
  }
  
  this.step = function(ms)
  {
    
    // world collides before player input step
    switch(this.ctrl.state)
    {
      case GameState.PLAYING:
        this.world.step(ms)
        this.player.step(ms) 
      break;

      case GameState.MENU:
        this.menu.step(ms)
        if(this.player) {
          this.player.menuStep(ms)
        } else{
          console.log("Avoiding Menustep")
        }
      break;
    }
  }

  this.stateTransition=function(newState)
  {
    this.ctrl.view.stop();
    this.stop();
    
    while(!this.idle || !this.ctrl.view.idle) { console.log('Waiting for threads to die') }
    
    //this.ctrl.view.start();
    //this.start();
    this.ctrl.init(newState, true);
  }

  // we have no menu yet.
  this.init();
};