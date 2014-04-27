var GamePlayer = function(model)
{
  this.model      = model
  this.unit       = null
  this.inventory  = null
  this.stockpile  = null

  this.los_radius = 12
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

    var tX = -8
    var tY = 6

    if(this.inventory.full)
    {
      view.ctx.transform(1, 0, 0, 1,  tX,  tY)
      view.renderCustom('full',1);
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
  this.los=function()
  {
    return Math.max((this.los_radius - (this.los_y_penalty * this.unit.y)),this.los_min)
  }

  this.init();

}