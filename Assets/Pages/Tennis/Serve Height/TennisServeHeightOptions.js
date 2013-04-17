#pragma strict
import System.Reflection;

class TennisServeHeightOptions extends Options {

	var elementAllEnabled: boolean = true;
	var elementSwitches: Dictionary.<String, iGUISwitch>;
	
	var playerData: String;
	var scenarioModal: TennisScenarioModal;
	var serveModal: TennisServeModal;
	var e: Errors;
	var score: int = 0;
	var targetsRemaining: int;
	var initialTargetsRemaining: int = 10;
	var attemptsRemaining: int;
	var initialBallsLeft = 10;
	
	var targetPositions: Dictionary.<int, Vector3>;
	var challengeStarted: boolean = false;
	var delayComplete: boolean = false;
	
	var challengeTimerText: String;
	var challengeIntroText: String;
	var randomTimerMax: int = 50;
	var timerIntroLabel: TextMesh;
	var timerIntroLabelHidden: boolean = false;
	var paused: boolean = false;
	var power: float = 0.5;
	var targetPositionAdjustment: Vector3 = Vector3(0.5, 0.5, 0.5);
	var servePositionAdjustment: Vector3 = Vector3(0, 0, 0);
	var currentCamera: Camera;
	
	static var ELEMENTS_SWITCH_ALL_ID = 'all';
	
	static var TIMER_CHALLENGE_ID = 'challenge';
	static var TIMER_DELAY_ID = 'delay';
	static var TIMER_INTRO_LABEL_ID = 'Intro timer Text';
	
	static var TIMER_DELAY_VALUE: float = 3.0;
	static var TIMER_CHALLENGE_VALUE: float = 30.0;
	static var MVP_ID = 1;
	
	static var TARGET_SERVICE_BOX_ID = 'ServiceBoxTarget';
	static var BALL_ID = 'Ball';
	
	static var CAMERA_MAIN_ID = 'Main Camera';
	static var CAMERA_UMPIRE_ID = 'cameraUmpire';
	static var CAMERA_SIDE_RIGHT_ID = 'cameraSideRight';

	function TennisServeHeightOptions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisServeHeightOptions(){
		super();
		hasBackground = true;
	}
	
	function init(){
		super();
		e = new Errors();
		
		initialiseToggle();
		initialiseSceneItems();
		initialiseScenarioItems();
		initialiseHelp();
		initialiseTargets();
		initialiseScore();
		initialiseTimers();
		initialiseCameras();
				
		// Load Default Scenario
		//loadScenario(1);
		//call('recordBallStrike');
		initialiseDisplay();
	}
	
	function initialiseDisplay(){
		mainPresenter.mvpShow(this.id);
		
		//quit();
		populateTitleMenu();
	}
	
	function initialiseToggle(){
		// Add mode button
		var r: iGUIRoot = mainPresenter.panel.getContainer("root");
		var button: iGUIButton = addPageButton(this.id, 'P', 'instructionsButton', r);
		button.setX(0.13);
		button.setY(0);
		button.setWidth(0.11);
		button.clickCallback = pause_Click;
	}
	
	function initialiseSceneItems(){
		// Add all scene items to be used in the page. 
		var objects = getPlayers();
		for(var o in objects){
			addSceneItem(o.name, o);
		}
		
		objects = getBalls();
		for(var o in objects){
			addSceneItem(o.name, o);
		}
	}
	
	function initialiseScenarioItems(){
		scenarioModal = new TennisScenarioModal();
		mainPresenter.addModal('tennisScenarios', scenarioModal);
	}
	
	function initialiseHelp(){
		// Add mode button
		var r: iGUIRoot = mainPresenter.panel.getContainer("root");
		var button: iGUIButton = addPageButton(MVP.MODE_EDIT, '?', 'instructionsButton', r);
		button.setX(0.26);
		button.setY(0);
		button.setWidth(0.11);
		button.clickCallback = toggleMode_Click;
	}
	
