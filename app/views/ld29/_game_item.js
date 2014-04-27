var GameItem = function(type, extra){
  this.icon = null
  this.name = type
  this.extra = extra
  this.onGet = function()
  {

  }

  this.init = function(type, extra)
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
      case 'fuel':
        this.icon = 5
        this.onGet=function(player)
        {
          console.log("REFUELING PLAYER")
          player.unit.refuel();
        }
      break;
      case 'health':
        this.icon = 6
        this.onGet=function(player)
        {
          console.log("HEALING PLAYER")
          player.unit.heal();
        }
      break;
    }
  }
  this.init(type, extra);
}