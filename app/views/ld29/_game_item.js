var GameItem = function(type){
  this.icon = null
  this.name = type

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
      case 'iron':
        this.icon = 3
      break;
      case 'coal':
        this.icon = 4
      break;

    }
  }
  this.init(type);
}