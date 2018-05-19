

//Diving in point for the game (initialize everything/load first level)
//*******************************************************************************************

function startGame() {
	console.log('statring');
	trackKeys();
	Level.number = -1;	
	Player.jumpA = -4 / Math.pow(Player.moveTime, 2);
	Player.jumpV = -Player.jumpA * Player.moveTime;
	Player.spinC = Math.PI/2 / Player.moveTime;
	Level.sprites.src = "img/squareSprites.png";
	Player.sprites.src = "img/playerSprites.png";

	
	Level.sprites.onload = function() {
		console.log("loaded blocks");
		Player.sprites.onload = function() {
			console.log("loaded player");
			Level.number = -1;
			console.log('goin to level');
			nextLevel();
			requestAnimationFrame(animateGame);
			
		}
	}
}

function jumpInto() {
	if(nextLevel)
		requestAnimationFrame(animateGame);
}


function animateGame() {
	var thisFrame = new Date().getTime();
	var elapsed = thisFrame - Player.eventFrame;
	if(updateFrame(elapsed)){
	
		if(Player.eventLimit !== null && elapsed >= Player.eventLimit){
			Player.moves[0] = VectorRound(Player.moves[0]);
			Player.targMove = Vector(0,0,0);
			onMap(Player.moves[0])();
		}

		requestAnimationFrame(animateGame);
	}
}


function testImage(img, thenDo) {

    img.addEventListener('load', thenDo);
    img.addEventListener('error', iFailed(img.src));
}

function iFailed(src) {
	console.log(src + " failed to load");
}








