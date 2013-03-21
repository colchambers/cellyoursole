using UnityEngine;
using System.Collections;

public class TennisServe : MonoBehaviour {

	public GUITexture crosshair;
	
	public Transform turret;
	private Vector2 turretPos; //turret's screen position
	
	//the minimum and maximum elevation of the turret
	public float minElevation=10;
	public float maxElevation=80;
	
	public GUITexture bar;
	
	public float maxForce=200; //maximum force, used when the charge is released at maximum
	public GameObject bullet;
	public int angleAdjustment=100;
	public int crosshairAdjustmentX=-35;
	public int crosshairAdjustmentY=-35;
	public float racquetRotationY = 1.6f;
	
	// Use this for initialization
	void Start () {
		//initiate the turret position on screen
		turretPos = Camera.main.WorldToScreenPoint(turret.position);
		
		//fake a tap event to initiate the turret rotation and cursor
		Tap tap=new Tap(new Vector2(Screen.width/1.9f, Screen.height/2));
		OnTap(tap);
	}
	
	void OnEnable(){
		Gesture.onMultiTapE += OnTap;
		
		Gesture.onChargingE += OnCharging;
		Gesture.onChargeEndE += OnChargeEnd;
		
		Gesture.onMFChargingE += OnMFCharging;
		Gesture.onMFChargeEndE += OnMFChargeEnd;
	}
	
	void OnDisable(){
		Gesture.onMultiTapE -= OnTap;
		
		Gesture.onChargingE -= OnCharging;
		Gesture.onChargeEndE -= OnChargeEnd;
		
		Gesture.onMFChargingE -= OnMFCharging;
		Gesture.onMFChargeEndE -= OnMFChargeEnd;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	//called when a tap is detected
	void OnTap(Tap tap){
		//if the tap is triggered by mouse, we want only left mouse button
		if(tap.isMouse && tap.index!=0) {
			return;
		}
		
		Ray ray = Camera.main.ScreenPointToRay(tap.pos);
		RaycastHit hit;
		//use raycast at the cursor position to detect the object
		if(Physics.Raycast(ray, out hit, 10000)){
			Vector3 p = hit.point;
			p.y += racquetRotationY;
			turret.LookAt(p);
		}
		//crosshair default pixel inset is (-35, -35, 70, 70) and it's transform is positioned at (0, 0, 0)
		crosshair.pixelInset=new Rect(tap.pos.x+crosshairAdjustmentX, tap.pos.y+crosshairAdjustmentY, 70, 70);
		
	}
	
	//triggered when mouse/single-finger charging event is on-going
	//this is just to simulate 2-fingers charge event using right-mouse-click
	void OnCharging(ChargedInfo cInfo){
		if(cInfo.isMouse){
			if(cInfo.index==1){
				//if this is triggered by right-mouse-button, modified the fingerCount and call OnMFCharging with the same chargeInfo
				cInfo.fingerCount=2;
				OnMFCharging(cInfo);
			}
		}
	}
	
	//triggered when mouse/single-finger charging event is ended
	void OnChargeEnd(ChargedInfo cInfo){
		if(cInfo.isMouse){
			if(cInfo.index==1){
				//if this is triggered by right-mouse-button, modified the fingerCount and call OnMFChargeEnd with the same chargeInfo
				cInfo.fingerCount=2;
				OnMFChargeEnd(cInfo);
			}
		}
	}
	
	//triggered when a multiple finger charge event is on-going
	void OnMFCharging(ChargedInfo cInfo){
		if(cInfo.fingerCount==2){
			//adjust the length of the indicator bar accordingly to the percent
			bar.pixelInset=new Rect(bar.pixelInset.x, bar.pixelInset.y, cInfo.percent*150, bar.pixelInset.height);
			//adjust the color on the bar
			bar.color=new Color(cInfo.percent, 1-cInfo.percent, 0);
		}
	}
	
	//triggered when a multiple finger charge event has ended
	void OnMFChargeEnd(ChargedInfo cInfo){
		if(cInfo.fingerCount==2){
			//reset the bullet
			//adjust the position os it's at the tip of the barrel
			bullet.transform.position=turret.TransformPoint(new Vector3(0, 0, 1.0f));
			//match the bullet rotation to turret's, so that when force is applied, the bullet head in the right direction
			bullet.transform.rotation=turret.rotation;
			//cancel current force on bullet
			bullet.rigidbody.velocity=Vector3.zero;
			
			//shoot the bullet based on the charged percent
			bullet.rigidbody.AddForce(cInfo.percent*maxForce*bullet.transform.forward);
			
			//clear the charge indicator bar
			bar.pixelInset=new Rect(bar.pixelInset.x, bar.pixelInset.y, 0, bar.pixelInset.height);
		}
	}
	
	
	private bool instruction=false;
	void OnGUI(){
		string title="Shoot the target!!";
		GUI.Label(new Rect(150, 15, 500, 40), title);
		
		if(!instruction){
			if(GUI.Button(new Rect(10, 55, 130, 35), "Instruction On")){
				instruction=true;
			}
		}
		else{
			if(GUI.Button(new Rect(10, 55, 130, 35), "Instruction Off")){
				instruction=false;
			}
			
			GUI.Box(new Rect(10, 100, 300, 65), "");
			
			GUI.Label(new Rect(15, 105, 290, 65), "tap on on screen to set the aim\nhold down 2 fingers on screen to charge up a fire\nright click to simulate 2 fingers charge");
		}
	}
	
}






