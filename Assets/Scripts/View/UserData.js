#pragma strict

class UserData {
	var id : int;
	var field : String;
	var type : String;
	var value : String;
	var fieldType: String;
	
	function UserData(id, field, type, fieldType) {
		this.id = id;
		this.field = field;
		this.type = type;
		this.fieldType = fieldType;
	}
}
