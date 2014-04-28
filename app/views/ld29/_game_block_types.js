var GameBlockTypes = function(){
  this.dirt       = null
  this.dirt_gone  = null
  this.stone      = null
  this.stone_gone = null
  this.coal       = null
  this.iron       = null

  this.portal     = null
  this.bedrock    = null

  this.space = null

  this.init = function()
  {
    this.dirt = new GameBlockType(function(type){
      type.name          = 'dirt'
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
      type.name   = 'dirt_gone'
      type.solid  = false
      type.sprite = 5
    });


    this.stone = new GameBlockType(function(type){
      type.name          = 'stone'
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
      type.name   = 'stone_gone'
      type.solid  = false
      type.sprite = 7
    });

    this.portal = new GameBlockType(function(type){
      type.name   = 'portal'
      type.solid  = false
      type.sprite = 16
      type.onInit = function(block)
      {
        block.extra.rot = 0
        block.extra.last_item_transfer  = block.model.tick_ts
        block.extra.item_transfer_speed = 100; //ms

        //block.extra.blockDemanded       = block.model.blockTypes.dirt //todo
        //block.extra.blockDemandedQty    = 2
        //block.extra.offerItem           = new GameItem('fuel')
        block.extra.closed_at           = false
      }
      type.onRender = function(block, view)
      {
        //block.rot = 0
        var pX = Math.abs(view.ctrl.model.player.unit.x - block.x)
        var pY = Math.abs(view.ctrl.model.player.unit.y - block.y)

        var d = Math.pow(Math.pow(pX, 2) + Math.pow(pY, 2),0.5)
        if(d < 30)
        {
          var multi = 1
          if(d<2) 
          {
            multi = 0.5
          }

          multi = multi + (Math.pow(d,1.3)/10)

          block.extra.rot = (block.extra.rot+(view.tick_ms/(80*multi))) % (2*Math.PI)

          if(d < 0.5)
          {
            block.model.player.unit.portal_proximity = true 
            block.model.player.unit.last_portal_touched = block
          }
          //Fixed decimals to prevent Moires
          view.ctx.save()
          view.ctx.rotate(block.extra.rot.toFixed(2))
          view.renderSprite(17);
          view.ctx.restore();
        }
      }

      type.onRender2 = function(block, view)
      {
        var pX = Math.abs(view.ctrl.model.player.unit.x - block.x)
        var pY = Math.abs(view.ctrl.model.player.unit.y - block.y)

        var d = Math.pow(Math.pow(pX, 2) + Math.pow(pY, 2),0.5)
        if(d < 1.5)
        {
          view.ctx.transform(1,0,0,1,0,-12)
          view.ctx.globalAlpha = 0.5 + 0.5*(Math.sin(view.tick_ts/600*Math.PI*0.5))
          view.renderIcon(block.extra.offerItem.icon,1);
          view.ctx.globalAlpha = 1
          view.ctx.transform(1,0,0,1,0, 12)
        }

      }
      type.onTouch = function(block, ms)
      {
        if(block.model.keys.map.space || block.model.keys.map.e)
        {
          var t = block.model.tick_ts
          //t-block.extra.item_transfer_speed - block.extra.last_item_transfer)+"");
          if(t-block.extra.item_transfer_speed > block.extra.last_item_transfer)
          {
            block.extra.last_item_transfer = t
            block.model.player.stockpile.storeIntoPortal(block);
            //block.model.player.stockpile.items[0][1]++;
          }
        }

        if(block.model.keys.map.enter || block.model.keys.map.q)
        {
          block.model.player.stockpile.purchaseFromPortal(block);
        }
      }
    });



    this.bedrock = new GameBlockType(function(type){
      type.name   = 'bedrock'
      type.solid  = true
      type.sprite = 18
      type.maxHP  = 1000000
      type.regen  = 1000000
      type.onKill = function(block)
      {
        // not sure how you killed it, but here it is again :)
        block.blockType = block.model.blockTypes.bedrock
        block.init()
      }
    });

    this.iron = new GameBlockType(function(type)
    {
      type.name           = 'iron'
      type.solid          = true
      type.sprite         = 19
      type.maxHP          = 500
      type.linearDepthHP  = 3
      type.regen          = 20
      type.onKill = function(block)
      {
        block.model.player.inventory.add(new GameItem('iron'))
        block.blockType = block.model.blockTypes.stone_gone
        block.init()
      }
    });

    this.coal = new GameBlockType(function(type)
    {
      type.name           = 'iron'
      type.solid          = true
      type.sprite         = 20
      type.maxHP          = 400
      type.linearDepthHP  = 3
      type.regen          = 10
      type.onKill = function(block)
      {
        block.model.player.inventory.add(new GameItem('coal'))
        block.blockType = block.model.blockTypes.stone_gone
        block.init()
      }
    });


    this.space = this.bedrock
  }

  this.init()
}
