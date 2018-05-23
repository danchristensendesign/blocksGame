//state-changing triggers
var keyStates = {
		32: {act: MakeMove},
		37: {act: PlanMove, x: -1, y: 0},
		38: {act: PlanMove, x: 0, y: -1},
		39: {act: PlanMove, x: 1, y: 0},
		40: {act: PlanMove, x: 0, y: 1},
		82: {act: StepBack, all: "all"},
		90: {act: StepBack, all: 1},
		84: {act: TargToggle},
		78: {act: nextLevel}
};

//monitors keys and calls when they are pressed
function trackKeys() {
	console.log('tracking');
	function handler(event) {
		var keyNum = event.keyCode;
		if (keyStates[keyNum] && event.type === "keydown") {
			event.preventDefault();
			if(keyNum >=37 && keyNum <=40)
				keyStates[keyNum].act(Vector(keyStates[keyNum].x, keyStates[keyNum].y,1));
			else if(keyNum === 82 || keyNum === 90)
				keyStates[keyNum].act(keyStates[keyNum].all);
			else
				keyStates[keyNum].act();
		}
	}
	addEventListener("keydown", handler);
	addEventListener("keyup", handler);
};




 //key events
 
 function TargToggle() {
	 Player.targsOn = !Player.targsOn;
 }
 
 function PlanMove(planDelta) {
	if (Player.action === Resting && Player.movesLeft > 0) {
		var tDel = VectorPlus(Player.targMove, planDelta);
		
		// Player.targMove = VectorCopy(tDel);
		// return;
		// check that it's within the target limits
		if (delWithinTarget(tDel)){
		   
		   //console.log("should be moving target");
			// check if it's in a dead spot
			if(VectorToAbs(tDel) === 3){
				
				//moving from an outer edge, double the movement
				if(Math.abs(Player.targMove.x) === 2 || Math.abs(Player.targMove.y) === 2)
				{
					
					tDel = VectorPlus(tDel, planDelta);
					console.log('doubled ' + tDel.x + ', ' + tDel.y);
				}
				// if it's moving to a dead spot from an inner corner, move to the nearest cardinal (in the specified direction)
				else if(Math.abs(Player.targMove.x) === Math.abs(Player.targMove.y)) 
					tDel = VectorPlus(planDelta, planDelta)
				
				// if it's moving to a dead spot from an outer edge, double the movement amount (since ok/dead spots alternate)

				
				if(delWithinTarget(tDel))
					Player.targMove = VectorCopy(tDel);
			
			// if it wasn't in a dead spot, use it
			}else
				Player.targMove = VectorCopy(tDel);
		}
		
	}
	//Player.moves[0] = VectorPlus(Player.moves[0], Player.targMove);
	//console.log(Player.targMove.x +  " " + Player.targMove.y);
}
 
 
 function MakeMove() {
	 if(Player.action === Resting && VectorHasVal(Player.targMove) && Player.movesLeft > 0) {
		 Player.moves.unshift(Player.moves[0]);
		 Player.speed = Vector(Player.targMove.x, Player.targMove.y);
		 setState(Jumping);
	 }
 }
 
 function StepBack(amt) {
	if(arguments.length > 0 && (amt === "all" || amt === true))
		amt = Player.moves.length-1;
	else
		amt = 1;
	
	if(Player.moves.length > 1){
		for(i = 1; i <= amt; i += 1){
			Player.moves.shift();
		}	
		Player.movesLeft = GAME_LEVELS[Level.number].moves -(Player.moves.length-1);
	}
	setState(Resting);
};



function nextLevel() {
	drawn = false;
	console.log('in the level');
	//increment level, exit if no more
	Level.number += 1;
	if (Level.number >= GAME_LEVELS.length) {
		setState(GameOver);
		return;
	}
	
	//get the level map
	Level.width = GAME_LEVELS[Level.number].map[0].length;
	Level.height = GAME_LEVELS[Level.number].map.length;
	Level.blocks = [];
	Level.blockWidth = Math.min(maxBlock, Math.floor((screenW - 2 * Level.margin)/Level.width), Math.floor((screenH - 2 * Level.margin)/Level.height));
	
	for(var y = 0; y < Level.height; y += 1) 
	{
		var levelRow = GAME_LEVELS[Level.number].map[y];
		var blockRow = [];
		for(var x = 0; x < Level.width; x += 1) 
		{
			blockRow.push(blockTypes[levelRow[x]]);
		}
		Level.blocks.push(blockRow);
	}
	
	Player.movesLeft = GAME_LEVELS[Level.number].moves;
	Player.moves = [];
	Player.moves.unshift(Vector(GAME_LEVELS[Level.number].playerX-1, GAME_LEVELS[Level.number].playerY-1, 0));
	clearCanvas(Level);
	drawBlocks();
	console.log("made the level");
	setState(Resting);
	return true;
}


