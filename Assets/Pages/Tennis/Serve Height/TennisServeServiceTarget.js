#pragma strict

var sceneOptions: TennisServeHeightOptions;

//called when hit
function OnTriggerEnter(){
	// Update score
	sceneOptions.recordHit();
}