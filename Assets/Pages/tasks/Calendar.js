#pragma strict

class Calendar extends MVP {

	var datetime : DateT = new DateT();
	function Calendar(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function Calendar(){
		super();
	}
	
	function init(){

	}
	
	/**
	 *	List distinct dates from given activities. Link to the day containing those activities.
	 * @param string d date 
	 */
	function populateCalendar(){
		var button : iGUIButton;
		var date: String;
		// Clear activity list
		var list: iGUIListBox = panel.getContainer('list');
		list.removeAll();
			
		// Find activities for the date
		var tm: TaskModal = mainPresenter.getModal('task');
		/*
		 * Using LINQ to sort the data. Select returns the values we want in a list. OrderBy sorts the list.
		 * Distinct returns unique values.
		 */
		var distinctActivities = tm.tasks.Select(function (e) {return e.Value.getField("date");})
				.OrderBy(function (e) {return e;}).Distinct();
		
		// Loop through and display activities
		for(date in distinctActivities){
			button = list.addElement("iGUIButton");
	    	button.setWidth(1);
	    	button.label.text = date;
	    	button.userData = date;
	    	button.clickCallback = dayListButtonClick;
		}
	
	}
	
	/**
	 *	Present the my day view with activities from the given date string
	 * @param string d date 
	 */
	function presentCalendar(){
		populateCalendar();
		// Create the helper method in the presenter following the signature below.
		mainPresenter.enablePanel(9);
	}
	
	function dayListButtonClick(caller : iGUIButton){
		var mvp: MyDay = mainPresenter.getMVP('myDay');
		mvp.presentDay(caller.userData);
	}
	
	function activities_Click(caller : iGUIButton){
		mainPresenter.enablePanel(3);
	}
	
	function today_Click(caller : iGUIButton){
		var mvp: MyDay = mainPresenter.getMVP('myDay');
		mvp.presentCurrentDay();
	}
	
	function calendar_Click(caller : iGUIButton){
		presentCalendar();
	}
	
	function add_Click(caller : iGUIButton){
		caller.userData = 0;
	   	dayListButtonClick(caller);
	}
}