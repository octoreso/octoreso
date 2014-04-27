var GameBlock = function(model, x, y, blockType)
{
  this.model      = model
  this.x          = x
  this.y          = y
  this.blockType  = blockType
  this.HP         = 1
  this.maxHP      = 1
  this.regen      = 1

  this.extra = {}

  this.dead       = false 

  //called every time the block changes type or otherwise resets
  this.init = function()
  {
    this.HP = this.blockType.maxHP + this.blockType.linearDepthHP*y
    this.maxHP = this.blockType.maxHP
    this.regen = this.blockType.regen

    this.blockType.onInit(this)
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
    this.blockType.onRender(this, view);
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
    this.blockType.onKill(this);
  }
  this.step = function(ms)
  {
    //get player position.
    var pX = Math.abs(this.model.player.unit.x - this.x)
    var pY = Math.abs(this.model.player.unit.y - this.y)
    var d = Math.pow(Math.pow(pX, 2) + Math.pow(pY, 2),0.5)

    if(d<0.5)
    {
      this.onTouch(ms);
    }
    if(!this.dead)
    {
      this.HP = Math.min(this.HP + (this.regen*ms/1000), this.maxHP)
    }

    this.blockType.onStep(this, ms)
  }  
  this.onTouch=function(ms)
  {
    this.blockType.onTouch(this, ms)
  }
  this.init(); 
}