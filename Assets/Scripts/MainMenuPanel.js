#pragma strict
import System.Collections.Generic;

class MainMenuPanel extends ModalPanel {

	function init(){
		// Enable main navigation panel
		rootPanel.setEnabled(true);
	
		var clickCallbacks: Dictionary.<String, iGUIEventCallback> = new Dictionary.<String, iGUIEventCallback>();
		clickCallbacks.Add('toggle', toggle_Click);
		clickCallbacks.Add('home', home_Click);
		clickCallbacks.Add('myDay', myDay_Click);
		clickCallbacks.Add('calendar', calendar_Click);
		var button: iGUIButton;
		for(key in buttons.Keys){
			button = getButton(key);
			
			// button specific logic
			switch (key) {
				case "toggle":
					button.userData = false;
					toggleButtons(button.userData);
					break;
			}
			
			if(clickCallbacks.ContainsKey(key)){
				button.clickCallback = clickCallbacks[key];
			}
		}
	}

	function display(){
		
	}
	
	function toggleButtons(enable: boolean){
		
		var button: iGUIButton;
		for(key in buttons.Keys){
			button = getButton(key);
			if(key == "toggle"){
				button.userData = !button.userData;
				var label: String = enable? '<': '>';
				button.label = GUIContent(label);
				continue;
			}	
			
			button.setEnabled(enable);
		}
		
		
	}
	
	function toggle_Click(caller : iGUIButton){
		toggleButtons(caller.userData);
	}
	
	function home_Click(caller : iGUIButton){
		var v = presenter.getView('task');
		v.enablePanel(v.panelIds[0]);
	}
	
	function myDay_Click(caller : iGUIButton){
		var mvp: MyDay = presenter.getMVP('myDay');
		mvp.presentCurrentDay();
	}
	
	function calendar_Click(caller : iGUIButton){
		var mvp: Calendar = presenter.getMVP('calendar');
		mvp.presentCalendar();
	}
}