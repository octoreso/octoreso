var GameController = function(){
  this.model = null;
  this.view  = null;

  this.STATES  = ['LOADING', 'MENU', 'PLAYING', 'CRASH']
  this.MAX_FPS = 25;

  this.state      = 2
  this.init  = function()
  {
    this.model = new GameModel(this);
    this.view =  new GameView(this);
    
    this.model.start();
    this.view.start();
  };

  this.init();
}