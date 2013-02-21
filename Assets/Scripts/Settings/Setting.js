#pragma strict
import System.Collections.Generic;
/*
 * Simple class for storing and manipulating settings.
 */
class Setting {
	var id: String;
	var name: String;
	var settings: Dictionary.<String, Setting>;
	var value: String;
	
	function Setting(id: String){
		__construct(id, "", "");
	}
	
	function Setting(id: String, n: String, v: String){
		__construct(id, n, v);
	}
	
	function __construct(id: String, n: String, v: String){
		this.id = id;
		this.name = n;
		this.value = v;
		settings = new Dictionary.<String, Setting>();
	}
	
	function getField(f: String){
		switch(f){
			case "id": 
				return this.id;
			case "name": 
				return this.name;
				break;
			case "value": 
				return this.value;
				break;
			case "value": 
				return this.value;
				break;
			default:
				return false;
		}
		
		return false;
	}
	
	function setField(f: String, v: String){
		switch(f){
			case "id": 
				this.id = v;
				break;
			case "name": 
				this.name = v;
				break;
			case "value": 
				this.value = v;
				break;
			default:
				return false;
		}
		
		return false;
	}
	
	function addSetting(id: String, n:String, v: String){
		var setting: Setting = new Setting(id, n, v);
		settings.Add(id, setting);
		return setting;
	}
	
	function addSetting(id: String, n: String){
		return addSetting(id, n, '');
	}
	
	function addSetting(id: String){
		return addSetting(id, '', '');
	}
	
	function getSetting(id: String){
		if(!settings.ContainsKey(id)){
			return null;
		}
		
		return settings[id];
	}
	
	function debug() {
		Debug.Log("Settings details");
		Debug.Log("value = "+value);
		Debug.Log("name = "+name);
	}
	
	function toString() {
		return name+','+value;
	}
}