#pragma strict

var sceneOptions: TennisServeHeightOptions;
var objectEnabled: boolean = true;

function OnCollisionEnter(collision : Collision) {
    // Debug-draw all contact points and normals
    for (var contact : ContactPoint in collision.contacts) {
        Debug.DrawRay(contact.point, contact.normal, Color.white);
    }
    
    if(!objectEnabled){
    	return;
    }
    
    Debug.Log('ball collided');
    // Hit the wrong object. Ball is disabled.
    if(collision.gameObject.name!=='ServiceBoxTarget'){
    	//sceneOptions.recordIncorrectHit();
    	objectEnabled = false;
    	Debug.Log('collision.gameObject.name = '+collision.gameObject.name);
    	Debug.Log('ball disabled');
    	return;
    }
    
	sceneOptions.recordHit();
	
    
}