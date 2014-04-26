var GameWorld = function(model)
{
  this.model = model
  this.blocks = []

  this.init = function()
  {
    for(var x=-WORLD_WIDTH;x<WORLD_WIDTH;x++)
    {
      if(!this.blocks[x])
      {
        this.blocks[x] = []
      }

      for(var y=-WORLD_HEIGHT;y<WORLD_HEIGHT;y++)
      {
        if((x<2 && x>-2) && (y<1 && y>-2))
        {
          this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.dirt_gone)
        } else {
          switch(Math.floor(Math.random()*6))
          {
            case 1:
              this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.stone)
            break;
            default:
              this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.dirt)
            break;
          }
        }
      }
    }
  }
  this.render = function(view)
  {
    this.render_push(view)
    var r = Math.ceil(this.model.player.los())
    var x = Math.round(this.model.player.unit.x)
    var y = Math.round(this.model.player.unit.y)

    for(var i=(x-r); i<(x+r); i++)
    {
      for(var j=(y-r); j<(y+r); j++)
      {

        if(Math.abs(x-i)+Math.abs(y-j) < r)
        {
          if(this.blocks[i] && this.blocks[i][j])
          {
            this.blocks[i][j].render(view)
          } 
          else
          {
            new GameBlock(this.model, i,j, this.model.blockTypes.dirt_gone).render(view)
          }
        }


      }
    }
    this.render_pop(view)

  }  
  this.render_push = function(view)
  {
    view.ctx.transform(1, 0, 0, 1,  
      -TILE_SIZE * model.player.unit.x,  
      -TILE_SIZE * model.player.unit.y)
  }
  this.render_pop = function(view)
  {
    view.ctx.transform(1, 0, 0, 1, 
      TILE_SIZE * model.player.unit.x, 
      TILE_SIZE * model.player.unit.y)
  } 
  this.step = function(ms)
  {
    //collisions etc.
    var r = Math.ceil(this.model.player.los());
    var x = Math.round(this.model.player.unit.x)
    var y = Math.round(this.model.player.unit.y)

    for(var i=(x-r); i<(x+r); i++)
    {
      for(var j=(y-r); j<(y+r); j++)
      {
        if(this.blocks[i] && this.blocks[i][j])
        {
          this.blocks[i][j].step(ms)
        } 
        else
        {
        
        }
      }
    }
    this.collision(this.model.player.unit.x,this.model.player.unit.y,ms)
  } 

  this.collisionCondition=function(x,y)
  {
    return (this.blocks[x] && this.blocks[x][y] && this.blocks[x][y].blockType.solid)
  }

  this.collision = function(x, y, ms)
  { 
    var area = PLAYER_SIZE/TILE_SIZE/2
    var normalCompensation = 0.9
    var floorCompensation  = 0.8

    if(this.collisionCondition(Math.round(x),Math.round(y+area*floorCompensation)))
    {
      //Floor collision.
      model.player.unit.collide(ms, 0, 1,Math.round(x),Math.round(y+area*floorCompensation));

    } else if(this.collisionCondition(Math.round(x),Math.round(y+area))) {
      
      //Floor collision within tolerance.

      model.player.unit.onSurface(ms, 0, 2, Math.round(x),Math.round(y+area*normalCompensation));

    } else if(this.collisionCondition(Math.round(x),Math.round(y-area*normalCompensation))) {
      //Ceiling
      model.player.unit.collide(ms, 0, -1, Math.round(x),Math.round(y-area*normalCompensation));
    } 

    //Wall collision.
    if(this.collisionCondition(Math.round(x+area*normalCompensation),Math.round(y)))
    {
      model.player.unit.collide(ms, 1, 0, Math.round(x+area*normalCompensation),Math.round(y));

    } 
    if(this.collisionCondition(Math.round(x-area*normalCompensation),Math.round(y)))
    {
      model.player.unit.collide(ms, -1, 0, Math.round(x-area*normalCompensation),Math.round(y));
    } 

  } 
  this.init();
}