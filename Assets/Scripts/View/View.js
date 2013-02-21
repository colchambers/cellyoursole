#pragma strict
import iGUI;
import System.Collections.Generic;

class View {

	var panels : iGUIPanel[];
	var slidePanels: iGUISlidePanel[];
	var windows: iGUIWindow[];
	var panelIds : Dictionary.<int, String>;
	var styles: Dictionary.<String, GUIStyle>;
	var components: Dictionary.<String, Component>;
	
	function init(){
		// Set panel id configs for easy reference
		panelIds = new Dictionary.<int, String>();
		panelIds.Add(0, "mainMenu");
		panelIds.Add(1, "carDetails");
		panelIds.Add(2, "taskDetailsPanel");
		panelIds.Add(3, "tasksPanel");
		panelIds.Add(4, "taskActivity");
		panelIds.Add(5, "progressTrackerPanel");
		panelIds.Add(6, "progressTrackerItemPanel");
		panelIds.Add(7, "experiment");
		panelIds.Add(8, "errorsWindow");
		panelIds.Add(9, "activitiesByDay");
		panelIds.Add(10, "generalSettingsMenu");
		panelIds.Add(11, "menuPanel");
		panelIds.Add(12, "textWindow");
		
		styles = new Dictionary.<String, GUIStyle>();
		components = new Dictionary.<String, Component>();
		
	}
	/**
	 * Return the matching panel id key from the panelids dictionary where the value matches 
	 * the element variable name
	 * @param iGUIElement panel element
	 */
	function getPanelIdFromPanel(panel: iGUIElement){

		for(var pair in panelIds){
			if(pair.Value == panel.variableName){
				return pair.Key;
			}
		}
		
		return 0;
		
	}
	/**
	 * Helper method sets lists to directly save values to PlayerPrefs given variable name. Not suitable for list detail pages
	 */
	function prepareLists(){
		var lists : iGUIDropDownList[] = GameObject.FindObjectsOfType(iGUIDropDownList) as iGUIDropDownList[];
	    for (var list : iGUIDropDownList in lists) {
	        list.initCallback = elementInit;
	        list.listDeactivateCallback = listDeactivate;
	    }
	}
	
	/**
	 * Populate panels array
	 */
	function populatePanels(){
		panels = GameObject.FindObjectsOfType(iGUIPanel) as iGUIPanel[];
		slidePanels = GameObject.FindObjectsOfType(iGUISlidePanel) as iGUISlidePanel[];
		windows = GameObject.FindObjectsOfType(iGUIWindow) as iGUIWindow[];
	}
	/**
	 * Enable a panel disabling all others
	 * @param String id variable name of panel to enable
	 * @return boolean
	 */
	function enablePanel(id : String){
		return enablePanel(id, true);
	}
	
	/**
	 * Enable a panel. Disable all others if required
	 * @param String id variable name of panel to enable
	 * @return boolean
	 */
	function enablePanel(id : String, disableOthers: boolean){
	
		var enable : boolean;
		var enabled : boolean = false;
	
		for (var panel : iGUIPanel in panels) {
			if(setContainerEnabled(panel, id, disableOthers)){
				enabled = true;
			}
	    }	
	    
	    // slide panels
	    for (var panel : iGUISlidePanel in slidePanels) {
			if(setContainerEnabled(panel, id, disableOthers)){
				enabled = true;
			}
	    }
	    
	    // windows
	    for (var panel : iGUIWindow in windows) {
			if(setContainerEnabled(panel, id, disableOthers)){
				enabled = true;
			}
	    }
	
	    return enabled;
	}
	
	function setContainerEnabled(c: iGUIElement, id: String, disableOthers: boolean){
		var enable : boolean;
		var enabled : boolean = false;

		if(!panelIds.ContainsValue(c.variableName)){
			return enabled;
		}
		
		if(!disableOthers && c.variableName != id){
			return enabled;
		}	
		enable = c.variableName == id ? true:false;
       	c.setEnabled(enable);
        if(enable){
        	enabled = enable;
        }
        return enabled;
	}