var TrampInd = 10;

function getTrampInd(ind){
	if(arguments.length < 1)
		return TrampInd;
	else
		return ind;
	
}

//block events
var blockTypes = {
	"G": {act: Grass, ind: function(){return 0;}},
	"X": {act: Goal, ind: function(){return 1;}},
	"L": {act: Lava, ind: function(){return 2;}},//getLavaInd},//function(){return 2;}},
	"I": {act: Ice, ind: function(){return 5;}},
	"B": {act: Boost, ind: getBoostInd},
	"T": {act: TrampReg, ind: function(){return 9;}},
	"-": {act: TrampHor, ind: function(){return 10;}},
	"|": {act: TrampVrt, ind: function(){return 11;}},
	"R": {act: TrampDDn, ind: function(){return 12;}},
	"/": {act: TrampDUp, ind: function(){return 13;}},
	"O": {act: TrampSpin, ind: getTrampInd}
};

function spinTramp() {
	console.log("should spin");
	switch (TrampInd){
			case 13:
				return 10;
			case 10:
				return 12;
			case 12: 
				return 11;
			case 11:
				return 13;
			default:
				console.log("i didnt change" + " " + TrampInd);
				
	};
}


function onMap(posVect) {
	if (posVect.x >= 0 && posVect.x < Level.width && posVect.y >= 0 && posVect.y < Level.height){
		//console.log(posVect.x, posVect.y);
		return Level.blocks[posVect.y][posVect.x].act;
	}
	else
		return OffMap;
}

function Grass() {
	console.log('taking move');
	Player.movesLeft = Math.max(0, Player.movesLeft-1);
	if(Player.movesLeft > 0)
		setState(Resting);
	else {
		if(Player.action === Burning)
			setState(Dead);
		else
			setState(Burning);
	}
}	

function Goal() {
	if (Level.number + 1 >= GAME_LEVELS.length)
		setState(GameOver);
	else if (Player.action === Winning)
		nextLevel();
	else {
		Player.movesLeft -= 1;
		setState(Winning);
	}
}

function Ice() {
	setState(Sliding);
}

function Boost() 
{
	/* Player.speed.x += 1* unitVal(Player.speed.x);
	Player.speed.y += 1* unitVal(Player.speed.y); */
	var found = false;
	for(var x = 0; x < Level.width; x += 1)
	{
		for(var y = 0; y < Level.height; y +=1)
		{
			if(Level.blocks[y][x].act === Boost && !(x === Player.moves[0].x && y === Player.moves[0].y))
			{
				console.log(x + ', ' + y);
				Player.moves[0].x = x;
				Player.moves[0].y = y;
				found = true;
				break;
			}
		}
		if(found) break;
	}
	
	setState(Player.action);
}

function TrampReg() {
	setState(Jumping);
}

function TrampHor() {
	Player.speed.y = -Player.speed.y;
	setState(Jumping);
}

function TrampVrt() {
	Player.speed.x = -Player.speed.x;
	setState(Jumping);
}

function TrampDUp() {
	Player.speed = Vector(-Player.speed.y, -Player.speed.x);
	setState(Jumping);
}

function TrampSpin() {
	var tInd = TrampInd;
	
	
	switch(tInd){
		case 10:
			TrampHor();
			break;
		case 11:
			TrampVrt();
			break;
		case 12:
			TrampDDn();
			break;
		case 13:
			TrampDUp();
			break;
	};
	TrampInd = spinTramp();
	

}

function TrampDDn(){
	Player.speed = Vector(Player.speed.y, Player.speed.x);
	setState(Jumping);
}

function Lava() {
	if (Player.action === Burning)
		setState(Dead);
	else {
		Player.movesLeft = 0;
		setState(Burning);
	}
}

function OffMap() {
	if (Player.action === Falling)
		setState(Dead);
	else {
		Player.movesLeft = 0;
		setState(Falling);
	}
}	 

 
