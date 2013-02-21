#pragma strict

class UnitySerializerTests extends Options {

	var elementAllEnabled: boolean = true;
	var elementSwitches: Dictionary.<String, iGUISwitch>;

	static var ELEMENTS_SWITCH_ALL_ID = 'all';

	function UnitySerializerTests(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function UnitySerializerTests(){
		super();
		hasBackground = true;
	}
	
	function init(){
		super();
		initialiseSceneItems();
	}
	
	function initialiseSceneItems(){
		// Add all scene items to be used in the page. 
		var objects = getPlayers();
		for(var o in objects){
			addSceneItem(o.name, o);
		}
		
		objects = getBalls();
		for(var o in objects){
			addSceneItem(o.name, o);
		}
	}
	
	function getPlayers () {
		return GameObject.FindGameObjectsWithTag('Player');
	}
	
	function getBalls () {
		return GameObject.FindGameObjectsWithTag('ball');
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
		
		button = list.addElement("iGUIButton");
    	button.setWidth(1);
		button.label.text = 'Position Zones';
		button.clickCallback = positionZones_Click;
		
		addPageNavigationButton('views', 'Views');
		addPageNavigationButton('elements', 'Elements');
		
		// Disable bakground scene
		setBackgroundEnabled(false);
		
	}
	
	function loadPage(id: String){
		switch (id) {
			case 'menu':
				populateMenu();
				break;
			case 'views':
				populateViews();
				break;
			case 'elements':
				populateElements();
				break;
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
		
		addPageViewButton('Player 1 Camera', 'Player 1');
		addPageViewButton('Player 2 Camera', 'Player 2');
		addPageViewButton('Player 3 Camera', 'Player 3');
		addPageViewButton('Player 4 Camera', 'Player 4');
		addPageViewButton('Ball Camera', 'Ball');
		
		addPageViewButton('Walking Camera', 'First Person');
		addPageViewButton('Walking Camera 2', 'First Person 2');
		addPageViewButton('Top Camera', 'Top');
		
		
	}
	
	/**
	 * Populate the element menu 
	 * @return void
	 */
	function populateElements(){
	
		prepareSubPage();
		setBackgroundEnabled(true);
		
		var text="";
		
		text ="Using this resource you can organise a tennis court and explore how your ";
		text+="changes affect its accessibility. \n";
		text+="You can move most elements by dragging them.\n";
		text+="To drag an item select it with your finger or mouse and drag it.\n";
			
		addPageText(text, 0.5);
		
		var elements: Dictionary.<String, String> = new Dictionary.<String, String>();
		
		// All
		elements.Add(ELEMENTS_SWITCH_ALL_ID, 'All');
		
		// Dynamic Objects
		elements.Add('Player 1', 'Player 1');
		elements.Add('Player 2', 'Player 2');
		elements.Add('Player 3', 'Player 3');
		elements.Add('Player 4', 'Player 4');
		elements.Add('ball', 'Ball');

		
		elementSwitches = new Dictionary.<String, iGUISwitch>();
		for (var o in elements) {
			elementSwitches.Add( o.Key,
			addPageSwitch(o.Key, o.Value, handleElementSwitch_change));
		}

		updateElementSwitches();	
	}
	
	function updateElementSwitches(){

		// All switch
		var s: iGUISwitch = elementSwitches[ELEMENTS_SWITCH_ALL_ID];
			s.setValue(elementAllEnabled);
		var items = getSceneItems();	
		for (var item in items.Values) {
			var o = item.item;
			Debug.Log(o);
			s = elementSwitches[o.name];
			s.setValue(o.active);
			
		}	
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
	
	function setView_click (caller: iGUIButton) {
		var c: Camera = GameObject.Find(caller.userData).GetComponent(Camera);;
		var si :SceneInteraction = getScript('sceneInteraction');
		si.currentCamera.enabled = false;
		si.currentCamera = c;
		si.dist = c.transform.localPosition.z;
		si.currentCamera.enabled = true;
	}
	
	function handleElementSwitch_change (caller: iGUISwitch) {
	
		if(caller.userData == 'all'){
			elementAllEnabled = !elementAllEnabled;
			var items = getSceneItems();	
			for (var item in items.Values) {
				var o = item.item;
				toggleObjectActive(o.name);
			}
			updateElementSwitches();
			return;
		}
		
		toggleObjectActive(caller.userData);
	}
	
	function toggleObjectActive(id){
		var items = getSceneItems();	
		for (var item in items.Values) {
			var o = item.item;
			if(o.name != id){
				continue;
			}
			o.SetActiveRecursively(!o.active);
			return;
		}
	}
	
}