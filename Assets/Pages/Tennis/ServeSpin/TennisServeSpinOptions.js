#pragma strict
import System.Reflection;

class TennisServeSpinOptions extends TennisServeOptions {

	var serveSpinAdjustment: Vector3;
	var ball_id_index: int = 0;
	var servedBall: GameObject;
	
	function TennisServeSpinOptions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisServeSpinOptions(){
		super();
		hasBackground = true;
	}
	
	function init(){
		super();
		
		initialBallsLeft = 30;
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
	 * Populate the settings menu 
	 * @return void
	 */
	function populateChallengeMenu(){
		title = "The Serve: Spin";
		var introText: String = "The tennis serve becomes a real when when combined with spin";
		introText += "This lesson will teach you how to apply different spins during a serve";
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
		
		slider = addPageSlider ('targetX', 'Aim direction', handleTargetPositionSlider_change, 'instructionsButton', list);
		slider.setValue(targetPositionAdjustment.x);
		
		slider = addPageSlider ('serveY', 'Ball Height', handleServePositionSlider_change, 'instructionsButton', list);
		slider.setValue(servePositionAdjustment.y);
		
		slider = addPageSlider ('side', 'Slice', handleServeSpinSlider_change, 'instructionsButton', list);
		slider.setValue(servePositionAdjustment.y);
		
		slider = addPageSlider ('top', 'Top', handleServeSpinSlider_change, 'instructionsButton', list);
		slider.setValue(servePositionAdjustment.y);
			
		slider = addPageSlider ('up', 'Up', handleServeSpinSlider_change, 'instructionsButton', list);
		slider.setValue(servePositionAdjustment.y);
		
		addPageText("Select different view points from the list below.\n", 0.5);
		
		addPageViewButton(CAMERA_MAIN_ID, 'Default');
		addPageViewButton(CAMERA_OPPONENT_ID, 'Opponent');
		addPageViewButton(CAMERA_SIDE_RIGHT_ID, 'Side right');
		
	}
	
	function handleServeSpinSlider_change (caller: iGUIFloatHorizontalSlider) {
		switch(caller.userData){
			case "top":
				serveSpinAdjustment.x = 0-caller.value;
				break;
			case "up":
				serveSpinAdjustment.y = caller.value;
				break;
			case "side":
				serveSpinAdjustment.z = -1+caller.value;
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
			ball.name += " clone" + (ball_id_index++);
			ball.tag = 'ball';// Configure associated scripts
		var ballScript: TennisServeSpinBall = ball.AddComponent(TennisServeSpinBall);
			ballScript.sceneOptions = this;
			
		servedBall = ball;
			
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
		
		// Add Torgue (Spin)
		ball.rigidbody.AddTorque(Vector3.left * (serveSpinAdjustment.x*10));
		ball.rigidbody.AddTorque(Vector3.forward * (serveSpinAdjustment.y*10));
		ball.rigidbody.AddTorque(Vector3.up * (serveSpinAdjustment.z*10));
		
		// Update attempts.
		call('recordBallStrike');
		
	}
	
	function OnGUI(){
		super();
		if(servedBall){
			Debug.Log('serveSpinAdjustment.x = '+serveSpinAdjustment.x);
			Debug.Log(servedBall.transform.rotation);
		}
	}

}