#pragma strict
import System;
class Task extends Item {

	var datetime : DateT;
	var year: String;
	var month: String;
	var day: String;
	var hour: String;
	var minute: String;
	var duration: int = 0;
	function Task(s:String){
		super(s);
		var details = s.Split(","[0]);
		
		__construct();
		if(details.Length>3){
			// String version is YYYYMMDDHHMM.
			datetime.setDate(details[3]);
		}
		if(details.Length>4){
			setField("duration", details[4]);
		}
		
	}
	function Task(id:int){
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
			case "minute": 
			case "hour": 
			case "day": 
			case "month": 
			case "year": 
			case "date": 
			case "time":
			case "datetime":
				return this.datetime.getField(f);
				break;
			case "duration":
				return this.duration;
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
			case "minute": 
			case "hour": 
			case "day": 
			case "month": 
			case "year": 
				this.datetime.setField(f, v);
				break;
			case "duration":
				try {
					this.duration = int.Parse(v);
				}
				catch (e){
					this.duration = 0;
				}
				break;
			default:
				return false;
		}
		
		return true;
	}
	
	function toString() {
		var s: String = super();
		return s+','+datetime.toString()+','+duration.ToString();
	}
}