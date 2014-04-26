var GameInventory =function(model){
  this.model = model 
  this.items = [] 
  this.space = 0

  this.UI_SCALE = 2
  this.UI_ICON_SIZE = this.UI_SCALE * ICON_SIZE
  this.UI_PADDING = 1

  this.dirt = null

  this.init = function()
  {
    this.space = 25

  }

  this.add = function(gameItem)
  {
    for(var i=0;i<this.space; i++)
    {
      if(!this.items[i])
      {
        this.items[i] = gameItem
        break;
      }
    }
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

    var tX = ((i-7)*(this.UI_ICON_SIZE+this.UI_PADDING))+ view.WIDTH
    var tY = ((j+2.5)*(this.UI_ICON_SIZE+this.UI_PADDING))

    view.ctx.transform(1, 0, 0, 1, 
      tX, 
      tY
    )
    view.renderCustom('inventory', this.UI_SCALE);
    view.ctx.transform(1, 0, 0, 1, 
      -tX, 
      -tY
    )

    for(i=0;i<5;i++)
    {
      for(j=1;j<=Math.ceil(this.space/5);j++)
      {
        tX = ((i-7)*(this.UI_ICON_SIZE+this.UI_PADDING))+ view.WIDTH
        tY = ((j+3)*(this.UI_ICON_SIZE+this.UI_PADDING))
        

        view.ctx.transform(1, 0, 0, 1, 
          tX, 
          tY
        )
        this.render_inventory_slot(view, i, j)
        view.ctx.transform(1, 0, 0, 1, 
          -tX, 
          -tY
        )
      }
    }
    this.render_pop(view)
  }  

  this.render_inventory_slot=function(view, i,j)
  {
    //todo: items wot u got
    item = i+(j-1)*5
    if(this.space > item)
    {
      if(this.items[item])
      {
        view.renderIcon(this.items[item].icon, this.UI_SCALE)
      } else
      {
        view.renderIcon(0, this.UI_SCALE);
      }
      
    } 
  }

  this.render_push = function(view)
  {
    
  }
  this.render_pop = function(view)
  {
  } 

  this.init();
}