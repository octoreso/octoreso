var GameView = function(ctrl){
  this.ctrl = ctrl

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

    ///context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    this.render_reset()
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

  this.renderFont = function(name,scale)
  {
    var w = 4;
    var h = 8;
    var x = 304;
    var y = 0;

    var dx = 0;
    var dy = 0;

    switch(name)
    {
      case 'x':
      break;

      // Case fallthrough :D
      case '9':
        dx = 4;
        dy = 2;
        break;
      case '8':
        dx = 3;
        dy = 2;
        break;
      case '7':
        dx = 2;
        dy = 2;
        break;
      case '6':
        dx = 1;
        dy = 2;
        break;
      case '5':
        dx = 0;
        dy = 2;
        break;
      case '4':
        dx = 4;
        dy = 1;
        break;
      case '3':
        dx = 3;
        dy = 1;
        break;
      case '2':
        dx = 2;
        dy = 1;
        break;
      case '1':
        dx = 1;
        dy = 1;
        break;
      case '0':
        dx = 0;
        dy = 1;
        break;
      break;
    }

    this.ctx.drawImage(
      this.sprites, 
      x + (dx * w),
      y + (dy * h),
      w,
      h,
      0,
      0,
      w * scale,
      h * scale 
    )
  }

  this.start = function()
  {
    // SET UP UI TICKS
    this.tickTimer = setInterval(this.tick,(1000/this.UI_FPS), this);
  }

  this.clean = function()
  {
    //clear the screen
    this.ctx.fillStyle="#000000";  
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    //set more defaults
  }


  this.render_push = function()
  {
    this.ctx.transform(this.zoom, 0, 0, this.zoom, this.WIDTH/2, this.HEIGHT/2)
  }
  this.render_reset = function()
  {
    // global reset
    this.ctx.setTransform(1,0,0,1,0,0)

  } 
  this.render = function()
  { 
    this.render_push();
    this.ctrl.model.world.render(this);
    this.ctrl.model.player.render(this);
    this.render_reset();

    // UI STUFF
    this.render_lighting()
    if(DEBUG_FPS) {
      this.render_fps();
    }
    this.ctrl.model.player.inventory.render(this)
    this.ctrl.model.player.stockpile.render(this)
    
    
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
    this.lighting.addColorStop(0.1, 'rgba(0,0,0,0)')
    this.lighting.addColorStop(1, 'rgba(0,0,0,1)')


    this.ctx.fillStyle=this.lighting;  
    this.ctx.fillRect(0, 0, this.WIDTH, this.WIDTH);
  }

  this.tick = function (scrn)
  {
    scrn.clean();
    scrn.render();
    var new_ts = new Date().getTime()
    scrn.tick_ms = (new_ts - scrn.tick_ts)
    scrn.tick_ts = new_ts
  }

  this.init();
};