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

    for(i=0;i<this.items.length;i++)
    {
      tY = tY + (this.UI_ICON_SIZE+this.UI_PADDING)
      
      view.ctx.transform(1, 0, 0, 1, tX, tY)
      this.render_stockpile_slot(view, i)
      view.ctx.transform(1, 0, 0, 1, -tX, -tY)
    }

    this.render_pop(view)
  }
  this.render_stockpile_slot=function(view, i)
  {
    view.renderIcon(this.items[i][0].icon, this.UI_SCALE)

    view.ctx.transform(1, 0, 0, 1, 1*this.UI_ICON_SIZE, -0.5*this.UI_ICON_SIZE)
    view.renderFont(this.items[i].icon, this.UI_SCALE)
    
    //x0000
    view.ctx.transform(1, 0, 0, 1, 1*this.UI_ICON_SIZE, 0)
    view.renderFont(''+Math.floor((this.items[i][1] % 100000) / 10000),  this.UI_SCALE)

    //0x000
    view.ctx.transform(1, 0, 0, 1, 0.5*this.UI_ICON_SIZE, 0)
    view.renderFont(''+Math.floor((this.items[i][1] % 10000) / 1000),   this.UI_SCALE)

    //00x00
    view.ctx.transform(1, 0, 0, 1, 0.5*this.UI_ICON_SIZE, 0)
    view.renderFont(''+Math.floor((this.items[i][1] % 1000) / 100),     this.UI_SCALE)

    //000x0
    view.ctx.transform(1, 0, 0, 1, 0.5*this.UI_ICON_SIZE, 0)
    view.renderFont(''+Math.floor((this.items[i][1] % 100) / 10),       this.UI_SCALE)

    //0000x
    view.ctx.transform(1, 0, 0, 1, 0.5*this.UI_ICON_SIZE, 0)
    view.renderFont(''+Math.floor((this.items[i][1] % 10)),             this.UI_SCALE)

    view.ctx.transform(1, 0, 0, 1, -4*this.UI_ICON_SIZE, 0.5*this.UI_ICON_SIZE)
    //todo: items wot u got
    // item = i+(j-1)*5
    // if(this.space > item)
    // {
    //   if(this.items[item])
    //   {
    //     view.renderIcon(this.items[item].icon, this.UI_SCALE)
    //   } else
    //   {
    //     view.renderIcon(0, this.UI_SCALE);
    //   }
    // } 
  }

  this.render_push = function(view)
  {
    
  }
  this.render_pop = function(view)
  {
  } 
    
  this.init();
}