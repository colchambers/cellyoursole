#pragma strict

class SceneItem {
	var id: String;
	var name: String;
	var item: GameObject;
	
	function SceneItem (id: String, item: GameObject){
		this.id = id;
		this.item = item;
	}
}