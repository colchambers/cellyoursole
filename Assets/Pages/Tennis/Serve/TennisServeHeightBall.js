#pragma strict

var sceneOptions: TennisServeOptions;
var objectEnabled: boolean = true;

function OnCollisionEnter(collision : Collision) {
    // Debug-draw all contact points and normals
    for (var contact : ContactPoint in collision.contacts) {
        Debug.DrawRay(contact.point, contact.normal, Color.white);
    }
    
    if(!objectEnabled){
    	return;
    }
    
    // Hit the wrong object. Ball is disabled.
    if(collision.gameObject.name!=='ServiceBoxTarget'){
    	//sceneOptions.recordIncorrectHit();
    	objectEnabled = false;
    	return;
    }
    
	sceneOptions.recordHit();
    
}

function OnTriggerEnter(collision : Collider) {
   
    if(!objectEnabled){
    	return;
    }
    
    // Hit the wrong object. Ball is disabled.
    if(collision.gameObject.name!='ServiceBoxTarget'){
    	//sceneOptions.recordIncorrectHit();
    	objectEnabled = false;
    	return;
    }
    
	sceneOptions.recordHit();
}