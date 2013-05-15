#pragma strict
import System.Reflection;

class MainMenuOptions extends Options {

	var playerData: String;
	var scenarioModal: TennisScenarioModal;
	var serveModal: TennisServeModal;
	var e: Errors;
	
	var paused: boolean = false;
	var currentCamera: Camera;


	function MainMenuOptions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function MainMenuOptions(){
		super();
		hasBackground = true;
	}
	
	function init(){
		super();
		e = new Errors();

		initialiseDisplay();
	}
	
	function initialiseDisplay(){
		mainPresenter.mvpShow(this.id);
		
		//quit();
		populateTitleMenu();
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateMenu(){
	
		reset("Paused");
	
		// Create buttons.
		var button: iGUIButton;
		
		button = addPageNavigationButton('continue', 'Continue Serving');
		//button.clickCallback = backToScene_Click;
		
		addPageNavigationButton('views', 'Views');
		addPageNavigationButton('quit', 'Quit');
		
	}
	
	/**
	 * Load the given page.
	 * @param String id id of the page to load
	 * @return void
	 */
	function loadPage(id: String){
		switch (id) {
			case 'titleMenu':
				populateTitleMenu();
				break;
			case 'credits':
				//populateMenu();
				break;
			case 'optionsMenu':
				populateMenu();
				break;
			case 'quit':
				quit();
				break;
			default:
				super(id);
		}
		
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateTitleMenu(){
		
		reset();
		var introText: String = "Tennis is a very dynamic game. You can't fully appreciate it with photos and pictures. ";
		introText += "You need 3d to be able to understand how things look for ";
		introText += "you, your opponent or even the ball in any given scenario.\n\n";
		
		introText += "This series of challenges introduces you to the most fundamental shot in Tennis.  The serve. ";
		introText += "Every point starts with a serve. A good serve helps you start the point on your terms.\n\n";
		if(introText){
			addPageText(introText);
		}
	
		// Create buttons.
		var button: iGUIButton;
		
		button = addStartChallengeButton('tennisServeLesson', 'Flat');
		button = addStartChallengeButton('tennisServeTopSpinLesson', 'Topspin');
		button = addStartChallengeButton('tennisServeSliceLesson', 'Slice');
		
		var advancedText: String = "Advanced Challenges\n\n ";
		advancedText += "The following challenges introduce more advanced aspects of the serve.";

		if(advancedText){
			addPageText(advancedText);
		}
		
		button = addStartChallengeButton('tennisServeHeightLesson', 'Height');
	}
	
	/**
	 * Display the current mvp then load the given page.
	 * @param String id id of the page to load
	 * @return void
	 */
	function displayPage(id: String){
		mainPresenter.mvpShow(this.id);
		loadPage(id);
	}
	
	function addStartChallengeButton(id: String, t: String){
		var button: iGUIButton = addPageButton(id, t, 'none');
		button.clickCallback = startChallenge_Click;
		return button;
	}
	
	function startChallenge_Click(caller : iGUIButton){
		displayChallenge(caller.userData);
	}
	
	function displayChallenge(id: String){
		mainPresenter.mvpHide(this.id);
		var mvp = mainPresenter.mvpShow(id);
		mvp.loadPage('challengeMenu');
	}

	function reset(title: String){
		reset();
		setDefaultMenuSize(title);
	}
	
	function reset(){
		setPaused(true);
		super();
		setDefaultMenuSize("Tennis Fundamentals: The Serve");
	}
	
	function setDefaultMenuSize(title: String){
		var menu: iGUIWindow = panel.getContainer('menu');
		menu.label.text = title;
		menu.setHeight(0.93);
		menu.setWidth(0.96);
		menu.setX(0.53);
		menu.setY(0.55);
	}
	
	/**
	 * Quit Application.
	 * @return void
	 */
	function quit(){
		Debug.Log('quit');
		// Quit lesson.
		
	}

	function setPaused(v: boolean) {
		paused = v;
		setBackgroundEnabled(!v);
	}
	
	function setBackgroundEnabled(enabled: boolean){
		if(!hasBackground){
			return;
		}
		var script :TennisServe = getScript('tennisServe');
		if(!script){
			return;
		}
		script.enabled = enabled;
	}
}