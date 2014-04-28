var GameStockpile =function(model){
  this.model = model 
  this.items = []

  this.UI_SCALE = 2
  this.UI_ICON_SIZE = this.UI_SCALE * ICON_SIZE
  this.UI_PADDING = 1
  this.init = function()
  {
    // init to zero?
    this.items.push([new GameItem('dirt') , 0])
    this.items.push([new GameItem('stone'), 0])
    this.items.push([new GameItem('iron'), 0])
    this.items.push([new GameItem('coal'), 0])
    this.items.push([new GameItem('ruby'), 0])
  }

  this.step = function(ms)
  {

  }
  this.render = function(view)
  {
    this.render_push(view)
    // draw ui    
    var i = 0
    var j = 0

    var tX = ((i+2)*(this.UI_ICON_SIZE+this.UI_PADDING))
    var tY = ((j+2.5)*(this.UI_ICON_SIZE+this.UI_PADDING))

    view.ctx.transform(1, 0, 0, 1, 
      tX, 
      tY
    )

    view.renderCustom('stockpile', this.UI_SCALE);
    view.ctx.transform(1, 0, 0, 1, 
      -tX, 
      -tY
    )

    tY = tY + 0.5 * (this.UI_ICON_SIZE+this.UI_PADDING)

    menuSlot = 0
    for(i=0;i<this.items.length;i++)
    {
      if(this.items[i][1] > 0)
      {
        menuSlot++;
        tY = tY + (this.UI_ICON_SIZE+this.UI_PADDING)
        view.ctx.transform(1, 0, 0, 1, tX, tY)
        this.render_stockpile_slot(view, i)
        view.ctx.transform(1, 0, 0, 1, -tX, -tY)
      }
      
    }

    this.render_pop(view)
  }
  this.render_stockpile_slot=function(view, i)
  {
    view.renderIcon(this.items[i][0].icon, this.UI_SCALE)

    view.ctx.transform(1, 0, 0, 1, 1*this.UI_ICON_SIZE, -0.5*this.UI_ICON_SIZE)
    view.renderChar('X', this.UI_SCALE)

    
    //x0000
    view.ctx.transform(1, 0, 0, 1, 1*this.UI_ICON_SIZE, 0)
    view.renderChar(''+Math.floor((this.items[i][1] % 100000) / 10000),  this.UI_SCALE)

    //0x000
    view.ctx.transform(1, 0, 0, 1, 0.5*this.UI_ICON_SIZE, 0)
    view.renderChar(''+Math.floor((this.items[i][1] % 10000) / 1000),   this.UI_SCALE)

    //00x00
    view.ctx.transform(1, 0, 0, 1, 0.5*this.UI_ICON_SIZE, 0)
    view.renderChar(''+Math.floor((this.items[i][1] % 1000) / 100),     this.UI_SCALE)

    //000x0
    view.ctx.transform(1, 0, 0, 1, 0.5*this.UI_ICON_SIZE, 0)
    view.renderChar(''+Math.floor((this.items[i][1] % 100) / 10),       this.UI_SCALE)

    //0000x
    view.ctx.transform(1, 0, 0, 1, 0.5*this.UI_ICON_SIZE, 0)
    view.renderChar(''+Math.floor((this.items[i][1] % 10)),             this.UI_SCALE)

    view.ctx.transform(1, 0, 0, 1, -4*this.UI_ICON_SIZE, 0.5*this.UI_ICON_SIZE)
  }

  this.render_push = function(view)
  {
    
  }
  this.render_pop = function(view)
  {
  } 

  this.purchaseFromPortal = function(portal)
  {
    //TODO
    for(var i =0;i<this.items.length;i++)
    {
      if(this.items[i][0].name == portal.extra.blockDemanded.name && portal.extra.blockDemandedQty <=  this.items[i][1])
      {
        this.items[i][1] = this.items[i][1] - portal.extra.blockDemandedQty
        portal.extra.closed_at = portal.model.tick_ts
        portal.extra.offerItem.onGet(this.model.player)

        //TODO: Timeout, BOOM, something cool before replacing block
        portal.blockType = portal.model.blockTypes.dirt_gone
        portal.init()

        break;
      }
    }
  }

  this.storeIntoPortal = function(portal)
  {
    var inv = this.model.player.inventory;
    for(i=inv.items.length;i>=0;i--)
    {
      if(inv.items[i])
      {
        for(var x=0;x< this.items.length;x++)
        {
          if(this.items[x][0].name == inv.items[i].name)
          {
            this.items[x][1]++;
            inv.full = false
            break;
          }
        }
        inv.items.splice(i,1);

        break;
      }
    }
  }
    
  this.init();
}