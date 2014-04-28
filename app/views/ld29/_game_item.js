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
      break;
      case 'fuel':
        this.icon = 5
        this.onGet=function(player)
        {
          player.unit.refuel();
        }
      break;
      case 'health':
        this.icon = 6
        this.onGet=function(player)
        {
          player.unit.heal();
        }
      break;
      case 'drillspeed':
        this.icon = 7
        this.onGet=function(player)
        {
          player.unit.improveDrill();
        }
      break;
      case 'light':
        this.icon = 8
        this.onGet=function(player)
        {
          player.unit.improveLOS();
        }
      break;
      case 'fueltank':
        this.icon = 9
        this.onGet=function(player)
        {
          player.unit.improveFuelTank();
        }
      break;
      case 'engine':
        this.icon = 10
        this.onGet=function(player)
        {
          player.unit.improveEngine();
        }
      break;
      case 'cargo':
        this.icon = 11
        this.onGet=function(player)
        {
          player.unit.improveCargo();
        }
      break;

    }
  }
  this.init(type, extra);
}