//global variable holders for the Level/player state	
//**********************************************************************************************


var Level = {
	
	//unchanging
	canvas : null,
	cx : null,
	sprites : document.createElement("img"),
	spriteWidth : 40,
	blockWidth : 60,
	margin : 80,
	
	//changing
	number : null,
	width : 0,
	height : 0,
	blocks : [],	
};

var Player = {
	
	//unchanging
	sprites : document.createElement("img"),
	spriteWidth : 40,
	moveTime : 500,
	jumpA : 0,
	jumpV : 0,
	spinC : 0,
	targAlpha : 0.3,
	
	//changing
	action : null,
	movesLeft : 0,
	moves : [],
	targLimit : {},
	targMove : {
		x : 0,
		y : 0
	},
	wasAt : {
		x : 0,
		y : 0
	},
	speed : {},
	angleSpeed : {},
	rotateDir : 1,
	alpha : {},
	move : {},
	angle : {},
	size : {},
	targsOn : false,
	drawTargs : true,
	eventLimit : null,
	eventFrame : null,
	lastFrame : null
};


