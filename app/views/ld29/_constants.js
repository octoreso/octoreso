var Direction         = {}
Direction.RIGHT       = 0
Direction.DOWN        = 1
Direction.LEFT        = 2
Direction.UP          = 3
var Sprite            = {}
Sprite.Offset         = {}
Sprite.Offset.PLAYER           = 0
Sprite.Offset.PORTAL_PROXIMITY = 24
Sprite.Offset.DAMAGE           = 8
Sprite.SHEET_WIDTH             = 8

var GameState = {}
GameState.LOADING = 1
GameState.MENU    = 2
GameState.PLAYING = 3

var GameMenuState   = {}
GameMenuState.MAIN  = 0  
GameMenuState.HELP  = 1  
GameMenuState.STORY = 2  
GameMenuState.ABOUT = 3  

// Matches Sprite Number
var TILE_SIZE   = 32
var ICON_SIZE   = 8
var PLAYER_SIZE = 10
var DEBUG_FPS   = false
var DEBUG_STATE = false

// technically doubled.
var WORLD_X_MIN = -30
var WORLD_Y_MIN = -5
var WORLD_X_MAX = 30
var WORLD_Y_MAX = 1000

var WORLD_WIDTH  = WORLD_X_MAX - WORLD_X_MIN
var WORLD_HEIGHT = WORLD_Y_MAX - WORLD_Y_MIN
