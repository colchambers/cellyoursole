#pragma strict
import System.Collections.Generic;

class ModalPanel {
	var presenter: Presenter;
	var mainPresenter: MainPresenter;
	var rootPanel: iGUIElement;
	var fields: Dictionary.<String, iGUIElement>;
	var buttons: Dictionary.<String, iGUIButton>;
	var containers: Dictionary.<String, iGUIElement>;
	var timers: Dictionary.<String, Timer>;
	var sceneItems: Dictionary.<String, SceneItem>;
	
	
	function ModalPanel(){
		fields = new Dictionary.<String, iGUIElement>();
		buttons = new Dictionary.<String, iGUIButton>();
		containers = new Dictionary.<String, iGUIElement>();
		timers = new Dictionary.<String, Timer>();
		sceneItems = new Dictionary.<String, SceneItem>();
	}
	
	function getField(fn:String){
		if(!fields.ContainsKey(fn)){
			return null;
		}
		
		return fields[fn];
	}
	
	function addField(fn:String, f){
		fields.Add(fn, f);
	}
	
	/**
	 * Clear a dictionary of items
	 * @param String t type
	 * @return void
	 */
	function clearItems(t: String){
		var list = getListById(t);
		list.Clear();
	}
	
	function getListById(id: String){
		switch(id){
			case 'field':
				return fields;
				break;
//			case 'button':
//				return buttons;
//				break;
		}
	}
	
	function getButton(fn:String){
		if(!buttons.ContainsKey(fn)){
			return null;
		}
		
		return buttons[fn];
	}
	
	function getButtons(){
		return buttons;
	}
	
	function addButton(fn:String, f){
		buttons.Add(fn, f);
	}
	
	function removeButton(fn:String){
		buttons.Remove(fn);
	}
	
	function getContainer(fn:String){
		if(!containers.ContainsKey(fn)){
			return null;
		}
		
		return containers[fn];
	}
	
	function addContainer(fn:String, f){
		containers.Add(fn, f);
	}
	
	function getTimer(n:String){
		if(!timers.ContainsKey(n)){
			return null;
		}
		
		return timers[n];
	}
	
	function addTimer(n:String, v){
		timers.Add(n, v);
	}
	
	function addSceneItem(id, item) {
		sceneItems.Add(id, new SceneItem(id, item));
	}
	
	function getSceneItem(id:String){
		if(!sceneItems.ContainsKey(id)){
			return null;
		}
		
		return sceneItems[id];
	}
	
	function getSceneItems(){
		return sceneItems;
	
	}
}