	function initialiseTargets(){
		// Add all scene items to be used in the page. 
		var objects = getTargets();
		for(var o in objects){
			addSceneItem(o.name, o);
		}
		
		// Configure associated scripts
		var serviceBoxTarget = getSceneItem('ServiceBoxTarget').item;
		var serviceBoxTargetScript: TennisServeServiceTarget = serviceBoxTarget.GetComponent(TennisServeServiceTarget);
			serviceBoxTargetScript.sceneOptions = this;
	}
	
	function initialiseScore(){
		score = 0;
		targetsRemaining = initialTargetsRemaining;
		attemptsRemaining = initialBallsLeft;
		
		// Debug
		attemptsRemaining = 0;
	}
	
	function initialiseTimers(){
		addTimer(TIMER_CHALLENGE_ID, new Timer());
		addTimer(TIMER_DELAY_ID, new Timer());
		var timerIntroLabelGO: GameObject = GameObject.Find(TIMER_INTRO_LABEL_ID);
		addSceneItem(timerIntroLabelGO.name, timerIntroLabelGO);
		timerIntroLabel = timerIntroLabelGO.GetComponent(TextMesh);
	}
	
	function initialiseCameras(){
		currentCamera = Camera.main;
		var go: GameObject;
		go = GameObject.Find(CAMERA_MAIN_ID);
		addSceneItem(CAMERA_MAIN_ID, go);
		go = mainPresenter.createCamera(CAMERA_UMPIRE_ID, Vector3(-1.561276, 0.3756608, -4.524526));
		go.transform.rotation = Quaternion.Euler(Vector3(0,16.83746,0));
		addSceneItem(CAMERA_UMPIRE_ID, go);
		
		go = mainPresenter.createCamera(CAMERA_SIDE_RIGHT_ID, Vector3(-6.523982, 1.242765, 0.07972717));
		go.transform.rotation = Quaternion.Euler(Vector3(0,90,1.08052e-07));
		addSceneItem(go.name, go);
	}
	
	function resetTimers(){
		var dt = getTimer(TIMER_DELAY_ID);
		dt.reset();
		
		var ct = getTimer(TIMER_CHALLENGE_ID);
		ct.reset();
	}
	
	function resetLevel(){
		initialiseScore();
		resetTimers();
		
		challengeStarted = false;
		delayComplete = false;
	}
	
	function recordHit(){
		targetsRemaining--;
	}
	
	function recordBallStrike(){
		attemptsRemaining--;
	}
	
	function getPlayers () {
		return GameObject.FindGameObjectsWithTag('Player');
	}
	
	function getBalls () {
		return GameObject.FindGameObjectsWithTag('ball');
	}
	
