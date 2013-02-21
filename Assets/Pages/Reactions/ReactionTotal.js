#pragma strict

class ReactionTotal {
	var buttons: int; // Number of buttons available
	var time: float = 0.0; // Total time recorded
	var reactions: int = 0; // Number of reactions recorded
	
	function ReactionTotal (b: int) {
		buttons = b;
	}
	
	/**
	 * Return the average time taken per reaction
	 * @return float
	 */
	function getAverageTime () {
		if(!time || !reactions){
			return 0.0;
		}
		return time/reactions;
	}
	
	function addReaction(r: Reaction){
		addTime(r.time);
		addReaction();
	}
	
	function addTime(t: float){
		time += t;
	}
	
	function addReaction(){
		reactions++;
	}

}