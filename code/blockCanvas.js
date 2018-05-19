Level.canvas = document.getElementById("LevelCanvas");
Level.cx = Level.canvas.getContext("2d");
Player.canvas = document.getElementById("PlayerCanvas");
Player.cx = Player.canvas.getContext("2d");
Level.cx.globalAlpha = 1.0;
Player.cx.globalAlpha = 1.0;
setAntiAlias(Level);
setAntiAlias(Player);
function setAntiAlias(parent){
	parent.cx['imageSmoothingEnabled'] = false;       /* standard */
    parent.cx['mozImageSmoothingEnabled'] = false;    /* Firefox */
    parent.cx['oImageSmoothingEnabled'] = false;      /* Opera */
    parent.cx['webkitImageSmoothingEnabled'] = false; /* Safari */
    parent.cx['msImageSmoothingEnabled'] = false;     /* IE */
}


function updateFrame(elapsed) {
	//if(drawBlocks(Player.drawTargs)){
		clearCanvas(Player);	
		if(drawTargets(elapsed)){
		
			if(drawPlayer(elapsed))
				return true;
			
		}
	//}
};


function clearCanvas(parent) {
	parent.cx.clearRect(0,0, parent.canvas.width, parent.canvas.height);
};

function drawWords() {
	Level.cx.font = ("14px Arial");
	Level.cx.fillStyle = "RGB(0,0,0)";
	Level.cx.fillRect(0, 0, Level.canvas.width, Level.margin);
	Level.cx.fillStyle = "RGB(255,255,255)";
	Level.cx.fillText("plan a move: arrow keys      execute a move: space bar", Level.margin,20);
	Level.cx.fillText("undo: Z      restart: R      show/hide move possibilities: T", Level.margin,40);
	Level.cx.fillText("level: " + (Level.number +1) + ", moves left: " + Player.movesLeft, Level.margin, 70);
}

function drawBlocks(targs) {
	
	//initialize to all squares
	var X = [0, Level.width-1];
	var Y = [0, Level.height-1];

	if (arguments.length > 0){
		
		//redrawing all target squares
		// if(targs === true){
			X = [Math.floor(Player.moves[0].x) + Player.targLimit.xMin, 
				 Math.ceil(Player.moves[0].x) + Player.targLimit.xMax];
				 
			Y = [Math.floor(Player.moves[0].y) + Player.targLimit.yMin, 
				 Math.ceil(Player.moves[0].y) + Player.targLimit.yMax];
		
		//redrawing only squares player is touching
		// }else {
			// X = [Math.floor(Player.moves[0].x), 
				 // Math.ceil(Player.moves[0].x)];
				 
			// Y = [Math.floor(Player.moves[0].y), 
				 // Math.ceil(Player.moves[0].y)];
		
	} else{
		Level.cx.fillStyle = "RGB(0,0,0)";
		Level.cx.fillRect(0, 0, Level.canvas.width, Level.canvas.height);
		// Level.cx.fillStyle = "RGB(255,255,255)";
		// Level.cx.fillRect(0, 0, 2 * Level.margin + Level.width * Level.blockWidth, Level.Margin);
		// Level.cx.fillRect(0, 0, Level.margin, 2 * Level.margin + Level.height * Level.blockWidth);
		// Level.cx.fillRect(0, Level.margin + Level.height * Level.blockWidth, 2 * Level.margin + Level.width * Level.blockWidth, Level.Margin);
		// Level.cx.fillRect(Level.margin + Level.width * Level.blockWidth, 0, Level.margin, 2 * Level.margin + Level.height * Level.blockWidth);
	}
	
	//loop through and draw squares
	for(var x = X[0]; x <= X[1]; x +=1){
		for(var y = Y[0]; y <= Y[1]; y +=1){
			if(x === 2 && y ===2 )
				console.log("drawing tramp " + Level.blocks[y][x].ind);
			if(onMap(Vector(x, y)) === OffMap){
				Level.cx.fillStyle = "RGB(255,255,255)";
				Level.cx.fillRect(Level.margin + x * Level.blockWidth, Level.margin + y * Level.blockWidth, Level.blockWidth, Level.blockWidth);
			}
			else{
				Level.cx.drawImage(Level.sprites, Level.blocks[y][x].ind() * Level.spriteWidth, 0, Level.spriteWidth, Level.spriteWidth,
						 Level.margin + x * Level.blockWidth, Level.margin + y * Level.blockWidth, Level.blockWidth, Level.blockWidth);
			}
		}
	}
	return true;
};


