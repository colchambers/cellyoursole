#pragma strict

class Item {
	var id: int = 0;
	var name: String = '';
	var description: String = '';
	
	function Item(s:String){
		var details = s.Split(","[0]);
		id = int.Parse(details[0]);
		setField('name', details[1]);
		description = details[2];
	}
	function Item(id:int){
		this.id = id;
	}
	
	function Item(){
	}
	
	function getField(f: String){
		var v: String;
		switch(f){
			case "name": 
				v = this.name.Replace('&comma;', ',');
				return v;
				break;
			case "description": 
				v = this.description.Replace('&comma;', ',');
				return v;
				break;
			default:
				return false;
		}
		
		return false;
	}
	
	function setField(f: String, v: String){
		switch(f){
			case "name": 
				v = v.Replace(',', '&comma;');
				this.name = v;
				break;
			case "description": 
				v = v.Replace(',', '&comma;');
				this.description = v;
				break;
			default:
				return false;
		}
		
		return false;
	}
	
	function debug() {
		Debug.Log("Item details");
		Debug.Log("id = "+id);
		Debug.Log("name = "+name);
	}
	
	function toString() {
		return id+','+name+','+description;
	}
	
}