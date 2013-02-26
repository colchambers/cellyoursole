#pragma strict

class TennisItems extends Options {

	var go: GameObject;
	function TennisItems(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisItems(){
		super();
		hasBackground = true;
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateMenu(){

		var mvp = mainPresenter.getMVP('tennisOptions');
		var sceneItem = mvp.getSceneItem(m.getCurrentMaxIdName());
		go = sceneItem.item;
		var title = go.name ? go.name: "Options";
		
		setTitle(title);
		
		reset();
	
		// Create buttons.
		var button: iGUIButton;
		
		button = list.addElement("iGUIButton");
    	button.setWidth(1);
		button.label.text = 'Back to scene';
		button.clickCallback = backToScene_Click;
		
		addPageSwitch(go.name, 'Show/Hide', handleItemToggle_change);
		
		var light: Light = go.GetComponentInChildren(Light);
		if(light){
			addPageSwitch(go.name, 'Light On/Off', handleLightSwitch_change);
		}
		var camera: Camera = go.GetComponentInChildren(Camera);
		if(camera){
			addPageViewButton(go.name, 'Change View');
		}
		
		// Disable bakground scene
		//setBackgroundEnabled(false);
		
	}
	
	function loadPage(id: String){
		switch (id) {
			case 'menu':
				populateMenu();
				break;
			case 'views':
				populateViews();
				break;
		}
	}

	function backToScene_Click(caller : iGUIButton){
		mainPresenter.disablePanel(11);
		setBackgroundEnabled(true);
	}
	
	function handleItemToggle_change (caller: iGUISwitch) {
		go.SetActiveRecursively(!go.active);
		
	}
	
	function handleLightSwitch_change (caller: iGUISwitch) {
		var light: Light = go.GetComponentInChildren(Light);
		light.enabled = !light.enabled;
	}
	
	function addPageViewButton (id: String, t: String) {
		var b: iGUIButton = addPageButton (id, t, 'instructionsButton');
		b.clickCallback = setView_click;
		return b;
	}
	
	function setView_click (caller: iGUIButton) {
		var c: Camera = go.GetComponentInChildren(Camera);
		var si :SceneInteraction = getScript('sceneInteraction');
		si.currentCamera.enabled = false;
		si.currentCamera = c;
		si.dist = c.transform.localPosition.z;
		si.currentCamera.enabled = true;
	}
}