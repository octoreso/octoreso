var GameMeters = function(player){
  this.player = null
  this.INDENT = 4


  this.init = function()
  {
    this.player = player
  }

  this.render_push = function(view)
  {
    view.ctx.transform(1,0,0,1,8,view.HEIGHT - 34)
  }
  this.render_pop = function(view)
  {
    view.ctx.transform(1,0,0,1,-8,-(view.HEIGHT - 34))
  }

  this.render = function(view)
  {
    this.render_push(view);
    
    view.ctx.transform(1,0,0,1,this.INDENT,this.INDENT)
    this.renderHealth(view)
    view.ctx.transform(1,0,0,1,650,0)
    this.renderTime(view)
    view.ctx.transform(1,0,0,1,-this.INDENT-650,-(20+this.INDENT))

    this.render_pop(view);
  } 

  this.renderHealth=function(view)
  {
    numPips = Math.ceil(view.ctrl.model.player.unit.HP/view.ctrl.model.player.unit.maxHP*10)


    view.renderCustom('icon_health',2);
    view.ctx.transform(1,0,0,1,10,0)
    for(var i =0; i<numPips;i++)
    {
      view.ctx.transform(1,0,0,1,10,0)
      view.renderCustom('pip_health',2);
    }
    for(var i =0; i<(10-numPips);i++)
    {
      view.ctx.transform(1,0,0,1,10,0)
      view.renderCustom('pip_no_health',2);
    }
    view.ctx.transform(1,0,0,1,-110,0) 
  }

  this.renderTime=function(view)
  {
    numPips = 5 

    view.renderCustom('icon_time',2);
    view.ctx.transform(1,0,0,1,10,0)
    for(var i =0; i<numPips;i++)
    {
      view.ctx.transform(1,0,0,1,10,0)
      view.renderCustom('pip_time',2);
    }
    for(var i =0; i<(10-numPips);i++)
    {
      view.ctx.transform(1,0,0,1,10,0)
      view.renderCustom('pip_no_time',2);
    }
    view.ctx.transform(1,0,0,1,-110,0) 
  }


  this.init();
}