function drawPlayer(elapsed) {
	
	//set the player's angle/size/alpha based on current action
	var alpha = Player.alpha(elapsed);
	var size = Player.size(elapsed);
	var angle = Player.angle(elapsed);
	Player.move(elapsed);
	
	var blockBuffer = Level.margin + Level.blockWidth / 2;
	var playerBlock = size * Level.blockWidth;	
	
	Player.cx.save();
	Player.cx.globalAlpha = alpha;
	Player.cx.translate(blockBuffer + Player.moves[0].x * Level.blockWidth, 
				 blockBuffer + Player.moves[0].y * Level.blockWidth);
	
	//console.log('drawing player');
	Player.cx.rotate(angle);
	Player.cx.drawImage(Player.sprites, 0, 0, Player.spriteWidth, Player.spriteWidth,
				 -playerBlock/2, -playerBlock/2, playerBlock, playerBlock);
	Player.cx.restore();
	Player.cx.globalAlpha = 1.0;
	return true;
}


function drawTargets(elapsed) {
	var scl;
	if(Player.drawTargs) {
		
		
		if(Player.targsOn) {
			Player.cx.save();
			Player.cx.translate(Level.margin + (.5 +Player.moves[0].x) * Level.blockWidth, 
						 Level.margin + (.5 +Player.moves[0].y) * Level.blockWidth);
			
			//draw all eight lines going clockwise
			drawLine(0, Player.targLimit.yMin);
			
			scl = smaller(Math.abs(Player.targLimit.xMax), Math.abs(Player.targLimit.yMin));
			drawLine(unitVal(Player.targLimit.xMax)*scl, unitVal(Player.targLimit.yMin)*scl);
			
			drawLine(Player.targLimit.xMax, 0);
			
			scl = smaller(Math.abs(Player.targLimit.xMax), Math.abs(Player.targLimit.yMax));
			drawLine(unitVal(Player.targLimit.xMax)*scl, unitVal(Player.targLimit.yMax)*scl);
			
			drawLine(0, Player.targLimit.yMax);
			
			scl = smaller(Math.abs(Player.targLimit.xMin), Math.abs(Player.targLimit.yMax));
			drawLine(unitVal(Player.targLimit.xMin)*scl, unitVal(Player.targLimit.yMax)*scl);
			
			drawLine(Player.targLimit.xMin, 0);
			
			scl = smaller(Math.abs(Player.targLimit.xMin), Math.abs(Player.targLimit.yMin));
			drawLine(unitVal(Player.targLimit.xMin)*scl, unitVal(Player.targLimit.yMin)*scl);
			
			// for(var i = Player.targLimit.xMin; i <= Player.targLimit.xMax; i += 1){
				// for(var j = Player.targLimit.yMin; j <= Player.targLimit.yMax; j += 1){
					// if(Math.abs(i) + Math.abs(j) !== 3){
						// Player.cx.drawImage(Player.sprites, Player.spriteWidth, 0, Player.spriteWidth, Player.spriteWidth,
						 // Level.margin + (i+Player.moves[0].x) * Level.blockWidth, 
						 // Level.margin + (j+Player.moves[0].y) * Level.blockWidth, 
						 // Level.blockWidth, Level.blockWidth);
					// }
				// }
			// }
		Player.cx.restore();
		}
		
		Player.cx.globalAlpha = Player.targAlpha;
		Player.cx.drawImage(Player.sprites, 0, 0, Player.spriteWidth, Player.spriteWidth,
					 Level.margin + (Player.targMove.x+Player.moves[0].x) * Level.blockWidth, 
					 Level.margin + (Player.targMove.y+Player.moves[0].y) * Level.blockWidth, 
					 Level.blockWidth, Level.blockWidth);
		
		
		Player.cx.globalAlpha = 1.0;
	}
	return true;
};

function drawLine(xAmt, yAmt) {
	if(Math.abs(xAmt) < 1 && Math.abs(yAmt) < 1) 
		return;
	Player.cx.globalAlpha = 1;
	Player.cx.strokeStyle = "RGB(0,0,0)";
	Player.cx.lineWidth = 1;
	Player.cx.beginPath();
	Player.cx.moveTo(0,0);
	Player.cx.lineTo(Level.blockWidth * xAmt, Level.blockWidth * yAmt);
	Player.cx.stroke();
}



