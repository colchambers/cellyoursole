#pragma strict
import iGUI;
import System.Collections.Generic;

class TaskPresenter extends Presenter {

	var tm: TaskModal;
	var v: View;
	var e: Errors;
	var adp: ActivityDetailPanel;
	var fieldsBlur: iGUIEventCallback;
	var fieldsFocus: iGUIEventCallback;
	var fieldsValueChange_dropdownlist: iGUIEventCallback;
	var tasksList: iGUIListBox;
	var tasksList_Init: iGUIEventCallback;
	
	// Date
	var monthsInYear : int = 12;
	var daysInMonth : int = 31;
	var hoursInDay : int = 24;
	var minutesInHour : int = 60;
	var startYear : int = 2011;
	var endYear : int = 2016;

	function TaskPresenter(tm:TaskModal, v:View, e: Errors ){
		this.tm = tm;
		this.v = v;
		this.e = e;
	}
	
	function init(){

		Debug.Log(adp);
		
		// Initialise date fields.
		date_year_Init(adp.getField("year"));
		date_month_Init(adp.getField("month"));
		date_day_Init(adp.getField("day"));
		date_hour_Init(adp.getField("hour"));
		date_minute_Init(adp.getField("minute"));

	}

	function populateTaskActivityPanel(id){
		var task = tm.getTaskById(id);
		var deleteButton: iGUIButton = adp.getButton("delete");
		deleteButton.userData = task.id;
		var doneButton: iGUIButton = adp.getButton("done");
		doneButton.userData = task.id;
		populateField(adp.getField("name"), task, "name", "text");
		populateField(adp.getField("notes"), task, "description", "textarea");
		
		// Date
		populateDateItem(adp.getField("year"), task, "year");
		populateDateItem(adp.getField("month"), task, "month");
		populateDateItem(adp.getField("day"), task, "day");
		
		// Time
		populateDateItem(adp.getField("hour"), task, "hour");
		populateDateItem(adp.getField("minute"), task, "minute");
		
		// Duration
		populateField(adp.getField("duration"), task, "duration", "text");

	}
	
	function populateDateItem(d: iGUIDropDownList, t: Task, f: String){
		d.selectedIndex = 0;
		var fv: String = t.datetime.getField(f);
		if(fv){
			for(var i=0;i<d.options.Count; i++){
				var option = d.options[i];
				if(option.text != fv){
					continue;
				}
				d.selectedIndex = i;
			}
		}
		d.userData = new UserData(t.id, f, "task", "dropdown");
		d.valueChangeCallback = fieldsValueChange_dropdownlist;
	}
	
	function populateField(f: iGUIElement, t: Task, fn: String, ft: String){
		f.userData = new UserData(t.id, fn, "task", ft);
		
		var fv = t.getField(fn);
		v.setElementValue(f, fv.ToString());
		var u: UserData = f.userData;
		switch(u.fieldType){
			case "text":
				var tf: iGUITextfield = f;
				tf.blurCallback = fieldsBlur;
				tf.focusCallback = fieldsFocus;
				break;
			case "textarea":
				var ta: iGUITextarea = f;
				ta.blurCallback = fieldsBlur;
				ta.focusCallback = fieldsFocus;
				break;
			case "number":
				var nf: iGUINumberField = f;
				nf.blurCallback = fieldsBlur;
				nf.focusCallback = fieldsFocus;
				break;
		}
		
	}
	
	function validateTask(id){
		var ok = true;
		var task = tm.getTaskById(id);
		var nameField: iGUITextfield = adp.getField("name");
		e.window.label.text = "Notifications";
		if(!nameField.value){
			ok = false;
			e.addError(nameField.variableName, "Name field cannot be empty");
		}
		
		var nameMaxLength: int = 24;
		if(nameField.value && nameField.value.Length>nameMaxLength){
			ok = false;
			e.addError(nameField.variableName, "Name field cannot be longer than "+nameMaxLength+" characters.");
		}
		
		var descriptionField: iGUITextarea = adp.getField("notes");
		var notesMaxLength: int = 149;
		if(descriptionField.value && descriptionField.value.Length>notesMaxLength){
			ok = false;
			e.addError(descriptionField.variableName, "Notes field cannot be longer than "+notesMaxLength+" characters.");
		}
		
		var durationMaxLength: int = 3;
		var durationField: iGUITextfield = adp.getField("duration");
		if(durationField.value && durationField.value.ToString().Length>durationMaxLength){
			ok = false;
			e.addError(durationField.variableName, "Duration field cannot be longer than "+durationMaxLength+" characters.");
		}
		
		return ok;
	}
	
	function displayErrors(){
		v.enablePanel(v.panelIds[8], false);
		var text: String = "";
		var errors: Dictionary.<String, String> = e.getErrors();
		for(error in errors.Values){
			text += error+"\n";
		}
		e.textarea.setValue(text);
		e.clearErrors();
	}
	
	function hideErrors(){
		v.disablePanel(v.panelIds[8], false);
		e.textarea.setValue("");
	}
	
	function prepareErrorElements(){
		e.close.clickCallback = hideErrors;
	}
	
	function saveTasksAndDisplayList(){
		tm.save();
		tasksList_Init(tasksList);
		v.enablePanel(v.panelIds[3]);
	}
	
	function date_year_Init(caller : iGUIDropDownList){
		appendNumbersToList(endYear, caller, startYear, 4);
	}
	
	function date_month_Init(caller : iGUIDropDownList){
		appendNumbersToList(monthsInYear, caller, 0, 2);
	}
	
	function date_day_Init(caller : iGUIDropDownList){
		appendNumbersToList(daysInMonth, caller, 0, 2);
	}
	
	function date_hour_Init(caller : iGUIDropDownList){
		appendNumbersToList(hoursInDay, caller, 0, 2);
	}
	
	function date_minute_Init(caller : iGUIDropDownList){
		appendNumbersToList(minutesInHour, caller, 0, 2);
	}

	/**
	 * Helper functions
	 */
	function appendNumbersToList(size: int, list: iGUIDropDownList, start: int, fillZerosTo: int){
		list.removeAll();
		for(var x=start;x<size+1;x++){
			list.addOption(tm.appendZeros(x.ToString(), fillZerosTo));
		}
	}
	function appendNumbersToList(size: int, list: iGUIDropDownList, start: int){
		appendNumbersToList(size, list, start, 0);
	}
	function appendNumbersToList(size: int, list: iGUIDropDownList){
		appendNumbersToList(size, list, 1);
	}

}