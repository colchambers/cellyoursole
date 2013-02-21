#pragma strict

class DateT {
	var year: String = '0000';
	var month: String = '00';
	var day: String = '00';
	var hour: String = '00';
	var minute: String = '00';
	
	function DateT(){
	}
	
	function DateT(d: String){
		setDate(d);
	}
	
	function getField(f: String){
		switch(f){
			case "minute": 
				return this.minute;
				break;
			case "hour": 
				return this.hour;
				break;
			case "day": 
				return this.day;
				break;
			case "month": 
				return this.month;
				break;
			case "year": 
				return this.year;
				break;
			case "date": 
				return year+month+day;
				break;
			case "time": 
				return hour+minute;
				break;
			case "datetime": 
				return year+month+day+hour+minute;
				break;
			default:
				return false;
		}
		
		return true;
	}
	
	function setField(f: String, v: String){
		switch(f){
			case "minute": this.minute = v;
				break;
			case "hour": this.hour = v;
				break;
			case "day": this.day = v;
				break;
			case "month": this.month = v;
				break;
			case "year": this.year = v;
				break;
			default:
				return false;
		}
		
		return true;
	}
	
	function setDate(d: String){
		var l:int = d.length;
		if(l<4){
			return;
		}
		year = d.Substring(0,4);
		if(l<6){
			return;
		}
		month = d.Substring(4,2);
		if(l<8){
			return;
		}
		day = d.Substring(6,2);
		if(l<10){
			return;
		}
		hour = d.Substring(8,2);
		if(l<12){
			return;
		}
		minute = d.Substring(10,2);
		
	}
	
	function debug() {
		Debug.Log("Date details");
		Debug.Log("year = "+year);
		Debug.Log("month = "+month);
	}
	
	function toString() {
		return year+month+day+hour+minute;
	}

}