	function getTargets () {
		return GameObject.FindGameObjectsWithTag('Target');
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateMenu(){
	
		reset("Paused");
	
		// Create buttons.
		var button: iGUIButton;
		
		button = addPageButton(this.id, 'Continue Serving');
		button.clickCallback = backToScene_Click;
		
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
			case 'play':
				play();
				break;
			case 'serve':
				serve();
				break;
			case 'win':
				populateWin();
				break;
			case 'lose':
				populateLose();
				break;
			case 'leaderboard':
				//populateMenu();
				break;
			case 'credits':
				//populateMenu();
				break;
			case 'optionsMenu':
				populateMenu();
				break;
			case 'views':
				populateViews();
				break;
			case 'quit':
				quit();
				break;
			default:
				super(id);
		}
		
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

	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateTitleMenu(){
		
		title = "The Serve: Height";
		var introText: String = "Tennis is a very dynamic game. You can't fully appreciate it with photos and pictures. ";
		introText += "You need 3d to be able to understand how things look for ";
		introText += "you, your opponent or even the ball in any given scenario.\n\n";
		if(introText){
			addPageText(introText);
		}
		
		reset(title);
	
		// Create buttons.
		var button: iGUIButton;
		
		button = addPageButton('play', 'Play');
		
		addPageNavigationButton('leaderboard', 'Leaderboard');
		addPageNavigationButton('credits', 'Credits');
		addPageNavigationButton('quit', 'Quit');
		
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateControlsMenu(){
		
		title = "Controls";
		
		reset(title);
		setPaused(true);
		var menu: iGUIWindow = panel.getContainer('menu');
		menu.setWidth(0.5);
		menu.setHeight(1);
		menu.setX(1.0);
		menu.setY(1.0);
	
		// Create buttons.
		var button: iGUIButton;
		
		button = addPageButton('serve', 'Serve');
		
		var slider: iGUIFloatHorizontalSlider;
		slider = addPageSlider ('power', 'power', handlePowerSlider_change, 'instructionsButton', list);
		slider.setValue(power);
		
		slider = addPageSlider ('targetY', 'Target Height', handleTargetPositionSlider_change, 'instructionsButton', list);
		slider.setValue(targetPositionAdjustment.y);
		
		slider = addPageSlider ('targetX', 'Target Rotation', handleTargetPositionSlider_change, 'instructionsButton', list);
		slider.setValue(targetPositionAdjustment.x);
		
		slider = addPageSlider ('targetZ', 'Target Depth', handleTargetPositionSlider_change, 'instructionsButton', list);
		slider.setValue(targetPositionAdjustment.z);
		
		slider = addPageSlider ('serveX', 'Ball Horizontal Position', handleServePositionSlider_change, 'instructionsButton', list);
		slider.setValue(servePositionAdjustment.x);
		
		slider = addPageSlider ('serveY', 'Ball Height', handleServePositionSlider_change, 'instructionsButton', list);
		slider.setValue(servePositionAdjustment.y);
		
		addPageViewButton(CAMERA_MAIN_ID, 'Default');
		addPageViewButton(CAMERA_UMPIRE_ID, 'Umpire');
		addPageViewButton(CAMERA_SIDE_RIGHT_ID, 'Side right');
		
	}
	
	function handlePowerSlider_change (caller: iGUIFloatHorizontalSlider) {
		power = caller.value;
	}
	
	function handleTargetPositionSlider_change (caller: iGUIFloatHorizontalSlider) {
		switch(caller.userData){
			case "targetX":
				targetPositionAdjustment.x = caller.value;
				break;
			case "targetY":
				targetPositionAdjustment.y = caller.value;
				break;
			case "targetZ":
				targetPositionAdjustment.z = caller.value;
				break;
		}
	}
	
	function handleServePositionSlider_change (caller: iGUIFloatHorizontalSlider) {
		switch(caller.userData){
			case "serveX":
				servePositionAdjustment.x = caller.value;
				break;
			case "serveY":
				servePositionAdjustment.y = caller.value;
				break;
			case "serveZ":
				servePositionAdjustment.z = caller.value;
				break;
		}
	}
	
	function serve(){
		Debug.Log('Start serve');
		// Load target prefab
		var ballPrefabPath = "Serve Height/Ball";
		var ballPrefab: GameObject = Resources.Load(ballPrefabPath);
		
		// Create ball
		var ba = servePositionAdjustment;
		var ballPosition = Vector3(0.3637002+ba.x, 2.00639+ba.y, 4.633946+ba.z);
		Debug.Log('ballPosition = '+ballPosition);
		var ball: GameObject = GameObject.Instantiate(ballPrefab, ballPosition, Quaternion.identity);
			ball.name += " clone";
			ball.tag = 'ball';
		
		// Get target
		var target: GameObject = getSceneItem(TARGET_SERVICE_BOX_ID).item;
		var p: Vector3 = target.transform.position;
		var a = targetPositionAdjustment;
		var adjustedTarget: Vector3 = Vector3(p.x+a.x, p.y+a.y, p.z+a.z);
		
		// Aim at target
		ball.transform.LookAt(adjustedTarget);

		// Add force
		ball.rigidbody.AddRelativeForce(Vector3.forward * (power*1000));
	}
	
	function play(){
		resetLevel();
		setPaused(false);
		//mainPresenter.mvpHide(this.id);
		start();
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateViews(){
		setBackgroundEnabled(true);
		prepareSubPage();
		
		var text="";
		
		text ="You can view this scene from many viewpoints.";
		text+="Select different view points from the list below.\n";
			
		addPageText(text, 0.5);
		
		addPageViewButton('Main Camera', 'Default');
		
		addPageViewButton('Player 1 Camera', 'Player 1');
		addPageViewButton('Player 2 Camera', 'Player 2');
		addPageViewButton('Player 3 Camera', 'Player 3');
		addPageViewButton('Player 4 Camera', 'Player 4');
		addPageViewButton('Ball Camera', 'Ball');
		
		addPageViewButton('Walking Camera', 'First Person');
		addPageViewButton('Walking Camera 2', 'First Person 2');
		addPageViewButton('Top Camera', 'Top');
	}
	
	/**
	 * Populate the win menu 
	 * @return void
	 */
	function populateWin(){

		reset("You win");
		
		var text="Congratulation. You Win.\n\n";;
		addPageText(text, 0.5);
	
		// Create buttons.
		addPageButton('titleMenu', 'Title Menu');

	}

	/**
	 * Populate the lose menu 
	 * @return void
	 */
	function populateLose(){

		reset("You lose");
		
		var text="You lose. Try again.\n\n";;
		addPageText(text, 0.5);
	
		// Create buttons.
		addPageButton('titleMenu', 'Title Menu');
		
	}
	
	function reset(title: String){
		reset();
		setDefaultMenuSize(title);
	}
	
	function reset(){
		setPaused(true);
		super();
		setDefaultMenuSize("Serve");
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
	 * Quit lesson.
	 * @return void
	 */
	function quit(){
		Debug.Log('quit');
		// Quit lesson.
		
		// Return to menu.
		populateLose();
	}
			
	function addPageViewButton (id: String, t: String) {
		var b: iGUIButton = addPageButton (id, t, 'instructionsButton');
		b.clickCallback = setView_click;
		return b;
	}
	
	function backToScene_Click(caller : iGUIButton){
		setPaused(false);
		mainPresenter.mvpToggle(this.id);
	}
	
	function setView_click (caller: iGUIButton) {
		var c: Camera = getSceneItem(caller.userData).item.GetComponent(Camera);;
		currentCamera.enabled = false;
		currentCamera = c;
		currentCamera.enabled = true;
	}
	
	function calculateScore(){
		return initialTargetsRemaining-targetsRemaining;
	}
	
	var instruction: boolean=false;
	function OnGUI(){
		var hudText: String = "Targets hit: "+calculateScore()+"\nAttempts remaining: "+attemptsRemaining;
			hudText+="\nTime left: "+challengeTimerText;
			hudText+="\nIntro left: "+challengeIntroText;
				//challengeIntroText
		GUI.Label (Rect (10,50,150,100), hudText) ;
		
		var title="Shoot the target!!";
		GUI.Label(Rect(10, 40, 500, 40), title);
		
		var instructionsRect = Rect(10, 85, 130, 35);
		if(!instruction){
			if(GUI.Button(instructionsRect, "Instruction On")){
				instruction=true;
			}
		}
		else{
			if(GUI.Button(instructionsRect, "Instruction Off")){
				instruction=false;
			}
			
			GUI.Box(Rect(10, 100, 300, 65), "");
			
			GUI.Label(Rect(15, 115, 290, 65), "tap on screen to set the aim\nhold down 2 fingers on screen to charge up a fire\nright click to simulate 2 fingers charge");
		}
	}
	
	function displayErrors(){
		getView().enablePanel(getView().panelIds[8], false);
		var text: String = "";
		var errors: Dictionary.<String, String> = e.getErrors();
		for(error in errors.Values){
			text += error+"\n";
		}
		e.textarea.setValue(text);
		e.clearErrors();
	}
	
	function hideErrors(){
		getView().disablePanel(getView().panelIds[8], false);
		e.textarea.setValue("");
	}
	
	function prepareErrorElements(){
		e.close.clickCallback = hideErrors;
	}
	
	function getView(){
		return mainPresenter.p.getView('main');
	}
	
	function toggleMode_Click(caller : iGUIButton){
		var t: String;

		setMode(caller.userData);
		if(mode == MVP.MODE_STANDARD){
			t = 'E';
			caller.userData = MVP.MODE_EDIT;
		}
		else {
			caller.userData = MVP.MODE_STANDARD;
			t = 'S';

		}

		caller.label.text = t;
	}
	
	function call(m: String){
		
		switch(m){
			case "recordBallStrike":
				recordBallStrike();
				return;
				break;
				
		}
		/*
		// Couldn't quite get the reflection working.
		var f: MethodInfo = this.GetType().GetMethod(m);//:MethodInfo
		Debug.Log(f);
		*/
		
		/*if(f){
			f.Invoke(f, 1);
		}*/
		Debug.Log('Unable to find method: '+m);
	}
	
	function start(){
		challengeStarted = true;
		delayComplete = false;
		populateControlsMenu();
	}
	
	function checkHasWon() {
	
		var challengeTime: int = getChallengeTime();
		if(attemptsRemaining>-1 && challengeTime && !targetsRemaining){
			Debug.Log('Won');
			return true;
		}
		
		Debug.Log('Not won');
		return false;
	}
	
	function checkHasLost() {
	
		var challengeTime: int = getChallengeTime();
		if(targetsRemaining && (attemptsRemaining<0 || !challengeTime)){
			Debug.Log('Lost');
			return true;
		}
		
		Debug.Log('Not lost');
		return false;
	}
	
	function FixedUpdate(){

		if(paused){
			return;
		}
		//Debug.Log('reactions 1');
		var dt = getTimer(TIMER_DELAY_ID);
		dt.update();
		
		var ct = getTimer(TIMER_CHALLENGE_ID);
		ct.update();
		
		if(challengeStarted){
		
			// have you won?
			if(checkHasWon()){
				displayPage('win');
			}
			
			// have you lost?
			if(checkHasLost()){
				displayPage('lose');
			}
		
			// Short delay for player to get ready
			if(!delayComplete && !dt.isStarted()){
				dt.start();
			}
			
			if(!delayComplete){
				checkDelayComplete();
			}
			
			// Start challenge timer
			if(delayComplete && !ct.isStarted()){
				checkChallengeTimerStarted();
			}

			// Highlight a button
			//if(ct.isStarted() && !isButtonHighlighted()){
			//	highlightButton();
			//}
		}
		
		//if(challengeDelayLabel){
			var challengeText = "";
			var challengeIntroTime: int = 0;
			var challengeIntroMax: int = parseInt(TIMER_DELAY_VALUE);
			if(dt.isStarted() && !delayComplete){
				challengeText = "Challenge starts in "+getTimeToDisplay(dt.getTime())+" seconds";
				challengeIntroTime = (challengeIntroMax-Mathf.Round(dt.getTime()))+1;
				timerIntroLabel.text = challengeIntroTime.ToString();
			}
			else if(delayComplete){
				challengeText = "Challenge started";
				if(!timerIntroLabelHidden){
					// Hide intro label
					var introLabelGO: GameObject = getSceneItem(TIMER_INTRO_LABEL_ID).item;
					introLabelGO.active = false;
				}
			}
			
			challengeIntroText = challengeText;
		//}
		
		//if(challengeTimerLabel){
			var challengeTime: int = getChallengeTime();
			challengeTimerText = challengeTime.ToString();
		//}
		
		
	}
	
	function getChallengeTime(){
		var ct = getTimer(TIMER_CHALLENGE_ID);
		var challengeTime: int = 0;
		var challengeMax: int = parseInt(TIMER_CHALLENGE_VALUE);
		challengeTime = (challengeMax-Mathf.Round(ct.getTime()))+1;
		return challengeTime;
	}
	
	/**
	 * If the delay timer is started. Stop it when required time has passed and 
	 * notify delay is complete
	 * @return void
	 */
	function checkDelayComplete(){
		var timer = getTimer(TIMER_DELAY_ID);
		if(timer.getTime() < TIMER_DELAY_VALUE){
			return false;
		}
		timer.stop();
		timer.reset();
		delayComplete = true;
		return true;
	}
	
	function checkChallengeTimerStarted(){
		var i: int = Random.Range(0, randomTimerMax);
		if(i<randomTimerMax-1){
			return false;
		}
		
		var timer = getTimer(TIMER_CHALLENGE_ID);
		timer.start();
		return true;
	}
	
	function pause_Click(caller : iGUIButton){
		//  Pause game.
		setPaused(true);
		
		// Show pause menu.
		mainPresenter.mvpToggle_Click(caller);
		
		populateMenu();
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