#pragma strict

static var myLog : String ;
static var myLogQueue = new Queue();
public var output : String = "";
public var stack : String = "";
private var hidden : boolean = true;
private var scrollPos : Vector2;
public var maxLines : int = 30;

function OnEnable()
{
Application.RegisterLogCallback(HandleLog);
}

function OnDisable()
{
Application.RegisterLogCallback(null);
}

function Start(){
	myLog = String.Empty;
}

function HandleLog(logString: String, stackTrace : String, type : LogType )
{
	output = logString;
	stack = stackTrace;
	var newString : String = "\n [" + type + "] : " + output;
	myLogQueue.Enqueue(newString);
	if (type == LogType.Exception){
		newString = "\n" + stackTrace;
		myLogQueue.Enqueue(newString);
	}
	
	while (myLogQueue.Count > maxLines){
		myLogQueue.Dequeue();
	}
	
	myLog = String.Empty;
	for (var s in myLogQueue){
		myLog += s;
	}
}



function OnGUI(){

	var height: int = 100;
	if (!hidden){
		myLog= GUI.TextArea(Rect(0, 0, Screen.width / 3, Screen.height), myLog);
		
		if (GUI.Button(Rect(Screen.width - 100, height, 80, 20), "Hide")){
			hide(true);
		}
	}
	else
	{
		if (GUI.Button(Rect(Screen.width - 100, height, 80, 20), "Show")){
			hide(false);
		}
	}
}

function hide(shouldHide : boolean ){
	hidden = shouldHide;
}