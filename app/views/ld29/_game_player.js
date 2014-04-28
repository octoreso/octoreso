var GamePlayer = function(model)
{
  this.model      = model
  this.unit       = null
  this.inventory  = null
  this.stockpile  = null


  

  this.los_radius = 9
  this.los_min = 5
  this.los_y_penalty = 0.06
  this.init = function()
  {
    this.unit      = new GameUnit(model)
    this.inventory = new GameInventory(model)
    this.stockpile = new GameStockpile(model)
  }
  this.render = function(view)
  {
    this.render_push(view)
    this.unit.render(view)

    

    if(this.inventory.full)
    {
      var tX = -8
      var tY = 6
      view.ctx.transform(1, 0, 0, 1,  tX,  tY)
      view.renderCustom('full', 1);
      view.ctx.transform(1, 0, 0, 1, -tX, -tY)
    }

    this.render_pop(view)

  }  
  this.render_push = function(view)
  {
    
  }
  this.render_pop = function(view)
  {
  } 
  this.step = function(ms)
  {
    if(!this.unit.dead)
    {
      this.unit.moving = false 
      this.unit.directions = []
      //check controls.
      if(model.keys.map.d || model.keys.map.right_arrow)
      {
        this.unit.moving = true
        this.unit.directions.push(Direction.RIGHT)
      }
      if(model.keys.map.s || model.keys.map.down_arrow)
      {
        this.unit.moving = true
        this.unit.directions.push(Direction.DOWN)
      }
      if(model.keys.map.a || model.keys.map.left_arrow)
      {
        this.unit.moving = true
        this.unit.directions.push(Direction.LEFT)
      }
      if(model.keys.map.w || model.keys.map.up_arrow)
      {
        this.unit.moving = true
        this.unit.directions.push(Direction.UP)
      }
      this.unit.step(ms)
    }
    else {
      //if we're dead, back to the main menu.
      if((this.model.tick_ts - this.unit.died_at - this.unit.death_length) > 0)
      {
        this.model.stateTransition(GameState.MENU);
      }
    }
    
  }
  this.menuStep = function(ms)
  {
    var period    = this.model.tick_ts / 70000 * Math.PI
    var magnitude = 20
    var centreX   = 0
    var centreY   = 50 
    // The player acts as a camera with zero logic.
    this.unit.x = centreX + magnitude * Math.cos(period)
    this.unit.y = centreY + magnitude * Math.sin(period)
  }


  this.los = function()
  {
    var l = Math.max((this.los_radius - (this.los_y_penalty * this.unit.y)),this.los_min)
    if(this.unit.dead)
    {
      now = this.model.tick_ts

      l = l * (1-((now-this.unit.died_at)/(this.unit.death_length)))
      if(l<3.3)
      {
        l =3.3 // Experimentally established!
      }
    }
    return l
  }

  this.init();

}