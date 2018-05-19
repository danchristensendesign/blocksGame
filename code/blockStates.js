//state-changing functions

function setState(newState) {
	//console.log("im in newState");
	//console.log(Player.action);
	if(Player.action === null || (notMoving(Player.action) || notMoving(newState))) {
		//console.log("shoulb be darwing workds");
		//drawBlocks();
		drawWords();
	}
	Player.action = newState;
	//console.log(Player.action);
	Player.action();
	Player.eventFrame = new Date().getTime();
	Player.wasAt = VectorCopy(Player.moves[0]);
	
}

function notMoving(action) {
	if(!(action === Jumping || action === Sliding))
		return true;
	else
		return false;
}

function Resting() {
	Player.drawTargs = true;
	Player.eventLimit = null;
	stopMovement();
	limitTargets();
	
	Player.alpha = ONE;
	Player.move = DONOTHING;
	Player.size = ONE;
	Player.angle = ZERO;
}

function Jumping() {
	Player.drawTargs = false;
	Player.eventLimit = Player.moveTime;
	Player.targMove = VectorCopy(Player.speed);
	Player.rotateDir = -Player.rotateDir;
	Player.angleSpeed = VectorToAbs(Player.speed);
	
	Player.alpha = ONE;
	Player.move = MOVING;
	Player.size = JUMPARC;
	Player.angle = SPINNING;
		
}

function Sliding(){
	var dir;
	if(Player.speed.x !== 0)
		dir = "x";
	else
		dir = "y";
	//console.log(Player.targMove[dir]);
	Player.drawTargs = false;
	
	Player.targMove = Vector(unitVal(Player.speed.x), unitVal(Player.speed.y));
	Player.eventLimit = Player.moveTime * Player.targMove[dir] / Player.speed[dir];
	//console.log(Player.eventLimit + " " + Player.targMove.x, Player.targMove.y);
	Player.alpha = ONE;
	Player.move = MOVING;
	Player.size = ONE;
	Player.angle = SPINNING;
		
}

function Winning() {
	Player.drawTargs = false;
	Player.eventLimit = 1000;
	stopMovement();
	
	Player.alpha = ONE;
	Player.move = DONOTHING;
	Player.size = GROWING;
	Player.angle = SPINNING;
}

function Burning() {
	Player.drawTargs = false;
	Player.eventLimit = 1000;
	stopMovement();
	
	Player.alpha = FADING;
	Player.move = DONOTHING;
	Player.size = ONE;
	Player.angle = SPINFADING;
}

function Falling() {
	Player.drawTargs = false;
	Player.eventLimit = Player.moveTime;
	Player.targMove = VectorCopy(Player.speed);
	//stopMovement();
	
	Player.alpha = FADING;
	Player.move = MOVING;
	Player.size = FADING;
	Player.angle = SPINNING;
}

function Dead() {
	Player.drawTargs = false;
	Player.eventLimit = null;
	stopMovement();
	
	Player.alpha = ZERO;
	Player.move = DONOTHING;
	Player.size = ONE;
	Player.angle = ZERO;
}

function GameOver() {
	Player.drawTargs = false;
	Player.eventLimit = null;
	
	Player.alpha = ONE;
	Player.move = DONOTHING;
	Player.size = PULSING;
	Player.angle = SPINNING;
}

function ONE() {
	return 1.0;
}

function ZERO() {
	return 0;
}

function DONOTHING() {
};

function MOVING(elapsed) {
	//console.log(elapsed);
	var inc = Vector(Player.speed.x * elapsed/Player.moveTime, //smaller(Player.targMove.x, Player.speed.x * elapsed/Player.eventLimit), 
					 Player.speed.y * elapsed/Player.moveTime);//smaller(Player.targMove.y, Player.speed.y * elapsed/Player.eventLimit))
	Player.moves[0] = VectorPlus(Player.wasAt, inc);
	//console.log(inc.x + " " + inc.y);
	Player.targMove = VectorPlus(Player.targMove, inc, "sub");
	
}


function JUMPARC(elapsed) {
	var sz = 1 + (Player.jumpA * Math.pow(elapsed, 2) + Player.jumpV * elapsed);
	//console.log(Player.jumpA + " " + Player.jumpV + " "  + elapsed + " " +sz);
	return sz;
};

function SPINNING(elapsed) {
	var angle = (Player.rotateDir * elapsed * Player.angleSpeed * Player.spinC) % (2 * Math.PI);
	//console.log(angle);
	return angle;
};

function FADING(elapsed) {
	return (Math.max(0, 1 - elapsed/Player.eventLimit));
}

function SPINFADING(elapsed) {
	var timeFact = Math.max(1-elapsed/Player.eventLimit, 0);
	//console.log(timeFact);
	var angle = (Player.rotateDir * Math.log(elapsed)/Math.log(1.05) * Player.angleSpeed * Player.spinC);
	return angle;
}
	
function GROWING(elapsed) {
	return (1 + 3 * elapsed/Player.eventLimit);
}	

function PULSING(elapsed) {
	return  (3 + -2* Math.cos(elapsed/Player.moveTime));
}