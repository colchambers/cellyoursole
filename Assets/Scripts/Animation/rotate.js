#pragma strict
var distance = 10.0;

var xSpeed = 450.0;
var ySpeed = 420.0;

private var x = 0.0;
private var y = 0.0;

function Start () {
 var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;

	// Make the rigid body not change rotation
   	if (rigidbody){
		rigidbody.freezeRotation = true;
	}
}

function LateUpdate () {
    if (true && Input.GetMouseButton(0)) {
        x -= Input.GetAxis("Mouse X") * xSpeed * 0.02;
        y += Input.GetAxis("Mouse Y") * ySpeed * 0.02;
 		       
        var rotation = Quaternion.Euler(y, x, 0);
        transform.rotation = rotation;
    }
}

