#pragma strict
var buttonRect: Rect = Rect(10,10,50,50);
function Start () {

}

function Update () {

}

function OnGUI(){
	if(GUI.Button(buttonRect, 'Throw')){
		Debug.Log('Throw');
	}
}