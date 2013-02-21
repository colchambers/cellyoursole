#pragma strict

class Options extends MVP {

	function Options(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function Options(){
		super();
	}
	
	function display() {
		populateMenu();
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateMenu(){

		var menu: iGUIWindow = panel.getContainer('menu');
		menu.label.text = "Options";
		
		var list: iGUIListBox = panel.getContainer('list');
		list.removeAll();
	
		// Create buttons.
		var button: iGUIButton;
		
		button = list.addElement("iGUIButton");
    	button.setWidth(1);
		button.label.text = 'Back to scene';
		button.clickCallback = backToScene_Click;
		
		addPageNavigationButton('lights', 'Lights');
		addPageNavigationButton('views', 'Views');
		
		// Disable bakground scene
		setBackgroundEnabled(false);
		
	}
	
	function loadPage(id: String){
		switch (id) {
			case 'menu':
				populateMenu();
				break;
			case 'lights':
				populateLights();
				break;
			case 'views':
				populateViews();
				break;
		}
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateLights(){
	
		setBackgroundEnabled(true);
		prepareSubPage();
		
		var text="";
		
		text ="Using this resource you can organise a room and explore how your ";
		text+="changes affect its accessibility. \n";
		text+="You can move most furniture and lights by dragging them.\n";
		text+="To drag an item select it with your finger or mouse and drag it.\n";
		text+="You can see the impact of turning lights on and off using the lights menu.";
			
		addPageText(text, 0.5);
		
		var lights: Dictionary.<String, String> = new Dictionary.<String, String>();
		lights.Add('Bathroom Light', 'Bathroom');
		lights.Add('Foyer Light', 'Foyer');
		lights.Add('Kitchen Light', 'Kitchen');
		lights.Add('Table Light', 'Table');
		lights.Add('Living Room Light', 'Living Room');
		
		var lightSwitches: Dictionary.<String, iGUISwitch> = new Dictionary.<String, iGUISwitch>();
		for (var o in lights) {
			lightSwitches.Add( o.Key,
			addPageSwitch(o.Key, o.Value, handleLightSwitch_change));
		}

		var objects = getLights();
		for (var o in objects) {
			var s: iGUISwitch = lightSwitches[o.name];
			var light: Light = o.GetComponent(Light);
			s.setValue(light.enabled);
			
		}		
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateViews(){
	
		setBackgroundEnabled(true);
		prepareSubPage();
		
		var text="";
		
		text ="You can view this scene from many viewpoints.";
		text+="Select different view points from the list below.\n";
			
		addPageText(text, 0.5);
		
		addPageViewButton('Main Camera', 'Default');
		addPageViewButton('Walking Camera', 'First Person');
		addPageViewButton('Walking Camera 2', 'First Person 2');
		addPageViewButton('Top Camera', 'Top');
		
	}
	
	function addPageViewButton (id: String, t: String) {
		var b: iGUIButton = addPageButton (id, t, 'instructionsButton');
		b.clickCallback = setView_click;
		return b;
	}
	
	function backToScene_Click(caller : iGUIButton){
		mainPresenter.disablePanel(11);
		setBackgroundEnabled(true);
	}
	
	function positionZones_Click(caller : iGUIButton){
		var positionZone = GameObject.Find('Position Zone');
		Debug.Log(positionZone);
		positionZone.GetComponent(MeshCollider).enabled = true;
		positionZone.GetComponent(MeshRenderer).enabled = true;
		
	}
	
	function getLights () {
		return GameObject.FindGameObjectsWithTag('light');
	}
	
	function handleLightSwitch_change (caller: iGUISwitch) {
		var objects = getLights();
		for (var o in objects) {
			if(o.name != caller.userData){
				continue;
			}
			var light: Light = o.GetComponent(Light);
			light.enabled = !light.enabled;
			return;
			
		}
		
	}
	
	function setView_click (caller: iGUIButton) {
		var c: Camera = GameObject.Find(caller.userData).GetComponent(Camera);;
		var si :SceneInteraction = getScript('sceneInteraction');
		si.currentCamera.enabled = false;
		si.currentCamera = c;
		si.dist = c.transform.localPosition.z;
		si.currentCamera.enabled = true;
	}
	
}