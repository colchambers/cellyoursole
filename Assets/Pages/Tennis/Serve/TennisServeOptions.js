#pragma strict
import System.Reflection;

class TennisServeOptions extends Options {

	var elementAllEnabled: boolean = true;
	var elementSwitches: Dictionary.<String, iGUISwitch>;
	
	var playerData: String;
	var scenarioModal: TennisScenarioModal;
	var serveModal: TennisServeModal;
	var e: Errors;
	var score: int = 0;
	var ballsLeft: int = 10;
	
	var targetPositions: Dictionary.<int, Vector3>;

	static var ELEMENTS_SWITCH_ALL_ID = 'all';

	function TennisServeOptions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisServeOptions(){
		super();
		hasBackground = true;
	}
	
	function init(){
		super();
		e = new Errors();
		
		initialiseToggle();
		initialiseSceneItems();
		initialiseScenarioItems();
		initialiseModes();
		initialiseTargets();
		initialiseScore();
		
		
		// Load Default Scenario
		//loadScenario(1);
		call('recordBallStrike');
	}
	
	function initialiseToggle(){
		// Add mode button
		var r: iGUIRoot = mainPresenter.panel.getContainer("root");
		var button: iGUIButton = addPageButton(this.id, 'O', 'instructionsButton', r);
		button.setX(0.13);
		button.setY(0);
		button.setWidth(0.11);
		button.clickCallback = mainPresenter.mvpToggle_Click;
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
	
	function initialiseScenarioItems(){
		scenarioModal = new TennisScenarioModal();
		mainPresenter.addModal('tennisScenarios', scenarioModal);
	}
	
	function initialiseModes(){
		// Add mode button
		var r: iGUIRoot = mainPresenter.panel.getContainer("root");
		var button: iGUIButton = addPageButton(MVP.MODE_EDIT, 'E', 'instructionsButton', r);
		button.setX(0.26);
		button.setY(0);
		button.setWidth(0.11);
		button.clickCallback = toggleMode_Click;
	}
	
	function initialiseTargets(){
		// Add all scene items to be used in the page. 
		/*
		var objects = getTargets();
		for(var o in objects){
			addSceneItem(o.name, o);
		}*/
		// Load target prefab
		var targetPath = "Serve/Target";
		var target: GameObject = Resources.Load(targetPath);
		
		// Create target vectors
		targetPositions = new Dictionary.<int, Vector3>();
		var count: int = 0;
		targetPositions.Add(count++, Vector3(-1.632681, 0.02635913, -1.904958));
		targetPositions.Add(count++, Vector3(-1.975818, 0.3824429, -2.229524));
		targetPositions.Add(count++, Vector3(-0.910772, 0.03935509, -1.777087));
		targetPositions.Add(count++, Vector3(-1.503947, 0.04959234, -0.9535093));
		targetPositions.Add(count++, Vector3(-0.9535093, 0.5405222, -2.943056));
		targetPositions.Add(count++, Vector3(-1.352175, 0.02112953, -2.103843));
		targetPositions.Add(count++, Vector3(-0.3632056, 0.351516, -2.802535));
		targetPositions.Add(count++, Vector3(-0.3409879, 0.03197211, -1.595707));
		targetPositions.Add(count++, Vector3(-1.595707, 0.3824429, -2.906593));
		targetPositions.Add(count++, Vector3(-0.544165, 0.02718322, -2.087848));
		targetPositions.Add(count++, Vector3(-0.8513129, 0.03559705, -0.9050522));
		
		var targetClone : GameObject;
		var script: TennisServeTarget;
		for (var o in targetPositions) {
			targetClone = GameObject.Instantiate(target, o.Value, Quaternion.identity);
			targetClone.name += " "+o.Key;
			targetClone.tag = 'Target';
			script = targetClone.GetComponent(TennisServeTarget);
			script.sceneOptions = this;
			
		}
		
	}
	
	function initialiseScore(){
		score = 0;
		recordHit();
	}
	
	function recordHit(){
		score++;
	}
	
	function recordBallStrike(){
		ballsLeft--;
	}
	
	function getPlayers () {
		return GameObject.FindGameObjectsWithTag('Player');
	}
	
	function getBalls () {
		return GameObject.FindGameObjectsWithTag('ball');
	}
	
	function getTargets () {
		return GameObject.FindGameObjectsWithTag('Target');
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateMenu(){
		var menu: iGUIWindow = panel.getContainer('menu');
		menu.label.text = "Options";
		menu.setWidth(0.5);
		menu.setHeight(1);
		menu.setX(1.0);
		menu.setY(1.0);
		
		reset();
	
		// Create buttons.
		var button: iGUIButton;
		
		button = addPageButton('1', 'Continue Serving');
		button.clickCallback = backToScene_Click;
		
		button = addPageButton('menu', 'Main Menu');
		
		button = addPageButton('1', 'Position Zones');
		button.clickCallback = positionZones_Click;
		
		addPageNavigationButton('views', 'Views');
		addPageNavigationButton('elements', 'Elements');
		addPageNavigationButton('scenarios', 'Scenarios');
		
		// Disable bakground scene
		setBackgroundEnabled(true);
	}
	
	function loadPage(id: String){
		switch (id) {
			case 'optionsMenu':
				populateMenu();
				break;
			case 'views':
				populateViews();
				break;
			case 'elements':
				populateElements();
				break;
			case 'scenarios':
				populateScenarios();
				break;
			case 'updateScenario':
				var item = scenarioModal.getCurrentItem();
				updateScenario(item.id);
				break;
		}
		super(id);
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

	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateScenarios(){
		setBackgroundEnabled(true);
		prepareSubPage();
		
		var text="";
		var item: TennisScenarioItem;
		
		text ="Load any scenario below into this scene";
		addPageText(text, 0.5);
		
		var button : iGUIButton;
		button = addPageButton('0', 'New Scenario');
		button.clickCallback = updateScenario_Click;
		
		//button = addPageButton('0', 'New Screenshot');
		//button.clickCallback = createScreenshot_Click;
		
		var row: iGUIListBox;
		var color: Color;
		var currentItem = scenarioModal.getCurrentItem();
		// Loop through and display scenarios
		for(item in scenarioModal.items.Values){
			color = currentItem.id == item.id?Color.red:Color.white;
	    	row = addPageListBox(list);
	    	row.setWidth(1);
	    	row.setHeight(0.17);
	    	row.direction = iGUIListDirection.LeftToRight;
	    	
	    	button = addPageButton(item.id.ToString(), item.getField('name'), 'instructionsButton', row);
	    	button.clickCallback = loadScenario_Click;
	    	button.setWidth(0.7);
	    	button.labelColor = color;
	    	
	    	button = addPageButton(item.id.ToString(), 'U', 'instructionsButton', row);
	    	button.setWidth(0.1);
	    	button.clickCallback = updateScenario_Click;
	    	button.labelColor = color;
	    	
	    	button = addPageButton(item.id.ToString(), 'X', 'instructionsButton', row);
	    	button.setWidth(0.1);
	    	button.labelColor = color;
	    	button.clickCallback = deleteScenario_Click;
		}
	}
	
	function updateScenario(id: int){
		setBackgroundEnabled(false);
		prepareSubPage('scenarios');
		
		var item = getScenario(id);
		var textField: iGUITextfield;
		textField = addPageTextField('Name', item.getField('name'), 0.12, list);
		panel.addField('name', textField);
		var button : iGUIButton;
		button = addPageButton(item.id.ToString(), 'Save');
    	button.clickCallback = saveScenario_Click;
    	button.setWidth(0.7);
	}
	
	function saveScenario(id: int){
		var item = scenarioModal.getItemById(id);
		scenarioModal.saveItem(item);
	}
	
	function deleteScenario(id: int){
		scenarioModal.deleteItem(id);
		loadPage('scenarios');
	}
	
	function createScreenshot(id: int){
		var rootPanel: iGUIElement = panel.rootPanel;
		var panelId: int = mainPresenter.getPanelIdFromPanel(rootPanel);
		mainPresenter.disablePanel(panelId);
		scenarioModal.createScreenshot(id);
		
		/*
		 * Screenshot is rendered at end of frame. Can't hide, then 
		 * show GUI. Add a 'finished' button instead to show GUI.
		 */
		// Add 'finished' button
		var r: iGUIRoot = mainPresenter.panel.getContainer("root");
		var button: iGUIButton = addPageButton(panelId.ToString(), 'X', 'instructionsButton', r);
		button.setX(0.39);
		button.setY(0);
		button.setWidth(0.11);
		button.clickCallback = finishedScreenshot_Click;
		
		panel.addButton('finishedScreenshot', button);
	}
	
	function finishedScreenshot_Click(caller : iGUIButton){
		mainPresenter.enablePanel(int.Parse(caller.userData));
		
		// remove 'finished button;
		var buttonId = 'finishedScreenshot';
		var button: iGUIButton = panel.getButton(buttonId);
		var r: iGUIRoot = mainPresenter.panel.getContainer("root");
		r.removeElement(button);
		panel.removeButton(buttonId);
	}
		
	function updateElementSwitches(){
		// All switch
		var s: iGUISwitch = elementSwitches[ELEMENTS_SWITCH_ALL_ID];
			s.setValue(elementAllEnabled);
		var items = getSceneItems();	
		for (var item in items.Values) {
			var o = item.item;
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
	
	/*
	 * Scenarios
	 */
	function addPageScenarioLoadButton (id: String, t: String) {
		var b: iGUIButton = addPageButton (id, t, 'instructionsButton');
		b.clickCallback = loadScenario_Click;
		return b;
	}
	
	function loadScenario_Click(caller : iGUIButton){
		loadScenario(int.Parse(caller.userData));
		loadPage('scenarios');
	}
	
	function loadScenario(id:int){
		var item = getScenario(id);
		scenarioModal.setCurrentItem(item);
		JSONLevelSerializer.LoadNow(item.getField('data'), true, true, loadScenario_Complete);
	}
	
	function loadScenario_Complete(){
		Debug.Log('Load scenario complete.');
		refreshScenario();
	}
	
	function refreshScenario(){
	
		var items = getSceneItems();
		var sc: SphereCollider;
		var cc: CapsuleCollider;
		for(var item in items.Values){
		
			// Adjust the ball colllider
			if(item.id == 'ball'){
				sc = item.item.collider;
				sc.radius = 8.0;
			}
			
			if(item.item.tag == 'Player'){
				cc = item.item.collider;
				cc.radius = 1.0;
				cc.height = 3.0;
			}
			
			
		}
	}
	
	function updateScenario_Click(caller : iGUIButton){
		updateScenario(int.Parse(caller.userData));
	}
	
	function createScreenshot_Click(caller : iGUIButton){
		createScreenshot(int.Parse(caller.userData));
	}
	
	function deleteScenario_Click(caller : iGUIButton){
		deleteScenario(int.Parse(caller.userData));
	}
		
	function saveScenario_Click(caller : iGUIButton){
		var id: int = int.Parse(caller.userData);
		validateScenario(id);
		if(e.hasErrors()){
			displayErrors();
			return;
		}
		e.clearErrors();
		var item:TennisScenarioItem = getScenario(id);
		var f: String = 'name';
		var name: iGUITextfield = panel.getField(f);
		item.setField(f, name.value);
		
		// If it's the loaded scenario save layout data
		Debug.Log('id = '+id);
		
		var currentItem = scenarioModal.getCurrentItem();
		Debug.Log('currentItem = '+currentItem);
		if(!item.getField('data') || id == currentItem.id){
			item.setField('data', JSONLevelSerializer.SerializeLevel());
		}
		saveScenario(id);
		
		loadPage('scenarios');
	}
		
	function getScenario(id:int){
		return scenarioModal.getItemById(id);
	}
	
	function populateField(f: iGUIElement, t: TennisScenarioItem, fn: String, ft: String){
		f.userData = new UserData(t.id, fn, "tennisScenario", ft);
		
		var fv = t.getField(fn);
		v.setElementValue(f, fv.ToString());
		var u: UserData = f.userData;
		switch(u.fieldType){
			case "text":
				var tf: iGUITextfield = f;
				tf.blurCallback = form_field_blur;
				tf.focusCallback = form_field_focus;
				break;
			case "textarea":
				var ta: iGUITextarea = f;
				ta.blurCallback = form_field_blur;
				ta.focusCallback = form_field_focus;
				break;
			case "number":
				var nf: iGUINumberField = f;
				nf.blurCallback = form_field_blur;
				nf.focusCallback = form_field_focus;
				break;
		}
		
	}
	
	function form_field_blur(caller: iGUIElement){
		var u: UserData = caller.userData;
		var fv = getView().getElementValue(caller);
		u.value = fv;
		scenarioUpdateHandler(u);
	}
	
	function form_field_value_change_dropdownlist(caller: iGUIElement){
		var field: iGUIDropDownList = caller;
		var userData: UserData = field.userData;
		userData.value = field.options[field.selectedIndex].text;
		scenarioUpdateHandler(userData);
	}
	
	function scenarioUpdateHandler(ud: UserData){
		var item = scenarioModal.items[ud.id];
		item.setField(ud.field, ud.value);
	}
	
	function form_field_focus(caller : iGUIElement){
		var mainView = getView();
		var fv = mainView.getElementValue(caller);
		mainView.openTouchKeyboard(fv.ToString());
	}
	
	function form_Done_Click(caller : iGUIButton){
		validateScenario(caller.userData);
		if(e.hasErrors()){
			displayErrors();
			return;
		}
		e.clearErrors();
	
		saveScenarioAndDisplayList();
	}
	
	function saveScenarioAndDisplayList(){
		scenarioModal.save();
		//tasksList_Init(tasksList);
		//v.enablePanel(v.panelIds[3]);
	}
	
	
	function validateScenario(id){
		var ok = true;
		var scenario: TennisScenarioItem = scenarioModal.getItemById(id);
		var nameField: iGUITextfield = panel.getField("name");
		Debug.Log('nameField.value = '+nameField.value);
		/*
		e.window.label.text = "Notifications";
		if(!nameField.value){
			ok = false;
			e.addError(nameField.variableName, "Name field cannot be empty");
		}
		
		var nameMaxLength: int = 24;
		if(nameField.value && nameField.value.Length>nameMaxLength){
			ok = false;
			e.addError(nameField.variableName, "Name field cannot be longer than "+nameMaxLength+" characters.");
		}*/
		
		return ok;
	}
	
	var instruction: boolean=false;
	function OnGUI(){
		GUI.Label (Rect (10,50,150,100), "Targets hit: "+score+"\nBalls left: "+ballsLeft) ;
		
		var title="Shoot the target!!";
		GUI.Label(Rect(10, 40, 500, 40), title);
		
		var instructionsRect = Rect(10, 85, 130, 35);
		if(!instruction){
			if(GUI.Button(instructionsRect, "Instruction On")){
				instruction=true;
			}
		}
		else{
			if(GUI.Button(instructionsRect, "Instruction Off")){
				instruction=false;
			}
			
			GUI.Box(Rect(10, 100, 300, 65), "");
			
			GUI.Label(Rect(15, 115, 290, 65), "tap on screen to set the aim\nhold down 2 fingers on screen to charge up a fire\nright click to simulate 2 fingers charge");
		}
	}
	
	function displayErrors(){
		getView().enablePanel(getView().panelIds[8], false);
		var text: String = "";
		var errors: Dictionary.<String, String> = e.getErrors();
		for(error in errors.Values){
			text += error+"\n";
		}
		e.textarea.setValue(text);
		e.clearErrors();
	}
	
	function hideErrors(){
		getView().disablePanel(getView().panelIds[8], false);
		e.textarea.setValue("");
	}
	
	function prepareErrorElements(){
		e.close.clickCallback = hideErrors;
	}
	
	function getView(){
		return mainPresenter.p.getView('main');
	}
	
	function toggleMode_Click(caller : iGUIButton){
		var t: String;

		setMode(caller.userData);
		if(mode == MVP.MODE_STANDARD){
			t = 'E';
			caller.userData = MVP.MODE_EDIT;
		}
		else {
			caller.userData = MVP.MODE_STANDARD;
			t = 'S';

		}

		caller.label.text = t;
	}
	
	function call(m: String){
		
		switch(m){
			case "recordBallStrike":
				recordBallStrike();
				return;
				break;
				
		}
		/*
		// Couldn't quite get the reflection working.
		var f: MethodInfo = this.GetType().GetMethod(m);//:MethodInfo
		Debug.Log(f);
		*/
		
		/*if(f){
			f.Invoke(f, 1);
		}*/
		Debug.Log('Unable to find method: '+m);
	}
}