var GameBlockTypes = function(){
  this.dirt = null
  this.dirt_gone = null
  this.space = null

  this.init = function()
  {
    this.dirt = new GameBlockType(function(type){
      type.solid         = true 
      type.sprite        = 4
      type.maxHP         = 100
      type.regen         = 10
      type.linearDepthHP = 1
      type.onKill = function(block)
      {
        block.model.player.inventory.add(new GameItem('dirt'))
        block.blockType = block.model.blockTypes.dirt_gone
        block.init()
      }
    });
    this.dirt_gone = new GameBlockType(function(type){
      type.solid  = false
      type.sprite = 5
    });

    this.stone = new GameBlockType(function(type){
      type.solid         = true 
      type.sprite        = 6
      type.maxHP         = 300
      type.regen         = 15
      type.linearDepthHP = 3
      type.onKill = function(block)
      {
        block.model.player.inventory.add(new GameItem('stone'))
        block.blockType = block.model.blockTypes.stone_gone
        block.init()
      }
    });
    this.stone_gone = new GameBlockType(function(type){
      type.solid  = false
      type.sprite = 7
    });

    this.space = this.dirt_gone
  }

  this.init()
}
