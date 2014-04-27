var GameWorld = function(model)
{
  this.model = model
  this.blocks = []

  this.init = function()
  {
    this.generate();
  };

  this.generate = function(){
    for(var x=WORLD_X_MIN;x<WORLD_X_MAX;x++)
    {
      if(!this.blocks[x])
      {
        this.blocks[x] = []
      }

      for(var y=WORLD_Y_MIN;y<WORLD_Y_MAX;y++)
      {
        this.generateBasicTerrain(x,y)
      }  
    }

    for(var x=WORLD_X_MIN;x<WORLD_X_MAX;x++)
    {
      for(var y=WORLD_Y_MIN;y<WORLD_Y_MAX;y++)
      {
        this.generateSpecial(x,y)
      }
    }
    this.generateWalls()
    this.generatePortal(0,0)
  }

  this.generateBasicTerrain=function(x,y)
  {
    switch(Math.floor(Math.random()*14))
    {
      case 1:
      case 2:
        this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.stone)
      break
      case 3:
        this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.iron)
      break;
      case 4:
        this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.coal)
      break;
      default:
        this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.dirt)
      break;
    }
  }

  this.generateSpecial = function(x,y)
  {
    switch(Math.floor(Math.random()*190))
    {
      case 1:
        this.generatePortal(x,y)
      break;
      default:
      break;
    }
  }
  this.generateWalls = function()
  {
    for(i = WORLD_X_MIN; i<WORLD_X_MAX; i++)
    {
      this.blocks[i][WORLD_Y_MIN] = new GameBlock(this.model, i, WORLD_Y_MIN, this.model.blockTypes.bedrock)
      this.blocks[i][WORLD_Y_MAX] = new GameBlock(this.model, i, WORLD_Y_MAX, this.model.blockTypes.bedrock)
    }
    this.blocks[WORLD_X_MIN] = []
    this.blocks[WORLD_X_MAX] = []
    for(j = WORLD_Y_MIN; j<WORLD_Y_MAX; j++)
    {
      this.blocks[WORLD_X_MIN][j] = new GameBlock(this.model, WORLD_X_MIN, j, this.model.blockTypes.bedrock)
      this.blocks[WORLD_X_MAX][j] = new GameBlock(this.model, WORLD_X_MAX, j, this.model.blockTypes.bedrock)
    }

    this.blocks[WORLD_X_MIN][WORLD_Y_MIN] = new GameBlock(this.model, WORLD_X_MIN, WORLD_Y_MIN, this.model.blockTypes.bedrock)
    this.blocks[WORLD_X_MIN][WORLD_Y_MAX] = new GameBlock(this.model, WORLD_X_MIN, WORLD_Y_MAX, this.model.blockTypes.bedrock)
    this.blocks[WORLD_X_MAX][WORLD_Y_MIN] = new GameBlock(this.model, WORLD_X_MAX, WORLD_Y_MIN, this.model.blockTypes.bedrock)
    this.blocks[WORLD_X_MAX][WORLD_Y_MAX] = new GameBlock(this.model, WORLD_X_MAX, WORLD_Y_MAX, this.model.blockTypes.bedrock)
  }

  this.generatePortal= function(x,y)
  {
    //hollow out.
    for(var i=-1; i<=1; i++)
    {
      for(var j=-1; j<1; j++)
      {

        if(this.blocks[x+i] && this.blocks[x+i][y+j])
        {
          this.blocks[x+i][y+j] = new GameBlock(this.model, x+i, y+j, this.model.blockTypes.dirt_gone)
        }
      }
    }
    this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.portal)
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
            new GameBlock(this.model, i,j, this.model.blockTypes.space).render(view)
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