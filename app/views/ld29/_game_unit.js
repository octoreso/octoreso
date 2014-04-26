var GameUnit = function(model)
{
  this.model = model
  this.x = 0
  this.y = 0

  this.speed = 1 //tiles/sec

  this.velocityX = 0
  this.velocityY = 0
  this.collideX = false
  this.collideY = false
  // boolean tolerance for surfaces to prevent "wobbling"
  this.onFloor = false

  this.accelX = 0.085
  this.accelY = 0.1
  this.decayH = 0.93
  this.decayV = 0.95
  this.gravityAccel = 0.085

  this.collisionAtom = 0.01

  //above this speed we assume you crashed :)
  this.miningVelocityLimit = 0.05
  this.downMiningDamage = 10
  this.sideMiningDamage = 40

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
    view.renderSprite(this.sprite)
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
  this.step = function(ms)
  {
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