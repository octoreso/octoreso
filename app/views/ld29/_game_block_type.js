var GameBlockType = function(initCode)
{
  this.name = "none"
  this.solid  = false
  this.sprite = null
  this.maxHP = 1
  this.regen = 0
  this.linearDepthHP = 0
  
  this.onKill = function(block){}
  this.onRender = function(block, view){}
  this.onStep = function(block, ms){}
  this.onTouch = function(block, ms){}
  this.onInit = function(block){}
  this.init = function(initCode)
  {
    initCode(this);
  }

  this.init(initCode)
}