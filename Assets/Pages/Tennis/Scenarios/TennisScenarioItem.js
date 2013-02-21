#pragma strict
import System;
class TennisScenarioItem extends Item {

	var year: String;
	var datetime : DateT;
	var data: String;
	function TennisScenarioItem(s:String){
		super(s);
		var details = s.Split(","[0]);
		
		__construct();
		
		if(details.Length>3){
			setField("data", TennisScenarioModal.decode(details[3]));
		}
		
	}
	function TennisScenarioItem(id:int){
		super(id);
		__construct();
	}
	
	function __construct() {
		datetime = new DateT();
	}
	
	function getField(f: String){
		var fv = super(f);
		if(fv){
			return fv;
		}
		switch(f){
			case "year": 
				return this.datetime.getField(f);
				break;
			case "data":
				return this.data;
				break;

		}
		
		return fv;
	}
	
	function setField(f: String, v: String){
		var isSet = super(f, v);
		if(isSet){
			return true;
		}
		switch(f){
			case "year": 
				this.datetime.setField(f, v);
				break;
			case "data":
				this.data = v;
				break;
			default:
				return false;
		}
		
		return true;
	}
	
	
	function toString() {
		var s: String = super();
		return s+','+TennisScenarioModal.encode(this.data);
	}
}