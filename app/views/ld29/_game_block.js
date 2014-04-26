var GameBlock = function(model, x, y, blockType)
{
  this.model      = model
  this.x          = x
  this.y          = y
  this.blockType  = blockType
  this.HP         = 1
  this.maxHP      = 1
  this.regen      = 1

  this.dead       = false 

  //called every time the block changes type or otherwise resets
  this.init = function()
  {
    this.HP = this.blockType.maxHP + this.blockType.linearDepthHP*y
    this.maxHP = this.blockType.maxHP
    this.regen = this.blockType.regen
  }
  this.render = function(view)
  {
    this.render_push(view)
    view.renderSprite(this.blockType.sprite)
    if(this.HP != this.maxHP)
    {
      view.renderSprite(Math.floor(Sprite.Offset.DAMAGE + 8*((this.maxHP-this.HP)/this.maxHP)));
    }
    if(this.HP<=0 && !this.dead)
    {
      this.kill();
    }
    this.render_pop(view)

  }  
  this.render_push = function(view)
  {
    view.ctx.transform(1, 0, 0, 1, x*TILE_SIZE, y*TILE_SIZE)
  }
  this.render_pop = function(view)
  {
    view.ctx.transform(1, 0, 0, 1, -x*TILE_SIZE, -y*TILE_SIZE)
  } 
  this.damage = function(unit, velocity, dir)
  {
    if(!this.dead)
    {  
      if(dir == Direction.DOWN)
      {
        this.HP = this.HP - unit.downMiningDamage
      } else
      {
        this.HP = this.HP - unit.sideMiningDamage
      }
    }
  },
  this.kill=function()
  {
    this.dead = true
    //do some stuff
    //call type specific callback
    this.blockType.onKill(this, model);
  }
  this.step = function(ms)
  {
    //get player position.
    if(
      Math.abs(this.model.player.unit.x - x) <= 0.5 &&
      Math.abs(this.model.player.unit.y - y) <= 0.5
    )
    {
      //todo: "consume" blocks that are unconsumed.
      //this.blockType = this.model.blockTypes.dirt_gone
    }
     
    this.HP = Math.min(this.HP + (this.regen*ms/1000), this.maxHP)

  }  
  this.init(); 
}