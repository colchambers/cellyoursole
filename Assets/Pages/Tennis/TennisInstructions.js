#pragma strict

class TennisInstructions extends Instructions {

	
	function TennisInstructions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisInstructions(){
		super();
	}
	
	function init(){
		super();
		populateMenu();
	}
	
	
	/**
	 * Populate the instructions menu 
	 * @return void
	 */
	function populateMenu(){
	
		reset();
	
		// Create buttons.
		var button: iGUIButton;
		
		button = list.addElement("iGUIButton");
    	button.setWidth(1);
		button.label.text = 'Back';
		button.clickCallback = back_Click;
		//panel.addButton('back', button);
		addPageNavigationButton('navigation', 'Navigation');
		addPageNavigationButton('goals', 'Goals');
		addPageNavigationButton('features', 'Features');
		
	}
	
	function loadPage(id: String){
		switch (id) {
			case 'menu':
				populateMenu();
				return;
				break;
			case 'navigation':
				populateNavigation();
				return;
				break;
			case 'goals':
				populateGoals();
				return;
				break;
			case 'features':
				populateFeatures();
				return;
				break;
		}
		
		super(id);
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateNavigation(){
	
		prepareSubPage();
		
		var text = getString('navigation');
		addPageText(text, 0.5);
		
		text ="Using this resource you can organise a tennis court\n";
		text+="You can move the players and ball by dragging them.\n";
		text+="To drag an item select it with your finger or mouse and drag it.\n";
			
		addPageText(text, 0.5);
		
	}

	/**
	 * Populate the Goals section 
	 * @return void
	 */
	function populateGoals(){
	
		prepareSubPage();
		addPageTitle('Goals');

		var text="";
		text+="Our goals in developing this demonstration.";
		addPageText(text);

		text="- Mobile is new for unity and for teaching. How well does it work?\n";
		text+="- How to drag and drop items from one place to another\n";
		text+="- Where to use gestures such as Long click, tap, swipe\n";
		text+="- How to achieve platform independence. \n";
		text+="- Gestures that work on desktop and web\n";
		text+="- How the proof of concept was constructed\n";
		addPageText(text, 0.35);
	}
	
	/**
	 * Populate the Features section 
	 * @return void
	 */
	function populateFeatures(){
	
		prepareSubPage();
		addPageTitle('Features');

		var text="";
		text+="The features this example demonstrates.";
		addPageText(text);
		
		text="- Mobile support\n";
		text+="- Touch input\n";
		text+="- Immersive Environments\n";
		text+="- High quality 3d environments\n";
		text+="- Drag and drop\n";
		text+="- Menu and navigation systems\n";
		addPageText(text, 0.35);
	}

}