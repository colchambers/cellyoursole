#pragma strict
import System.Reflection;

class TennisServeHeightOptions extends Options {

	var elementAllEnabled: boolean = true;
	var elementSwitches: Dictionary.<String, iGUISwitch>;
	
	var playerData: String;
	var serveModal: TennisServeModal;
	var e: Errors;
	var score: int = 0;
	var targetsRemaining: int;
	var initialTargetsRemaining: int = 1;
	var attemptsRemaining: int;
	var initialBallsLeft = 3;
	
	var targetPositions: Dictionary.<int, Vector3>;
	var challengeStarted: boolean = false;
	var delayComplete: boolean = false;
	
	var challengeTimerText: String;
	var challengeIntroText: String;
	var randomTimerMax: int = 50;
	var timerIntroLabel: TextMesh;
	var timerIntroLabelHidden: boolean = false;
	var paused: boolean = false;
	var power: float;
	var targetPositionAdjustment: Vector3;
	var servePositionAdjustment: Vector3;
	var currentCamera: Camera;
	var ball: GameObject;
	
	static var MAIN_MENU_ID = 'mainMenu';
	static var ELEMENTS_SWITCH_ALL_ID = 'all';
	
	static var TIMER_CHALLENGE_ID = 'challenge';
	static var TIMER_DELAY_ID = 'delay';
	static var TIMER_INTRO_LABEL_ID = 'Intro timer Text';
	
	static var TIMER_DELAY_VALUE: float = 2.0;
	static var TIMER_CHALLENGE_VALUE: float = 114.0;
	
	static var TARGET_SERVICE_BOX_ID = 'ServiceBoxTarget';
	static var BALL_ID = 'Ball';
	
	static var CAMERA_MAIN_ID = 'Main Camera';
	static var CAMERA_UMPIRE_ID = 'cameraUmpire';
	static var CAMERA_SIDE_RIGHT_ID = 'cameraSideRight';
	
	static var PLAYER_1_ID = 'Player 1';
	static var PLAYER_2_ID = 'Player 2';
	static var PLAYER_3_ID = 'Player 3';
	static var PLAYER_4_ID = 'Player 4';
	static var PLAYER_NAME_ID = 'Player Name';

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
		
		initialiseMenu();
		initialiseSceneItems();
		initialiseTargets();
		initialiseScore();
		initialiseTimers();
		initialiseCameras();
		initialiseControls();
				
