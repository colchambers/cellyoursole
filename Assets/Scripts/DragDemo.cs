using UnityEngine;
using System.Collections;

public class DragDemo : MonoBehaviour {

	public Transform dragObj1;
	public TextMesh dragTextMesh1;
	
	public Transform dragObj2;
	public TextMesh dragTextMesh2;
	public float dragAdjustment = 10.0f;
	
	
	// Use this for initialization
	void Start () {
		
	}
	
	void OnEnable(){
	
		Gesture.onDraggingStartE += OnDraggingStart;
		Gesture.onDraggingE += OnDragging;
		Gesture.onDraggingEndE += OnDraggingEnd;
	}
	
	void OnDisable(){
		Gesture.onDraggingStartE -= OnDraggingStart;
		Gesture.onDraggingE -= OnDragging;
		Gesture.onDraggingEndE -= OnDraggingEnd;
	}
	
	
	void Update(){
		//Debug.Log(currentDragIndex1+"   "+dragObj1);
	}
	
	private int currentDragIndex1=-1;
	private int currentDragIndex2=-1;
	void OnDraggingStart(DragInfo dragInfo){
		DebugDragInfo(dragInfo, "OnDraggingStart = ");
		Ray ray = Camera.main.ScreenPointToRay(dragInfo.pos);
		RaycastHit hit;
		//use raycast at the cursor position to detect the object
		if(Physics.Raycast(ray, out hit, Mathf.Infinity)){
			//if the drag started on dragObj1
			if(hit.collider.transform==dragObj1){
				//change the scale of dragObj1, give the user some visual feedback
				dragObj1.localScale*=1.1f;
				//latch dragObj1 to the cursor, based on the index
				Obj1ToCursor(dragInfo);
				currentDragIndex1=dragInfo.index;
			}
		}
	}
	
	//triggered on a single-finger/mouse dragging event is on-going
	void OnDragging(DragInfo dragInfo){
		//if the dragInfo index matches dragIndex1, call function to position dragObj1 accordingly
		if(dragInfo.index==currentDragIndex1){
			Obj1ToCursor(dragInfo);
		}
	}
	
	//assign dragObj1 to the dragInfo position, and display the appropriate tooltip
	void Obj1ToCursor(DragInfo dragInfo){
	
		//return;
		DebugDragInfo(dragInfo, "Obj1ToCursor = ");
		Debug.Log("dragObj1.position = "+dragObj1.position);
		
		dragObj1.position = new Vector3(dragObj1.position.x+(dragInfo.delta.x/dragAdjustment), 
										dragObj1.position.y, 
										dragObj1.position.z+(dragInfo.delta.y/dragAdjustment));
		
		if(dragInfo.isMouse){
			dragTextMesh1.text="Dragging with mouse"+(dragInfo.index+1);
		}
		else{
			dragTextMesh1.text="Dragging with finger"+(dragInfo.index+1);
		}
	}
		
	void OnDraggingEnd(DragInfo dragInfo){

		//drop the dragObj being drag by this particular cursor
		if(dragInfo.index==currentDragIndex1){
			currentDragIndex1=-1;
			dragObj1.localScale*=10f/11f;
			
			dragTextMesh1.text="DragMe";
		}
	
	}
	
	private bool instruction=false;
	void OnGUI(){
		if(!instruction){
			if(GUI.Button(new Rect(10, 55, 130, 35), "Instruction On")){
				instruction=true;
			}
		}
		else{
			if(GUI.Button(new Rect(10, 55, 130, 35), "Instruction Off")){
				instruction=false;
			}
			
			GUI.Box(new Rect(10, 100, 200, 65), "");
			
			GUI.Label(new Rect(15, 105, 190, 65), "interact with each object using the interaction stated on top of each of them");
		}
	}
	
	void DebugDragInfo(DragInfo dragInfo, string s){
		Debug.Log(s+" Draginfo");
		Debug.Log("pos = "+dragInfo.pos);
		Debug.Log("delta = "+dragInfo.delta);
	}
	
}
