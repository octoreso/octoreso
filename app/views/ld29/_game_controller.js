var GameController = function(){
  this.model = null;
  this.view  = null;

  this.init  = function(state, initial)
  {
    this.state = state
    if(!initial)
    {
      delete this.model
      delete this.view
    }

    this.model = new GameModel(this);
    this.view =  new GameView(this);
    
    this.model.start();
    this.view.start();
    if(DEBUG_STATE !== false && initial)
    {
      console.log("Setting DEBUG STATE to "+DEBUG_STATE)
      this.state = DEBUG_STATE
    }
  };

  this.init(GameState.MENU, true);
}