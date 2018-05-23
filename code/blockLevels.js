
/*
Block Codes
"G": Grass
"X": Goal
"L": Lava
"I": Ice
"B": Boost
"T": TrampReg
"-": TrampHor
"|": TrampVrt
"R": TrampDDn
"/": TrampDUp
"O": TrampSpin 
*/


var GAME_LEVELS = [

	
 	{map: ["LLLLLLL",
		   "GGLGLGX",
		   "LLLLLLL"],
	playerX: 1,
	playerY: 2,
	moves: 4},
	
	{map: ["LGLLLXL",
		   "GGLLLLL",
		   "LLLGLGL"],
	playerX: 1,
	playerY: 2,
	moves: 3},
	
	//first ice
	{map: ["XLLL",
		   "LILL",
		   "LLLL",
		   "LLLG",
		   "LIIL",
		   "LLLL",
		   "GGLL",
		   "LILL",
		   "LILL",
		   "LILL",
		   "LGLL",
		   "LGLL"],
	playerX: 2,
	playerY: 12,
	moves: 4},
	
	{map: ["GIXG",
		   "IILI",
		   "GLIG",
		   "LIII",
		   "IILI",
		   "GGGG",
		   "IIII",
		   "IIII",
		   "IIII"],
	playerX: 3,
	playerY: 9,
	moves: 4},
	
	{map: ["LLLLLLL",
		   "GGTLIIX",
		   "LLLLLLL"],
	playerX: 2,
	playerY: 2,
	moves: 2},
	
	{map: ["GIIIIIIITLG",
		   "IGILGTIIIGI",
		   "IIIGIITXIII"],
	playerX: 2,
	playerY: 2,
	moves: 6}, 
	
	
	
	{map: ["LLLLLLLL",
		   "GGT-|IIX",
		   "LLLLLLLL"],
	playerX: 1,
	playerY: 2,
	moves: 2},
	
	
	
	
	//first hor tramp
	{map: ["LLLLL-LGL-L-L-",
		   "GG-LG-IL-L-LLL",
		   "LLLLL-L-L-L-LX"],
	playerX: 1,
	playerY: 2,
	moves: 3},
	
	{map: ["IXIIIIBIII",
		   "LLLLLLLLLL",
		   "IBIIIIIII|"],
	playerX: 1,
	playerY: 3,
	moves: 1},
	
	{map: ["XLBLLLLLL",
		   "LLGGTBI|L",
		   "LLLLLLLLL"],
	playerX: 4,
	playerY: 2,
	moves: 2},
	
	{map: ["LLLLLLLLL",
		   "XLLGTBII|",
		   "LLLLLLLLL"],
	playerX: 4,
	playerY: 2,
	moves: 1},
	
	
	{map: ["GIIL-LLLLLL",
		   "ILIT-LL/L-L",
		   "IIGL/IIIIIX",
		   "GLLLRIGGLLL"],
	playerX: 1,
	playerY: 1,
	moves: 4},
	
	{map: [
		"-L-L-RLLLLL",
		"L/-RL-LGLLL",
		"||G||-IIIIX",
		"LR-/L-LILLL",
		"-L-L-LLLGLL"],
	playerX: 3,
	playerY: 3,
	moves: 3}
	
	
	
	
	
	];

if (typeof module != "undefined" && module.exports)
  module.exports = GAME_LEVELS;
