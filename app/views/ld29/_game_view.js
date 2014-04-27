var GameView = function(ctrl){
  this.ctrl = ctrl
  this.idle  = true
  
  this.WIDTH = 800
  this.HEIGHT = 600 
  this.UI_FPS = 60
  /**
   * Specific bare-canvas stuff
   */
  this.canvas = null
  this.ctx = null
  this.tickTimer = null
  this.tick_ts = new Date().getTime()
  this.tick_ms = 0
  this.sprites = null
  this.characterMap = null
  this.zoom = 2
  this.lighting = null

  this.init = function()
  {
    $('.game-area').append('<canvas />');
    this.canvas = $('.game-area canvas')[0]
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
    this.canvas.fillStyle = '#000';
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.sprites = new Image();
    this.sprites.src = "/ld29/sprites.png";
    this.characterMap = new GameCharacterMap()

    ///context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    this.renderWorld_reset()
  }
  this.renderSprite = function(id)
  {
    var cellX = id % 8
    var cellY = Math.floor(id / 8)
    ///context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    this.ctx.drawImage(
      this.sprites, 
      cellX * TILE_SIZE,
      cellY * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
      -TILE_SIZE * 0.5,
      -TILE_SIZE * 0.5,
      TILE_SIZE,
      TILE_SIZE 
    )
  }

  this.renderIcon = function(id, scale)
  {
    if(!scale) { scale = 1 }
    ///context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    this.ctx.drawImage(
      this.sprites, 
      8 * TILE_SIZE,
      id * ICON_SIZE,
      ICON_SIZE,
      ICON_SIZE,
      -ICON_SIZE * 0.5 * scale,
      -ICON_SIZE * 0.5 * scale,
      ICON_SIZE * scale,
      ICON_SIZE * scale 
    )
  }

  this.renderCustom=function(name,scale)
  {
    if(!scale) { scale = 1 }
    var w = 0;
    var h = 0;
    var x = 0;
    var y = 0;

    switch(name)
    {
      case 'inventory':
        x = 264
        y = 0
        w = 40
        h = 8
      break;
      case 'stockpile':
        x = 264
        y = 8
        w = 40
        h = 8
      break;
      case 'full':
        x = 265
        y = 16
        w = 17
        h = 7
      break;
    }

    this.ctx.drawImage(
      this.sprites, 
      x,
      y,
      w,
      h,
      0,
      0,
      w * scale,
      h * scale 
    )
  }

  this.renderString = function(chars, scale)
  {
    chars = chars.toUpperCase()
    var x = 0; //x offset
    for(var i =0; i < chars.length; i++)
    { 
      var character = chars[i];
      
      var dX = this.renderChar(character, scale)
      this.ctx.transform(1,0,0,1,dX*scale,0)
      x = x + dX
    }
    this.ctx.transform(1,0,0,1,-x*scale,0)
  }

  this.renderChar = function(name,scale)
  {
    var c = this.characterMap.getChar(name, scale)

    this.ctx.drawImage(
      this.sprites, 
      c.x + (c.dX * c.oW),
      c.y + (c.dY * c.h),
      c.w,
      c.h,
      0,
      0,
      c.w * scale,
      c.h * scale 
    )
    // for creating strings
    return c.w
  }

  this.start = function()
  {
    // SET UP UI TICKS
    this.tickTimer = window.setInterval(this.tick,(1000/this.UI_FPS), this);
  }

  this.stop = function()
  {
    // SET UP UI TICKS
    window.clearInterval(this.tickTimer);
  }

  this.clean = function()
  {
    //clear the screen
    this.ctx.fillStyle="#111111";  
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    //set more defaults
  }


  this.renderWorld_push = function()
  {
    this.ctx.transform(this.zoom, 0, 0, this.zoom, this.WIDTH/2, this.HEIGHT/2)
  }
  this.renderWorld_reset = function()
  {
    // global reset
    this.ctx.setTransform(1,0,0,1,0,0)

  } 
  this.render = function()
  { 

    switch(this.ctrl.state)
    {
      case GameState.PLAYING:
        this.renderWorld_push();
        this.ctrl.model.world.render(this);
        this.ctrl.model.player.render(this);
        this.renderWorld_reset();

        // UI STUFF
        this.render_lighting()
        this.ctrl.model.player.inventory.render(this)
        this.ctrl.model.player.stockpile.render(this)
      break;
      case GameState.MENU:
      
        //if(this.ctrl.model.menu.subState == GameMenuState.MAIN)
        //{
          //Experimental
          this.ctx.globalAlpha = 0.2
          this.renderWorld_push();
          this.ctrl.model.world.render(this);
          this.renderWorld_reset();
          this.ctx.globalAlpha = 1
          this.render_lighting()
        //}

        this.ctrl.model.menu.render(this)
        
      break;

    }

    if(DEBUG_FPS) {
      this.render_fps();
    }
  }

  this.render_fps = function()
  {
    this.ctx.fillStyle = 'rgba(255,0,0,1)'
    this.ctx.textAlign = 'center'
    var text = "FPS: M:"+
        Math.floor(1000/this.ctrl.model.tick_ms)+
        " V:"+
        Math.floor(1000/this.tick_ms)
    this.ctx.fillText(
      text, 
      this.WIDTH/2, 
      this.HEIGHT-25
    );
  }

  this.render_lighting = function()
  {
    //light it up.
    this.lighting = this.ctx.createRadialGradient(
      this.WIDTH/2, 
      this.HEIGHT/2, 
      10, 
      this.WIDTH/2, 
      this.HEIGHT/2, 
      ((ctrl.model.player.los() - 3)*TILE_SIZE*this.zoom)+3*Math.sin(new Date().getTime()/20)+2*Math.random()-1)
    //this.lighting.addColorStop(0, 'rgba(0,255,0,1)')
    this.lighting.addColorStop(0.01, 'rgba(0,0,0,0)')
    this.lighting.addColorStop(1, 'rgba(0,0,0,1)')


    this.ctx.fillStyle=this.lighting;  
    this.ctx.fillRect(0, 0, this.WIDTH, this.WIDTH);
  }

  this.tick = function (scrn)
  {
    this.idle = false
    //console.log("UI "+scrn.tickTimer)
    scrn.clean();
    scrn.render();
    var new_ts = new Date().getTime()
    scrn.tick_ms = (new_ts - scrn.tick_ts)
    scrn.tick_ts = new_ts
    this.idle = true
  }

  this.init();
};