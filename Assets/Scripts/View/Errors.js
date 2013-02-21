#pragma strict
class Errors {
	var errors : Dictionary.<String, String>;
	var textarea: iGUITextarea;
	var close : iGUIButton;
	var window: iGUIWindow;
	function Errors(){
		this.errors = new Dictionary.<String, String>();
	}
	
	function addError(fieldName: String, text: String){
	
		if(errors.ContainsKey(fieldName)){
			errors[fieldName]+=text;
			return;
		}
		
		errors.Add(fieldName, text);
	}
	
	function getErrors(){
		return errors;
	}
	
	function hasErrors(){
		return errors.Count;
	}
	
	function clearErrors(){
		errors.Clear();
	}
	
}