		// Load Default Scenario
		//loadScenario(1);
		//call('recordBallStrike');
		initialiseDisplay();
	}
	
	function initialiseDisplay(){
		mainPresenter.mvpShow(this.id);
		
		//quit();
		populateChallengeMenu();
	}
	
	function initialiseMenu(){
		// Add mode button
		var r: iGUIRoot = mainPresenter.panel.getContainer("root");
		var button: iGUIButton = addPageButton(this.id, 'Pause', 'instructionsButton', r);
		button.setX(0);
		button.setY(0);
		button.setWidth(0.21);
		button.clickCallback = pause_Click;
		
		button = addPageButton(this.id, 'Instructions', 'instructionsButton', r);
		button.setX(0.33);
		button.setY(0);
		button.setWidth(0.21);
		button.clickCallback = help_Click;
	}
	
	function initialiseSceneItems(){
		// Add all scene items to be used in the page. 
		initialisePlayers();
		
		var objects = getBalls();
		for(var o in objects){
			addSceneItem(o.name, o);
		}
		
		// Assign ball
		ball = getSceneItem('Ball').item;
		
		// Stop ball moving
		ball.GetComponent(Rigidbody).useGravity = false;
		ball.GetComponent(SphereCollider).enabled = false;
	}
	
	function initialiseTargets(){
		// Add all scene items to be used in the page. 
		var objects = getTargets();
		for(var o in objects){
			if(getSceneItem(o.name)){
				continue;
			}
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
		//attemptsRemaining = 0;
	}
	
	function initialiseTimers(){
		addTimer(TIMER_CHALLENGE_ID, new Timer());
		addTimer(TIMER_DELAY_ID, new Timer());
		var timerIntroLabelGO: GameObject = GameObject.Find(TIMER_INTRO_LABEL_ID);
		if(!getSceneItem(TIMER_INTRO_LABEL_ID)){
			addSceneItem(timerIntroLabelGO.name, timerIntroLabelGO);
		}
		timerIntroLabel = timerIntroLabelGO.GetComponent(TextMesh);
		timerIntroLabel.text = '';
		timerIntroLabelGO.GetComponent(MeshRenderer).enabled = true;
	}
	
	function initialiseCameras(){
		currentCamera = Camera.main;
		var go: GameObject;
		go = GameObject.Find(CAMERA_MAIN_ID);
		go.transform.position = Vector3(2.39, 4.08, 11.33);
		if(!getSceneItem(CAMERA_MAIN_ID)){
			addSceneItem(CAMERA_MAIN_ID, go);
		}
		if(!getSceneItem(CAMERA_UMPIRE_ID)){
			go = mainPresenter.createCamera(CAMERA_UMPIRE_ID, Vector3(-1.561276, 0.3756608, -4.524526));
			addSceneItem(CAMERA_UMPIRE_ID, go);
		}
		else { 
			go = getSceneItem(CAMERA_UMPIRE_ID).item;
		}
		go.transform.rotation = Quaternion.Euler(Vector3(0,16.83746,0));
		
		if(!getSceneItem(CAMERA_UMPIRE_ID)){
			go = mainPresenter.createCamera(CAMERA_SIDE_RIGHT_ID, Vector3(-6.523982, 1.242765, 0.07972717));
			addSceneItem(go.name, go);
		}
		go.transform.rotation = Quaternion.Euler(Vector3(0,90,1.08052e-07));
		
	}
	
	/**
	 * Initialise player objects
	 * @return void
	 */
	function initialisePlayers(){
		// For this scene players are visible but don't interact with the scene.
		
		//return;
		var objects = getPlayers();
		for(var o in objects){
			addSceneItem(o.name, o);
			// Disable all players
			o.active = false;
			o.GetComponent(CapsuleCollider).enabled = false;
			o.transform.FindChild(PLAYER_NAME_ID).active = false;
			
		}
	}
	
	function initialiseControls(){
		resetControls();
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
		resetControls();
		
		challengeStarted = false;
		delayComplete = false;
	}
	
	function recordHit(){
		targetsRemaining--;
	}
	
	function recordBallStrike(){
		attemptsRemaining--;
	}
	
	/**
	 * Reset control variables.
	 * @return void
	 */
	function resetControls(){
		power = 0.5;
		targetPositionAdjustment = Vector3(0.5, 0.5, 0);
		servePositionAdjustment = Vector3(0,0,0);
		
		// Reset view
		setView(CAMERA_MAIN_ID);
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
		addPageNavigationButton('continue', 'Continue Serving');
		addPageNavigationButton('quit', 'Quit');
	}
	
	/**
	 * Load the given page.
	 * @param String id id of the page to load
	 * @return void
	 */
	function loadPage(id: String){
		switch (id) {
			case 'challengeMenu':
				populateChallengeMenu();
				break;
			case 'mainMenu':
				loadMainMenu();
			case 'play':
				play();
				break;
			case 'continue':
				continueScene();
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
	function populateChallengeMenu(){
		title = "The Serve: Height";
		var introText: String = "Tennis is a very dynamic game. You can't fully appreciate it with photos and pictures. ";
		introText += "You need 3d to be able to understand how things look for ";
		introText += "you, your opponent or even the ball in any given scenario.\n\n";
		if(introText){
			addPageText(introText);
		}
		
		reset(title);
	
		// Create buttons.
		addPageButton('play', 'Play');
		addPageNavigationButton('mainMenu', 'Challenges');
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateHelpMenu(){
		reset("Instructions");
		addPageNavigationButton('continue', 'Continue Serving');
		
		addPageText("This lesson is about exploring the difference ball height makes when serving");
		var instructions="The ball is already aimed at the court. The only adjustments to make are:\n* the balls starting height\n* height to aim (trajectory)\n* power.";
		addPageText(instructions);
		addPageText("You have 3 serves. You only need one good serve.");
		addPageText("Tip: Try the different views to see the serve from different angles.");
	}
	
	function loadMainMenu(){
		mainPresenter.mvpHide(this.id);
		mainPresenter.mvpShow(MAIN_MENU_ID);
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateControlsMenu(){
		
		title = "Controls";
		
		reset(title);
		setPaused(false);
		var menu: iGUIWindow = panel.getContainer('menu');
		menu.setWidth(0.4);
		menu.setHeight(1);
		menu.setX(1.0);
		menu.setY(1.0);
	
		// Create buttons.
		var button: iGUIButton;
		
		button = addPageButton('serve', 'Serve');
		
		var slider: iGUIFloatHorizontalSlider;
		slider = addPageSlider ('power', 'power', handlePowerSlider_change, 'instructionsButton', list);
		slider.setValue(power);
		
		slider = addPageSlider ('targetY', 'Aim Height', handleTargetPositionSlider_change, 'instructionsButton', list);
		slider.setValue(targetPositionAdjustment.y);
		
		//slider = addPageSlider ('targetX', 'Aim direction', handleTargetPositionSlider_change, 'instructionsButton', list);
		//slider.setValue(targetPositionAdjustment.x);
		
		//slider = addPageSlider ('targetZ', 'Target Depth', handleTargetPositionSlider_change, 'instructionsButton', list);
		//slider.setValue(targetPositionAdjustment.z);
		
		//slider = addPageSlider ('serveX', 'Ball Horizontal Position', handleServePositionSlider_change, 'instructionsButton', list);
		//slider.setValue(servePositionAdjustment.x);
		
		slider = addPageSlider ('serveY', 'Ball Height', handleServePositionSlider_change, 'instructionsButton', list);
		slider.setValue(servePositionAdjustment.y);
			
		addPageText("Select different view points from the list below.\n", 0.5);
		
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
		// Load target prefab
		var ballPrefabPath = "Serve Height/Ball";
		var ballPrefab: GameObject = Resources.Load(ballPrefabPath);
		
		// Create ball
		var ballPosition: Vector3 = getBallPosition();
		var ball: GameObject = GameObject.Instantiate(ballPrefab, ballPosition, Quaternion.identity);
			ball.name += " clone";
			ball.tag = 'ball';// Configure associated scripts
		var ballScript: TennisServeHeightBall = ball.AddComponent(TennisServeHeightBall);
			ballScript.sceneOptions = this;
			
		// Get target
		var target: GameObject = getSceneItem(TARGET_SERVICE_BOX_ID).item;
		
		// Aim at target
		target.transform.rotation = Quaternion.EulerAngles(Vector3(0,0,0));
		target.transform.localRotation = Quaternion.EulerAngles(Vector3(0,0,0));
		ball.transform.LookAt(target.transform.position);
		
		// Adjust aim: Unsure why the opposite direction seems to work
		ball.transform.Rotate(Vector3.left, targetPositionAdjustment.y*50);
		ball.transform.Rotate(Vector3.up, (targetPositionAdjustment.x-0.5)*50);

		// Add force
		ball.rigidbody.AddRelativeForce(Vector3.forward * (power*1000));
		
		// Update attempts.
		call('recordBallStrike');
		
	}
	
	function getBallPosition(){
		var ba = servePositionAdjustment;
		return Vector3(0.3637002+(ba.x*3), 2.00639+((ba.y-0.5)*2), 4.633946+ba.z);
	}
	
	function play(){
		resetLevel();
		setPaused(false);
		//mainPresenter.mvpHide(this.id);
		start();
	}
	
	function continueScene(){
		populateControlsMenu();
	}
	
	/**
	 * Populate the win menu 
	 * @return void
	 */
	function populateWin(){

		reset("You win");
		
		var text="Congratulations. Challenge complete.\n\n Next challenge unlocked ";;
		addPageText(text, 0.5);
	
		// Create buttons.
		addPageButton('challengeMenu', 'Continue');

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
		addPageButton('challengeMenu', 'Title Menu');
		
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
		setView(caller.userData);
	}
	
	function setView(id: String){
		var c: Camera = getSceneItem(id).item.GetComponent(Camera);;
		currentCamera.enabled = false;
		currentCamera = c;
		currentCamera.enabled = true;
	}
	
	function calculateScore(){
		return initialTargetsRemaining-targetsRemaining;
	}
	
	function OnGUI(){
		var hudText: String = "Targets hit: "+calculateScore()+"\nAttempts remaining: "+attemptsRemaining;
			hudText+="\nTime left: "+challengeTimerText;
			hudText+="\nIntro left: "+challengeIntroText;
				//challengeIntroText
		GUI.Label (Rect (10,50,150,100), hudText) ;
		
		var title="Shoot the target!!";
		GUI.Label(Rect(10, 40, 500, 40), title);
		
		// adjust racquet position for ball height.
		ball.transform.position = getBallPosition();
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
		
		//Debug.Log('Not won');
		return false;
	}
	
	function checkHasLost() {
	
		var challengeTime: int = getChallengeTime();
		if(targetsRemaining && (attemptsRemaining<0 || !challengeTime)){
			Debug.Log('Lost');
			return true;
		}
		
		//Debug.Log('Not lost');
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
		
			//Debug.Log('challenge started');
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
					var introLabelGO: MeshRenderer = getSceneItem(TIMER_INTRO_LABEL_ID).item.GetComponent(MeshRenderer);
					introLabelGO.enabled = false;
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
		populateMenu();
	}
	
	function help_Click(caller : iGUIButton){
		setPaused(true);
		populateHelpMenu();
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