#pragma strict

class Timer {
	
	var started: boolean = false;
	var currentTime: float;
	var previousTime: float;
	function Timer(){
		
	}
	
	function start(){
		reset();
		started = true;
	}
	
	function play(){
		started = true;
	}
	
	function stop(){
		started = false;
	}
	
	function reset(){
		previousTime = currentTime;
		currentTime = 0.0;
	}
	
	function isStarted(){
		return started;
	}
	
	function getTime(){
		return currentTime;
	}
	
	function getPreviousTime(){
		return previousTime;
	}
	
	function update(){
		if(!started){
			return;
		}
		
		currentTime +=Time.fixedDeltaTime;
	}
	
	function FixedUpdate () {
		update();
	}
}