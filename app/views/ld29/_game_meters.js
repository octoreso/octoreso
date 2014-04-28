var GameMeters = function(player){
  this.player = null
  this.INDENT = 4

  this.init = function()
  {
    this.player = player
  }

  this.render_push = function(view)
  {
    view.ctx.transform(1,0,0,1,8,view.HEIGHT - 54)
  }
  this.render_pop = function(view)
  {
    view.ctx.transform(1,0,0,1,-8,-(view.HEIGHT - 54))
  }

  this.render = function(view)
  {
    this.render_push(view);
    
    view.ctx.transform(1,0,0,1,this.INDENT,this.INDENT)
    this.renderHealth(view);
    view.ctx.transform(1,0,0,1,150, 0)
    this.renderOffer(view);
    view.ctx.transform(1,0,0,1,500, 0)
    this.renderTime(view);
    view.ctx.transform(1,0,0,1,-this.INDENT-650,-(0+this.INDENT))

    this.render_pop(view);
  } 

  this.renderHealth=function(view)
  {
    numPips = Math.ceil(view.ctrl.model.player.unit.HP/view.ctrl.model.player.unit.maxHP*10)
    if(numPips < 0)
    {
      numPips = 0;
    }
    if(numPips > 10)
    {
      numPips = 10
    }

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

  this.renderOffer=function(view)
  {
    view.ctx.save();
    
    if(view.ctrl.model.player.unit.portal_proximity)
    {
      view.ctx.transform(1,0,0,1,40,0)
      view.ctx.fillStyle = 'rgba(0,0,0,0.5)'
      view.ctx.fillRect(0,0,365,18);
      view.ctx.fillRect(0,20,365,18);
      view.ctx.transform(1,0,0,1,8,2)

      //render the offer
      var portal = view.ctrl.model.player.unit.last_portal_touched
      view.renderString("Press E to stockpile resources" ,2)
      view.ctx.transform(1,0,0,1,0,20)
      view.renderString("Press Q to trade    X"+portal.extra.blockDemandedQty+" for "+portal.extra.offerItem.name ,2)
      view.ctx.transform(1,0,0,1,150,8)
      view.renderIcon(new GameItem(portal.extra.blockDemanded.name).icon,2)
    } 

    view.ctx.restore();
  }

  this.renderTime=function(view)
  {
    numPips = Math.ceil(view.ctrl.model.player.unit.fuel/view.ctrl.model.player.unit.maxFuel*10)
    if(numPips < 0)
    {
      numPips = 0;
    }
    if(numPips > 10)
    {
      numPips = 10
    }

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