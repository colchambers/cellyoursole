#pragma strict
import System.Collections.Generic;	
var crosshair: GUITexture;
	
var turret: Transform; // Player 1

//the minimum and maximum elevation of the turret
var minElevation:float=10.0; // 0
var maxElevation:float=80; // 80

var bar:GUITexture; // value

var maxForce:float=200; //maximum force, used when the charge is released at maximum // 900
var bullet: GameObject; // Ball
var angleAdjustment:int=100; // 100
var crosshairAdjustmentX:int=-35;
var crosshairAdjustmentY:int=-35;
var racquetRotationY:float = 1.6;

var presenter:MainPresenter;

// Use this for initialization
function Start () {
	//fake a tap event to initiate the turret rotation and cursor
	var tap: Tap= Tap(Vector2(Screen.width/1.9, Screen.height/2));
	OnTap(tap);
}

function OnEnable(){
	Gesture.onMultiTapE += OnTap;
	
	Gesture.onChargingE += OnCharging;
	Gesture.onChargeEndE += OnChargeEnd;
	
	Gesture.onMFChargingE += OnMFCharging;
	Gesture.onMFChargeEndE += OnMFChargeEnd;
}

function OnDisable(){
	Gesture.onMultiTapE -= OnTap;
	
	Gesture.onChargingE -= OnCharging;
	Gesture.onChargeEndE -= OnChargeEnd;
	
	Gesture.onMFChargingE -= OnMFCharging;
	Gesture.onMFChargeEndE -= OnMFChargeEnd;
}

// Update is called once per frame
function Update () {

}

//called when a tap is detected
function OnTap(tap: Tap){
	//if the tap is triggered by mouse, we want only left mouse button
	if(tap.isMouse && tap.index!=0) {
		return;
	}
	
	var ray:Ray = Camera.main.ScreenPointToRay(tap.pos);
	var hit:RaycastHit;
	//use raycast at the cursor position to detect the object
	if(Physics.Raycast(ray, hit, 10000)){
		var p:Vector3 = hit.point;
		p.y += racquetRotationY;
		turret.LookAt(p);
	}
	//crosshair default pixel inset is (-35, -35, 70, 70) and it's transform is positioned at (0, 0, 0)
	crosshair.pixelInset=Rect(tap.pos.x+crosshairAdjustmentX, tap.pos.y+crosshairAdjustmentY, 70, 70);
	
}

//triggered when mouse/single-finger charging event is on-going
//this is just to simulate 2-fingers charge event using right-mouse-click
function OnCharging(cInfo: ChargedInfo){
	if(cInfo.isMouse){
		if(cInfo.index==1){
			//if this is triggered by right-mouse-button, modified the fingerCount and call OnMFCharging with the same chargeInfo
			cInfo.fingerCount=2;
			OnMFCharging(cInfo);
		}
	}
}

//triggered when mouse/single-finger charging event is ended
function OnChargeEnd(cInfo: ChargedInfo){
	if(cInfo.isMouse){
		if(cInfo.index==1){
			//if this is triggered by right-mouse-button, modified the fingerCount and call OnMFChargeEnd with the same chargeInfo
			cInfo.fingerCount=2;
			OnMFChargeEnd(cInfo);
		}
	}
}

//triggered when a multiple finger charge event is on-going
function OnMFCharging(cInfo:ChargedInfo){
	if(cInfo.fingerCount==2){
		//adjust the length of the indicator bar accordingly to the percent
		bar.pixelInset=Rect(bar.pixelInset.x, bar.pixelInset.y, cInfo.percent*150, bar.pixelInset.height);
		//adjust the color on the bar
		bar.color=Color(cInfo.percent, 1-cInfo.percent, 0);
	}
}

//triggered when a multiple finger charge event has ended
function OnMFChargeEnd(cInfo:ChargedInfo){
	if(cInfo.fingerCount==2){
		//reset the bullet
		//adjust the position os it's at the tip of the barrel
		bullet.transform.position=turret.TransformPoint(Vector3(0, 0, 1.0));
		//match the bullet rotation to turret's, so that when force is applied, the bullet head in the right direction
		bullet.transform.rotation=turret.rotation;
		//cancel current force on bullet
		bullet.rigidbody.velocity=Vector3.zero;
		
		//shoot the bullet based on the charged percent
		bullet.rigidbody.AddForce(cInfo.percent*maxForce*bullet.transform.forward);
		
		//clear the charge indicator bar
		bar.pixelInset=Rect(bar.pixelInset.x, bar.pixelInset.y, 0, bar.pixelInset.height);
		
		// Record ball strike
		var mvp = presenter.getCurrentMVP();
		mvp.call('recordBallStrike');
	}
}

var instruction:boolean=false;
function OnGUI(){
	
}