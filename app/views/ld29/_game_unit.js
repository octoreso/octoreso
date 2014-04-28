var GameUnit = function(model)
{
  this.model   = model
  this.HP      = 100
  this.maxHP   = this.HP
  this.fuel    = 120//300 //seconds
  this.maxFuel = this.fuel 

  this.dead = false
  this.died_at = -1;
  this.damaged_at = -1;
  this.death_length = 9000;

  this.x = 0
  this.y = 0

  this.speed = 1 //tiles/sec
  this.velocityPainThreshold = 0.1 //beyond this dmg is dealt
  this.fallDamageMultiplier = 120 //lower is better

  this.velocityX = 0
  this.velocityY = 0
  this.collideX = false
  this.collideY = false
  // boolean tolerance for surfaces to prevent "wobbling"
  this.onFloor = false

  this.accelX = 0.095
  this.accelY = 0.11
  this.decayH = 0.93
  this.decayV = 0.95
  this.gravityAccel = 0.085

  this.collisionAtom = 0.01

  //above this speed we assume you crashed :)
  this.miningVelocityLimit = 0.05
  this.downMiningDamage = 10
  this.sideMiningDamage = 40

  this.portal_proximity     = false //for display sprite  
  this.last_portal_touched  = null //for logic  

  this.moving = false
  this.last_direction = Direction.RIGHT
  this.directions = []
  this.sprite = 0 
  
  this.init = function()
  {

  }
  this.render = function(view)
  {
    this.render_push(view)
    
    var spriteOffset = 0;
    if(this.portal_proximity)
    {
      spriteOffset = Sprite.Offset.PORTAL_PROXIMITY
    } 
    view.renderSprite(this.sprite + spriteOffset)
    this.render_pop(view)
  }  
  this.render_push = function(view)
  {
  }
  this.render_pop = function(view)
  {
  } 
  this.velocity = function()
  {
    v = Math.pow(Math.pow(this.velocityX,2) + Math.pow(this.velocityY, 2),0.5);
    return v
  }
  this.velocityAngle = function()
  {
    theta = Math.atan2(this.velocityX, this.velocityY);
    if(isNaN(theta)) { theta = 0 }
    return theta;
  }

  this.depleteFuel = function(ms)
  {
    this.fuel = this.fuel - (ms/1000)
    if(this.fuel < 0)
    {
      this.kill();
    }
  }

  this.step = function(ms)
  {
    this.depleteFuel(ms)

    if(this.moving)
    {
      for(var d=0;d<this.directions.length;d++)
      {
        this.last_direction = this.directions[d]
        switch(this.directions[d])
        {
          case Direction.RIGHT:
            if(!this.collideX)
            {
              this.velocityX = this.velocityX + ((this.accelX * ms) / 1000)
            }
          break;
          case Direction.LEFT:
            if(!this.collideX)
            {
              this.velocityX = this.velocityX - ((this.accelX * ms) / 1000)
            }
          break;
          case Direction.UP:
            if(!this.collideY)
            {
              this.velocityY = this.velocityY - ((this.accelY * ms) / 1000)
            }
          break;
          case Direction.DOWN:
            if(!this.collideY)
            {
              this.velocityY = this.velocityY + ((this.accelY * ms) / 1000)
            }
          break;
        }
      }
    }

    var vMultiX = (this.decayH * ms / 1000)
    var vMultiY = (this.decayV * ms / 1000)

    this.velocityX = this.velocityX * (1-vMultiX)
    if(this.collideX) {
      //this.x = this.x - this.velocityX
    } else {
      this.x = this.x + (this.velocityX * 0.5)
    }


    this.velocityY = this.velocityY * (1-vMultiY)
    
    if(this.collideY)
    {
      this.y = this.y - (this.velocityY * 0.5)
    }
    else{
      this.y = this.y + this.velocityY 
      if(!this.onFloor)
      {
        this.velocityY = this.velocityY + (this.gravityAccel * ms / 1000)
      }
    }

    this.sprite = Sprite.Offset.PLAYER + this.last_direction

    //cleanup for next iteration
    this.collideX = false
    this.collideY = false
    this.onFloor = false 
  }  

  this.onSurface = function()
  {
    this.onFloor = true
  }

  this.fallDamage=function(velocity)
  {
    
    var amt = Math.floor(velocity*this.fallDamageMultiplier);
    this.damage(amt)
  }

  this.damage = function(amt)
  {
    this.HP = this.HP - amt
    this.damaged_at = this.model.tick_ts
    if(this.HP < 0)
    {
      this.kill();
    }
  }

  this.heal = function()
  {
    this.HP = this.HP + (0.3*this.maxHP)
  }
  this.refuel = function()
  {
    this.fuel = this.fuel + (0.4*this.maxFuel)
  }

  this.improveDrill = function()
  {
    this.downMiningDamage = this.downMiningDamage * 1.3
    this.sideMiningDamage = this.sideMiningDamage * 1.3
  }

  this.improveEngine = function()
  {
    this.accelX = this.accelX * 1.2
    this.accelY = this.accelY * 1.2
    this.miningVelocityLimit = this.miningVelocityLimit * 1.2
    this.velocityPainThreshold = this.velocityPainThreshold * 1.2
  }
  this.improveCargo = function()
  {
    this.model.player.inventory.space = this.model.player.inventory.space + 5

  }

  this.hax=function()
  {
    for(var i =0;i< 5; i++)
    {
      this.improveEngine();
      this.improveDrill();
      this.improveFuelTank();
      this.improveCargo();
    }

    this.model.player.los_radius = 20
  }

  this.improveLOS = function()
  {
    this.model.player.los_radius = this.model.player.los_radius + 2
  }

  this.improveFuelTank = function()
  {
    this.maxFuel = this.maxFuel * 1.4 
    this.fuel    = this.fuel * 1.4 
  }


  this.kill = function()
  {
    this.dead     = true
    this.died_at  = this.model.tick_ts
    this.HP = 0 //for display purposes if C.O.D is unnatural
    this.velocityX = 0
    this.velocityY = 0
    this.gravityAccel = 0.03
  }
 
  this.collide = function(ms, collideX, collideY, blockX, blockY)
  {
    if(collideY!=0)
    {
      this.collideY = true
      //falling down
     
      if(collideY==1 && this.velocityY < this.miningVelocityLimit && this.directions[0] == Direction.DOWN)
      {
        this.model.world.blocks[blockX][blockY].damage(this, ms, Direction.DOWN)//, this.velocityY)
      }

      if(Math.abs(this.velocityY)>this.velocityPainThreshold)
      {
        this.fallDamage(Math.abs(this.velocityY));
      }
      // Cannot dig up
      this.velocityY = 0

      this.y = this.y + (this.collisionAtom*-collideY)
    }

    if(collideX!=0)
    {
      this.collideX = true
      //wallage
      if(this.onFloor) {
        if(this.velocityX < this.miningVelocityLimit && this.directions[0] == Direction.LEFT)
        {
          this.model.world.blocks[blockX][blockY].damage(this, ms, Direction.LEFT)//, this.velocityX)
        }
        if(this.velocityX < this.miningVelocityLimit && this.directions[0] == Direction.RIGHT)
        {
          this.model.world.blocks[blockX][blockY].damage(this, ms, Direction.RIGHT) //this.velocityX)
        }
      }

      this.velocityX = 0
      this.x = this.x + (this.collisionAtom*3*-collideX)
    }
  }

  this.init();

}