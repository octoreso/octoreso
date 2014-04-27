var GameCharacterMap = function(ctrl){
  this.getChar=function(name,scale)
  {
    var oW = 4 //original. Wider chars may modify!

    var w = 4;
    var h = 8;
    var x = 304;
    var y = 0;

    var dX = 0;
    var dY = 0;

    switch(name)
    {
      case '0':
      case 'O':
        dX = 0;
        dY = 1;
      break;
      case '1':
        dX = 1;
        dY = 1;
      break;
      case '2':
        dX = 2;
        dY = 1;
      break;
      case '3':
        dX = 3;
        dY = 1;
      break;
      case '4':
        dX = 4;
        dY = 1;
        break;
      case '5':
        dX = 0;
        dY = 2;
        break;
      case '6':
        dX = 1;
        dY = 2;
        break;
      case '7':
        dX = 2;
        dY = 2;
        break;
      case '8':
        dX = 3;
        dY = 2;
        break;
      case '9':
        dX = 4;
        dY = 2;
        break;
      case 'A':
        dX = 0
        dY = 3
      break;
      case 'B':
        dX = 1
        dY = 3
      break;
      case 'C':
        dX = 2
        dY = 3
      break;
      case 'D':
        dX = 3
        dY = 3
      break;
      case 'E':
        dX = 4
        dY = 3
      break;
      case 'F':
        dX = 0
        dY = 4
      break;
      case 'G':
        dX = 1
        dY = 4
      break;
      case 'H':
        dX = 2
        dY = 4
      break;
      case 'I':
        dX = 3
        dY = 4
      break;
      case 'J':
        dX = 4
        dY = 4
      break;
      case 'K':
        dX = 0
        dY = 5
      break;
      case 'L':
        dX = 1
        dY = 5
      break;
      case 'M':
        w = w + 2;
        dX = 2
        dY = 5
      break;
      case 'N':
        dX = 4
        dY = 5
      break;
      case 'P':
        dX = 0
        dY = 6
      break;
      case 'Q':
        w = w + 1
        dX = 1
        dY = 6
      break;
      case 'R':
        dX = 3
        dY = 6
      break;
      case 'S':
        dX = 4
        dY = 6
      break;
      case 'T':
        dX = 0
        dY = 7
      break;
      case 'U':
        dX = 1
        dY = 7
      break;
      case 'V':
        dX = 2
        dY = 7
      break;
      case 'W':
        w = w + 2 
        dX = 3
        dY = 7
      break;
      case 'X':
        dX = 0
        dY = 8
      break;  
      case 'Y':
        dX = 1
        dY = 8
      break;    
      case 'Z':
        dX = 2
        dY = 8
      break; 
      case ',':
        dX = 4
        dY = 8
      break; 
      case '.':
        dX = 0
        dY = 9
      break; 
      case '?':
        dX = 1
        dY = 9
      break; 
      case '!':
        dX = 2
        dY = 9
      break; 
      case '>':
        dX = 3
        dY = 9
      break; 
      case '<':
        dX = 4
        dY = 9
      break; 
      case '`':
        //I use this to nudge by a pixel
        w = 1
      break;

      case ' ':
      default:
        dX = 3
        dY = 8
      break; 
    }

    return {
      oW: oW,
      dX: dX,
      dY: dY,
      w: w,
      h: h,
      x: x,
      y: y
    }
  }
}