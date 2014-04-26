var GameItem = function(type){
  this.icon = null

  this.init = function(type)
  {
    switch(type)
    {
      case 'dirt':
        this.icon = 1
      break;
      case 'stone':
        this.icon = 2
      break;

    }
  }
  this.init(type);
}