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
    this.generatePortal(0,0,true)
  }


  this.generateBasicTerrain=function(x,y)
  {

    var block = this.rollBasicTerrain(x,y)
    this.blocks[x][y] = new GameBlock(this.model, x, y, block)
  }

  this.rollBasicTerrain=function(x,y)
  {
    var rarity = Math.abs(x) + Math.abs(y)
    
    var dirt_gone_chance  = Math.max(0, 2)
    var dirt_chance  = Math.max(0, 15 - (rarity*0.03))
    var stone_chance = Math.max(0, 5 + (rarity*0.12))
    var coal_chance  = Math.max(0, 0 + (rarity*0.1))
    var iron_chance  = Math.max(0, -2 + (rarity*0.1))
    var ruby_chance  = Math.max(0, -10 + (rarity*0.1))
    var mountaindew_chance  = Math.max(0, -50 + (rarity*0.1))

    var chanceSum = dirt_gone_chance + dirt_chance + stone_chance + coal_chance + iron_chance + ruby_chance + mountaindew_chance

    var roll = Math.random() * chanceSum;


    roll = roll - dirt_gone_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.dirt_gone
    }
    roll = roll - dirt_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.dirt
    }

    roll = roll - stone_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.stone
    }

    roll = roll - coal_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.coal
    }
    roll = roll - iron_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.iron
    }
    roll = roll - ruby_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.ruby
    }
    roll = roll - mountaindew_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.mountaindew
    }
  }

  this.rollBasicOffer=function(x,y)
  {
    var rarity = Math.abs(x) + Math.abs(y)
    
    var fuel_chance       = Math.max(0, 60)
    var health_chance     = Math.max(0, 5)
    var drillspeed_chance = Math.max(0, 3)
    var light_chance      = Math.max(0, 15)
    var fueltank_chance   = Math.max(0, 6)
    var engine_chance     = Math.max(0, 6)
    var cargo_chance      = Math.max(0, 6)
    
    var chanceSum = fuel_chance + health_chance + drillspeed_chance + light_chance + fueltank_chance + engine_chance + cargo_chance

    var roll = Math.random() * chanceSum;

    roll = roll - fuel_chance
    if(roll <= 0)
    {
      return new GameItem('fuel')
    }
    roll = roll - health_chance
    if(roll <= 0)
    {
      return new GameItem('health')
    }
    roll = roll - drillspeed_chance
    if(roll <= 0)
    {
      return new GameItem('drillspeed')
    }
    roll = roll - light_chance
    if(roll <= 0)
    {
      return new GameItem('light')
    }
    roll = roll - fueltank_chance
    if(roll <= 0)
    {
      return new GameItem('fueltank')
    }
    roll = roll - engine_chance
    if(roll <= 0)
    {
      return new GameItem('engine')
    }
    roll = roll - cargo_chance
    if(roll <= 0)
    {
      return new GameItem('cargo')
    }
  }

  this.rollBlockDemanded=function(x,y)
  {
    var rarity = Math.abs(x) + Math.abs(y)
    //see normal blocks
    var dirt_chance  = Math.max(0, 15 - (rarity*0.03*1.1))
    var stone_chance = Math.max(0, 5 + (rarity*0.12*1.1))
    var coal_chance  = Math.max(0, 0 + (rarity*0.1*1.1))
    var iron_chance  = Math.max(0, -2 + (rarity*0.1*1.1))
    var ruby_chance  = Math.max(0, -10 + (rarity*0.1*1.1))

    var chanceSum = dirt_chance + stone_chance + coal_chance + iron_chance

    var roll = Math.random() * chanceSum;

    roll = roll - dirt_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.dirt

    }

    roll = roll - stone_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.stone
    }

    roll = roll - coal_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.coal
    }
    roll = roll - iron_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.iron
    }
    roll = roll - ruby_chance
    if(roll <= 0)
    {
      return this.model.blockTypes.ruby
    }
  }

  this.rollBlockDemandedQty=function(x,y, block)
  {
    var rarity = Math.abs(x) + Math.abs(y) + 10

    var rolled = Math.pow(rarity, 1.1)
    switch(block)
    {
      case this.model.blockTypes.dirt:
        rolled = rolled / 5
      break;
      case this.model.blockTypes.stone:
        rolled = rolled / 10
      break;
      case this.model.blockTypes.coal:
        rolled = rolled / 20
      break;
      case this.model.blockTypes.iron:
        rolled = rolled / 35
      break;
      case this.model.blockTypes.ruby:
        rolled = rolled / 100
      break;
    }
    var multi = Math.floor(Math.random()*3)+1
    return Math.ceil(rolled*multi);
  }  

  this.generateSpecial = function(x,y)
  {
    switch(Math.floor(Math.random()*300))
    {
      case 1:
        this.generatePortal(x,y,true)
      break;
      case 2:
      case 3:
      case 4:
      case 5:
        this.generatePortal(x,y,false)
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

  this.generatePortal= function(x,y, hollow)
  {
    if(hollow)
    {
      //hollow out 2x3
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
    }
    this.blocks[x][y] = new GameBlock(this.model, x, y, this.model.blockTypes.portal)


    // modify the portal, adding an appropriate item roll.
    this.blocks[x][y].extra.offerItem         = this.rollBasicOffer(x,y)
    //this.blocks[x][y].extra.offerItem         = new GameItem('cargo')

    this.blocks[x][y].extra.blockDemanded     = this.rollBlockDemanded(x,y)
    this.blocks[x][y].extra.blockDemandedQty  = this.rollBlockDemandedQty(x,y,this.blocks[x][y].extra.blockDemanded)
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

    for(var i=(x-r); i<(x+r); i++)
    {
      for(var j=(y-r); j<(y+r); j++)
      {
        if(Math.abs(x-i)+Math.abs(y-j) < r)
        {
          if(this.blocks[i] && this.blocks[i][j])
          {
            this.blocks[i][j].render2(view)
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
    if(!this.model.player.unit.dead)
    {
      //collisions etc.
      var r = Math.ceil(this.model.player.los()+1);
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