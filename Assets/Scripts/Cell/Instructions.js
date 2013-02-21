#pragma strict

class Instructions extends Menu {

	var strings: Dictionary.<String, String>;
	function Instructions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function Instructions(){
		super();
	}
	
	function init(){
		super();
		initStrings();
		populateMenu();
	}
	
	function initStrings(){
	
		strings = new Dictionary.<String, String>();
		var text="";
		text+="- Rotate camera using a 1 finger/left mouse click swipe\n";
		text+="- Zoom in/out by pinching with 2 fingers or using the mouse wheel\n";
		text+="- Move around using a 2 finger/right click swipe\n";
		text+="- View element details and options using a 1 finger tap/left click\n";
		text+="- Drag elements by selecting them and then dragging. \n";
		text+="   - Select items with 1 finger/the mouse cursor and left click and hold.\n";
		text+="     in 2-3s the element will be selected and enlarge.\n";
		text+="   - Drag the item with 1 finger/the mouse cursor and left click.\n";
		
		strings.Add('navigation', text);
	}
	
	function getString(n){
		if(!strings.ContainsKey(n)){
			return null;
		}
		
		return strings[n];
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
		addPageNavigationButton('deliverables', 'Deliverables');
		addPageNavigationButton('K235', 'K235 Space Planning');
		addPageNavigationButton('K218', 'K218 Floor Plan');
		addPageNavigationButton('references', 'References');
		
	}
	
	function loadPage(id: String){
		switch (id) {
			case 'menu':
				populateMenu();
				break;
			case 'navigation':
				populateNavigation();
				break;
			case 'goals':
				populateGoals();
				break;
			case 'features':
				populateFeatures();
				break;
			case 'deliverables':
				populateDeliverables();
				break;
			case 'K235':
				populateK235();
				break;
			case 'K218':
				populateK218();
				break;
			case 'references':
				populateReferences();
				break;
			
		}
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateNavigation(){
	
		prepareSubPage();
		
		var text = getString('navigation');
		addPageText(text, 0.5);
		
		text ="Using this resource you can organise a room and explore how your ";
		text+="changes affect its accessibility. \n";
		text+="You can move most furniture and lights by dragging them.\n";
		text+="To drag an item select it with your finger or mouse and drag it.\n";
		text+="You can see the impact of turning lights on and off using the lights menu.";
			
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
	
	/**
	 * Populate the Deliverables section 
	 * @return void
	 */
	function populateDeliverables(){
	
		prepareSubPage();
		addPageTitle('Deliverables');

		var text="";
		text+="The key deliverables of this demonstration.";
		addPageText(text);
		
		text="Delivering a high quality virtual room is not key. Delivering the ability to ";
		text+="organise a virtual space by selecting and moving 3d objects around is key.";
		addPageText(text);
		
		text="The ability to select objects such as light switches and change their properties ";
		text+="either directly such as turning a light on or off or via a menu system such as ";
		text+="changing a wall texture from a given list is key.";
		addPageText(text);
		
		text="An existing high quality room provided by unity can be used if suitable but ";
		text+="this is not a requirement. The requirement is for the functionality developed ";
		text+="during this project to be easily applied to the unity room scene in a future project.";
		addPageText(text);
	}
	
	/**
	 * Populate the K235 section 
	 * @return void
	 */
	function populateK235(){
	
		prepareSubPage();
		addPageTitle('K235 Space planning activity');

		var text="";
		text+="The module team wanted a bedroom/bathroom that students could design to be ";
		text+="more suitable for use by patients with dementia.";
		addPageText(text);
		
		text="They discussed the possibility of students building a room using something like \n";
		text+="http://mydeco.com/3d-planner/ but this was dropped as it was thought to be \n";
		text+="too challenging for students to use.";
		addPageText(text, 0.35);
		
		addPageLink('http://mydeco.com/3d-planner/', '3D Planner');
		
		text ="The final solution was to show a standard ";
		text+=" room in the form of an illustration. The students were then asked to compose a ";
		text+="short piece of text explaining what they would change or adapt in the picture in ";
		text+="order to make the room more suitable for dementia patients.";
		addPageText(text, 0.4);
		addPageImage('K235_room_planner', 0.5);
		
		text ="Using Unity this could be a 3D room that the student creates from a number of elements, ";
		text+="furniture, lights, wallpaper etc. ending up with a completed room.";
		addPageText(text);
		
	}

	/**
	 * Populate the K235 section 
	 * @return void
	 */
	function populateK218(){
	
		prepareSubPage();
		addPageTitle('K218 Floor Plan');

		var text="";
		text+="In this activity students are asked to design a school dining room whist ";
		text+="considering, amongst other things, lighting and floor surfaces and the effect ";
		text+="their choices would have on the overall dining room environment.";
		addPageText(text);
		
		text="It was produced as a flat floor plan and used a drag and drop facility to move \n";
		text+="icons of furniture onto the floor.";
		addPageText(text);
		
		addPageImage('floorplan.1.1.swf', 0.5);
		addPageLink('http://learn.open.ac.uk/mod/oucontent/view.php?id=602367&section=1.4.2', 'Floor Plan');
		
		text ="Although it was well received some aspects would have been illustrated more ";
		text+="clearly had it been done as a 3D room using lighting and different ";
		text+="surface textures within Unity.";
		addPageText(text);
		
	}
	
	/**
	 * Populate the references section 
	 * @return void
	 */
	function populateReferences(){
	
		prepareSubPage();
		addPageTitle('References');

		var text="";
		text+="Many examples of organising 3d spaces exist. These are the references we used.";
		addPageText(text, 0.25);

		text="Autodesk homestyler is a useful reference. It has already considered many ";
		text+="of the challenges we face and provides useful ideas.";
		addPageText(text);
		
		addPageLink('http://www.homestyler.com/designer', 'Autodesk Homestyler');
		
		text ="Farmville, Social City, City of wonder: Facebook games based on a standard template ";
		text+="where 3d environments are edited and adjusted with ease. ";
		addPageText(text);
		addPageLink('https://apps.facebook.com/cityofwonder/?fb_source=timeline', 'City of Wonder');
		
		text ="Ice Age: An Android game where you organise a 3D environment on a mobile device";
		addPageText(text);
		
	}

	function reset() {
		setTitle("Instructions");
		super();
	}

}