#pragma strict

var sceneOptions: TennisServeHeightOptions;
var objectEnabled: boolean = true;
var fudgeFactor: float = 0.1;

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

function FixedUpdate(){
	rigidbody.AddForce( fudgeFactor*Vector3.Cross(rigidbody.velocity,rigidbody.angularVelocity), ForceMode.Force);
}