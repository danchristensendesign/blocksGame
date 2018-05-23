function Vector(xVal, yVal){
	return {x : xVal,
			y : yVal
	};
}



function limitTargets() {
	Player.targLimit.xMin = smaller(-Player.moves[0].x, -2);
	Player.targLimit.xMax = smaller(Level.width-1-Player.moves[0].x, 2);
	Player.targLimit.yMin = smaller(-Player.moves[0].y, -2);
	Player.targLimit.yMax = smaller(Level.height-1-Player.moves[0].y, 2);
}

function delWithinTarget(del) {
	//console.log(del.x + ', min ' + Player.targLimit.xMin + ', max ' +  Player.targLimit.xMax);
	//console.log(del.y + ', min ' + Player.targLimit.yMin + ', max ' +  Player.targLimit.yMax);
	if(!(del.x < Player.targLimit.xMin || del.x > Player.targLimit.xMax ||
		   del.y < Player.targLimit.yMin || del.y > Player.targLimit.yMax))
	{
		//console.log(del.x + ', ' + del.y + ' good');
		return true;
	}
	else
		return false;
};



function VectorHasVal(vect) {
	if(Math.abs(vect.x) > .001 ||  Math.abs(vect.y) > .001 )
		return true;
	else{
		return false;
	}
}

function VectorRound(vect) {
	return {x: Math.round(vect.x),
			y: Math.round(vect.y)
	}
}

function VectorCopy(vect) {
	return {x : vect.x,
			y : vect.y
	};
}


function VectorPlus(vec1, vec2, isSub) {
	var sgn = 1;
	if (arguments.length === 3)
		sgn = -1;

	return {x : vec1.x + sgn * vec2.x, 
			y : vec1.y + sgn * vec2.y
	}
};

function VectorToAbs(vect) {
	return (Math.abs(vect.x) + Math.abs(vect.y));
}

function unitVal(val) {
	if (val >= 0)
		return Math.min(val, 1);
	else
		return Math.max(val, -1);
};


function smaller(val1, val2) {
	if (val1 > 0 || val2 > 0)
		return Math.min(val1, val2)
	else
		return Math.max(val1, val2)
};


function stopMovement(){
	Player.targMove = Vector(0,0);
	Player.speed = Vector(0,0);
}

function eventElapsed(){
	return Player.lastFrame - Player.eventFrame;
};