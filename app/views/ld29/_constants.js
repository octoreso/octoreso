var Direction         = {}
Direction.RIGHT       = 0
Direction.DOWN        = 1
Direction.LEFT        = 2
Direction.UP          = 3
var Sprite            = {}
Sprite.Offset         = {}
Sprite.Offset.PLAYER  = 0
Sprite.Offset.DAMAGE  = 8
Sprite.SHEET_WIDTH    = 8
// Matches Sprite Number
var TILE_SIZE   = 32
var ICON_SIZE   = 8
var PLAYER_SIZE = 10
var DEBUG_FPS   = false

// technically doubled.
var WORLD_X_MIN = -5
var WORLD_Y_MIN = -5
var WORLD_X_MAX = 5
var WORLD_Y_MAX = 5


var WORLD_WIDTH  = WORLD_X_MAX - WORLD_X_MIN//100
var WORLD_HEIGHT = WORLD_Y_MAX - WORLD_Y_MIN//30

