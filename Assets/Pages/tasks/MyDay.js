#pragma strict

class MyDay extends MVP {

	var datetime : DateT = new DateT();
	function MyDay(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function MyDay(){
		super();
	}
	
	function init(){
		prepareDay();
	}
	
	function prepareDay(){
		// Navigation menu
		var clickCallbacks: Dictionary.<String, iGUIEventCallback> = new Dictionary.<String, iGUIEventCallback>();
		clickCallbacks.Add('activities', activities_Click);
		clickCallbacks.Add('today', today_Click);
		clickCallbacks.Add('calendar', calendar_Click);
		clickCallbacks.Add('add', add_Click);
		var button: iGUIButton;
		for(key in panel.buttons.Keys){
			button = panel.getButton(key);
					
			if(clickCallbacks.ContainsKey(key)){
				button.clickCallback = clickCallbacks[key];
			}
		}
		
	}
	
	/**
	 *	Populate the my day view with activities from the given date string
	 * @param string d date 
	 */
	function populateDay(){
		var button : iGUIButton;
		var task : Task;
		var i:int;
		// Clear activity list
		var list: iGUIListBox = panel.getContainer('list');
		list.removeAll();
			
		// Find activities for the date
		var tm: TaskModal = mainPresenter.getModal('task');
		var date: String = datetime.getField('date');
		var taskDate: String;
		
		var orderedActivities = tm.tasks.OrderBy(function (e) {return e.Value.getField("time");});
		// Loop through and display activities
		for(orderedActivity in orderedActivities){
			task = orderedActivity.Value;
			if(task.datetime.getField('date') != date){
				continue;
			}
			button = list.addElement("iGUIButton");
	    	button.setWidth(1);
	    	button.label.text = task.getField("name");
	    	button.userData = task.id;
	    	button.clickCallback = dayListButtonClick;
		}
	
	}
	
	/**
	 *	Present the my day view with activities from the given date string
	 * @param string d date 
	 */
	function presentDay(d: String){
		datetime.setDate(d);
		populateDay();
		// Create the helper method in the presenter following the signature below.
		mainPresenter.enablePanel(9);
	}
	
	function presentCurrentDay(){
		var d = System.DateTime.Now.ToString('yyyyMMdd');
		presentDay(d);
	}
	
	function dayListButtonClick(caller : iGUIButton){
		var tp: TaskPresenter = mainPresenter.getPresenter('task');
		tp.populateTaskActivityPanel(caller.userData);
		mainPresenter.enablePanel(2);
	}
	
	function activities_Click(caller : iGUIButton){
		mainPresenter.enablePanel(3);
	}
	
	function today_Click(caller : iGUIButton){
		presentCurrentDay();
	}
	
	function calendar_Click(caller : iGUIButton){
		var mvp: Calendar = mainPresenter.getMVP('calendar');
		mvp.presentCalendar();
	}
	
	function add_Click(caller : iGUIButton){
		caller.userData = 0;
	   	dayListButtonClick(caller);
	}
}