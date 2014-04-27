var GameMenu = function(model)
{
  this.model      = model
  this.subState   = GameMenuState.MAIN

  this.selectedItem = 0;
  this.menuItems = 3;

  this.TITLE_OFFSET_Y = 20
  this.MAIN_MENU_OFFSET_Y = 140
  this.MAIN_MENU_ITEM_OFFSET_Y = 36

  this.menuActionDelay = 100
  this.lastMenuAction = new Date().getTime();

  this.init = function()
  {
    //this.model.player.los_penalty = 0
  }
  this.render = function(view)
  {
    this.render_push(view)
    this.renderTitle(view)
    this.render_pop(view)
  }  
  this.renderTitle = function(view)
  {
    
    switch(this.subState)
    {
      case GameMenuState.MAIN:
        this.renderStateMain(view)
      break;
      case GameMenuState.HELP:
        this.renderStateHelp(view)
      break;
      case GameMenuState.ABOUT:
        this.renderStateAbout(view)
      break;
    }
  } 
  this.step = function(ms)
  {
    if(this.model.tick_ts - this.menuActionDelay > this.lastMenuAction)
    {
      if(this.model.keys.map.up_arrow || this.model.keys.map.w)
      {
        this.lastMenuAction = this.model.tick_ts
        this.selectedItem--
        if(this.selectedItem < 0)
        {
          this.selectedItem = this.menuItems -1 
        }
      }

      if(this.model.keys.map.down_arrow || this.model.keys.map.s)
      {
        this.lastMenuAction = this.model.tick_ts
        this.selectedItem++
        if(this.selectedItem >= this.menuItems)
        {
          this.selectedItem = 0 
        }
      }

      if(this.model.keys.map.space || this.model.keys.map.enter)
      {
        this.lastMenuAction = this.model.tick_ts + 100 // extra buffer time as user has moved.
        this.performAction(this.selectedItem)

      }
    }


    switch(this.subState)
    {
      case GameMenuState.MAIN:
        this.stepMain(ms)
      break;
    }
  }

  this.renderStateMain=function(view)
  {
    this.renderMenuTitle(view)
    this.renderMenuItem(view, "NEW GAME", 0)
    this.renderMenuItem(view, "HELP", 1)
    this.renderMenuItem(view, "ABOUT", 2)

    view.ctx.transform(1, 0, 0, 1, 0, -this.MAIN_MENU_OFFSET_Y-(3*this.MAIN_MENU_ITEM_OFFSET_Y))
  }

  this.renderStateHelp=function(view)
  {
    this.renderMenuTitle(view)
    

    this.renderMenuString(view,"THE YEAR IS 2556. YOU HAVE BEEN SENT BY THE ")
    this.renderMenuString(view,"FEDERATION TO MINE ASTEROID IXION-518-B.") 
    this.renderMenuString(view,"AFTER THE SPACE JUNK ACCIDENTS OF 2545, ") 
    this.renderMenuString(view,"IT WAS DECREED THAT RESOURCE HARVESTING THROUGH") 
    this.renderMenuString(view,"ASTEROID CRACKING IS ILLEGAL. INSTEAD, THE") 
    this.renderMenuString(view,"FEDERATION HARVESTS RESOURCES SUSTAINABLY") 
    this.renderMenuString(view,"USING QUANTUM TUNNELS TO INFILTRATE THE") 
    this.renderMenuString(view,"INTERNALS AND EXTRACT GOODS.")
    this.renderMenuString(view," ")


    this.renderMenuItem(view, "BACK", 0) 

    view.ctx.transform(1, 0, 0, 1, 0, -this.MAIN_MENU_OFFSET_Y)
  }

  this.renderStateAbout=function(view)
  {
    this.renderMenuTitle(view)
    this.renderMenuString(view,"DEVELOPED BY TOBYPINDER FOR LUDUM DARE 29") 
    this.renderMenuString(view,"THEME    BENEATH THE SURFACE") 
    this.renderMenuString(view,"") 
    this.renderMenuItem(view,"BACK",0) 

    view.ctx.transform(1, 0, 0, 1, 0, -this.MAIN_MENU_OFFSET_Y)
  }

  this.renderMenuTitle = function(view)
  {
    view.ctx.transform(1, 0, 0, 1, 0, this.TITLE_OFFSET_Y)
    view.renderString("    <NAME OF GAME>", 8)
    view.ctx.transform(1, 0, 0, 1, 0, this.MAIN_MENU_OFFSET_Y)
  }

  this.renderMenuString = function(view, str)
  {
    view.ctx.transform(1, 0, 0, 1, 0, this.MAIN_MENU_ITEM_OFFSET_Y)
    view.renderString(str, 4)
  }

  this.renderMenuItem = function(view, str, idx)
  {
    view.ctx.transform(1, 0, 0, 1, 0, this.MAIN_MENU_ITEM_OFFSET_Y)
    this.menuItem(view, idx, str, 4)
  }

  this.menuItem = function(view, idx, str, scale)
  {
    if(idx == this.selectedItem)
    {
      str = ">"+str
    }else 
    {
      str = " "+str
    }
    view.renderString(str, scale)
  }

  this.stepMain = function(ms)
  { 
  }

  this.performAction =function(idx)
  {
    switch(this.subState)
    {
      case GameMenuState.MAIN:
        switch(idx)
        {
          case 0:
          this.model.stateTransition(GameState.PLAYING)
          break;
          case 1:
          this.menuStateTransition(GameMenuState.HELP)
          break;
          case 2:
          this.menuStateTransition(GameMenuState.ABOUT)
          break;
        }
      break;

      case GameMenuState.HELP:
      case GameMenuState.ABOUT:
        this.menuStateTransition(GameMenuState.MAIN)
      break;
    }
  }

  this.menuStateTransition=function(state)
  {
    console.log("Tx to state "+state)
    this.subState = state
    switch(state)
    {
      case GameMenuState.MAIN:
      this.menuItems = 3
      break;
      default:
      this.menuItems = 1 
      break;
    }
    this.selectedItem = 0 
  }

  this.render_push = function(view)
  {
    
  }
  this.render_pop = function(view)
  {
  } 

  this.init();

}