	/**
	 * Disable a panel disabling all others
	 * @param String id variable name of panel to disable
	 * @return boolean
	 */
	function disablePanel(id : String){
		return disablePanel(id, true);
	}
	
	/**
	 * Disable a panel. Disable all others if required
	 * @param String id variable name of panel to disable
	 * @return boolean
	 */
	function disablePanel(id : String, disableOthers: boolean){
	
		var disable: boolean;
		var disabled : boolean = false;
	
		for (var panel : iGUIPanel in panels) {
			if(setContainerDisabled(panel, id, disableOthers)){
				disabled = true;
			}
	    }	
	    
	    // slide panels
	    for (var panel : iGUISlidePanel in slidePanels) {
			if(setContainerDisabled(panel, id, disableOthers)){
				disabled = true;
			}
	    }
	    
	    // windows
	    for (var panel : iGUIWindow in windows) {
			if(setContainerDisabled(panel, id, disableOthers)){
				disabled = true;
			}
	    }
	
	    return disabled;
	}
	
	function setContainerDisabled(c: iGUIElement, id: String, disableOthers: boolean){
		var disable : boolean;
		var disabled : boolean = false;

		if(!disableOthers && c.variableName != id){
			return disabled;
		}	
		//disable = c.variableName == id ? false:true;
       	c.setEnabled(disable);
        if(disable){
        	disabled = disable;
        }
        return disabled;
	}
	
	function listDeactivate(caller : iGUIDropDownList){
		PlayerPrefs.SetInt(caller.variableName, caller.selectedIndex);
	}
	
	function elementInit(caller : iGUIDropDownList){
		caller.selectedIndex = PlayerPrefs.GetInt(caller.variableName);
	}
	
	function displayMainMenu(){
		enablePanel(panelIds[0]);
	}
	
	function openTouchKeyboard(text: String){
		if(iGUI.iGUIRoot.isTouchDevice && hasTouchKeyboard()){
		 	iGUI.iGUIRoot.isiPhoneKeyboardActive = true;
			if(!iGUI.iGUIRoot.isiPhoneKeyboardActive){
				iGUI.iGUIRoot.openiPhoneKeyboard(text, true, true, false);
			}
	 	}
 	}
 	
 	function hasTouchKeyboard(){
 		try{
 			var active = iGUI.iGUIRoot.isiPhoneKeyboardActive;
 		}
 		catch(e){
 			return false;
 		}
 		return true;
 	}
 	
 	function getElementValue(f: iGUIElement){
 		var v: String;
 		var u: UserData = f.userData;
		switch(u.fieldType){
			case "text":
				var t: iGUITextfield = f;
				v = t.value;
				break;
			case "textarea":
				Debug.Log("textarea");
				var a: iGUITextarea = f;
				v = a.value;
				break;
			case "number":
				var n: iGUINumberField = f;
				v = n.value.ToString();
				break;
		}
		
		//Debug.Log("u.fieldType = "+u.fieldType);
		//Debug.Log('get: v = '+v);
		
		return v;
 	}
	
	function setElementValue(f: iGUIElement, v: String){
 		var u: UserData = f.userData;
		switch(u.fieldType){
			case "text":
				var t: iGUITextfield = f;
				t.setValue(v);
				return true;
				break;
			case "textarea":
				var a: iGUITextarea = f;
				a.setValue(v);
				return true;
				break;
			case "number":
				var n: iGUINumberField = f;
				Debug.Log('set: v = '+v);
				n.setValue(int.Parse(v));
				return true;
				break;
		}
		
		return false;
 	}
	
	function getStyle(n:String){
		if(!styles.ContainsKey(n)){
			return null;
		}
		
		return styles[n];
	}
	
	function addStyle(n:String, f: GUIStyle){
		styles.Add(n, f);
	}
	
	function getComponent(n:String){
		if(!components.ContainsKey(n)){
			return null;
		}
		
		return components[n];
	}
	
	function addComponent(n:String, v: Component){
		components.Add(n, v);
	}
}


