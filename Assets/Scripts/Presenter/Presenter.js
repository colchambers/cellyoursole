#pragma strict

class Presenter {
	var presenter: Presenter;
	var rootPanel: iGUISlidePanel;
	var presenters: Dictionary.<String, Presenter>;
	var views: Dictionary.<String, View>;
	var modals: Dictionary.<String, Modal>;
	var mvps: Dictionary.<String, MVP>;
	
	
	function Presenter(){
		presenters = new Dictionary.<String, Presenter>();
		views = new Dictionary.<String, View>();
		modals = new Dictionary.<String, Modal>();
		mvps = new Dictionary.<String, MVP>();
		
		_construct();
	}
	
	function _construct(){
	}
	
	function init(){
	}
	
	function getPresenter(n:String){
		if(!presenters.ContainsKey(n)){
			return null;
		}
		
		return presenters[n];
	}
	
	function addPresenter(n:String, f){
		presenters.Add(n, f);
	}
	
	function getView(n:String){
		if(!views.ContainsKey(n)){
			return null;
		}
		
		return views[n];
	}
	
	function addView(fn:String, f){
		views.Add(fn, f);
	}
	
	function getModal(n:String){
		if(!modals.ContainsKey(n)){
			return null;
		}
		
		return modals[n];
	}
	
	function addModal(fn:String, f){
		modals.Add(fn, f);
	}
	
	function getMVP(n:String){
		if(!mvps.ContainsKey(n)){
			return null;
		}
		
		return mvps[n];
	}
	
	function addMVP(n:String, f){
		mvps.Add(n, f);
	}
}