#pragma strict

var minX:float=-5;
var maxX:float=8;
var minY:float=-4;
var maxY:float=4;

var hitEffect: ParticleSystem;
var sceneOptions: TennisServeGameOptions;

//called when hit
function OnTriggerEnter(){
	//place the hitEffect at the object position and assign a random color to it
	hitEffect.transform.position=transform.position;
	hitEffect.startColor= Color(Random.Range(0.0, 1.0), Random.Range(0.0, 1.0), Random.Range(0.0, 1.0));
	//emit a set number of particle
	hitEffect.Emit(30);
	
	yield;
	
	//place the target at a new position
	var pos:Vector3= Vector3(Random.Range(minX, maxX), Random.Range(minY, maxY), 0);
	transform.position=pos;
	
	// Update score
	sceneOptions.recordHit();
	
	// Destroy target
	Destroy(gameObject);
}