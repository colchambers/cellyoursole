#pragma strict
import System.Collections.Generic;

class ReactionsMenu extends Menu {

	var buttons: Dictionary.<String, iGUIButton>;
	var reactions: List.<Reaction>;
	var challengeTimerLabel: iGUILabel;
	var challengeDelayLabel: iGUILabel;
	var challengeReactionsLabel: iGUILabel;
	var statusLabel: iGUILabel;
	var targetButtonId: String;
	var numberOfTargetButtons: int;
	var challengeStarted: boolean = false;
	var delayComplete: boolean = false;
	var randomTimerMax: int = 50;
	var reactionTimes: Dictionary.<String, float>;
	var reactionTotals: Dictionary.<String, ReactionTotal>;
	var maxNumberOfTargetButtons: int = 3;

	static var TIMER_CHALLENGE_ID = 'challenge';
	static var TIMER_DELAY_ID = 'delay';
	
	static var TIMER_DELAY_VALUE: float = 1.0;
	
	function ReactionsMenu(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}

	function ReactionsMenu(){
		super();
	}

	function init() {
		super();
		
		title = "Reactions";
		addTimer(TIMER_CHALLENGE_ID, new Timer());
		addTimer(TIMER_DELAY_ID, new Timer());
		reactionTimes = new Dictionary.<String, float>();
		reactionTimes.Add('1', 0.0);
		reactionTimes.Add('2', 0.0);
		reactionTimes.Add('3', 0.0);
		
		reactions = new List.<Reaction>();
		reactionTotals = Dictionary.<String, ReactionTotal>();
		var reactionTotal: ReactionTotal;
		for(var i: int=1; i<maxNumberOfTargetButtons+1;i++){
			reactionTotal = new ReactionTotal(i);
			reactionTotals.Add(i.ToString(), reactionTotal);
		}
	}
	
	function FixedUpdate(){

		//Debug.Log('reactions 1');
		var dt = getTimer(TIMER_DELAY_ID);
		dt.update();
		
		var ct = getTimer(TIMER_CHALLENGE_ID);
		ct.update();
		
		if(challengeStarted){
		
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
			if(ct.isStarted() && !isButtonHighlighted()){
				highlightButton();
			}
		}
		
		if(challengeDelayLabel){
			var challengeText = "";
			if(dt.isStarted() && !delayComplete){
				challengeText = "Challenge starts in "+getTimeToDisplay(dt.getTime())+" seconds";
			}
			else if(delayComplete){
				challengeText = "Challenge started";
			}
			
			challengeDelayLabel.label.text = challengeText;
		}
		
		if(challengeTimerLabel){
			challengeTimerLabel.label.text = getTimeToDisplay(ct.getTime());
		}
	}
	
	function isButtonHighlighted(){
		return targetButtonId?true: false;
	}
	
	function highlightButton(){
	
		// Select button at random
		var id = Random.Range(1, numberOfTargetButtons).ToString();
		var b: iGUIButton = getButton(id);
		b.labelColor = Color.red;
		
		targetButtonId = id;
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
	

	/**
	 * Populate the menu 
	 * @return void
	 */
	function populateMenu(){
		reset();
		
		addPageNavigationButton('reactions', 'Play');
		addInstructionsButton();
		addMainMenuButton();
		
		// Disable bakground scene
		setBackgroundEnabled(false);
	}
	
	function loadPage(id: String){
		switch (id) {
			case 'menu':
				populateMenu();
				return;
				break;
			case 'reactions':
				populateReactions();
				return;
				break;
			case 'challenge':
				populateChallenge();
				return;
				break;
			case 'instructions':
				populateInstructions();
				return;
				break;
		}
		super(id);
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateReactions(){
	
		prepareSubPage();
		
		var text="";
	
		for(var total in reactionTotals){
		
			// Create listbox container
			var c: iGUIListBox = addPageListBox(list);
			c.direction = iGUIListDirection.LeftToRight;
			c.setHeight(0.2);
			c.setWidth(1);
			c.refreshRect();

			text = getChallengeReactionTextByOption(total.Key);
			var t = addPageText(text, 0.1, c);	
			t.setWidth(0.5);
			var button: iGUIButton = addPageButton (total.Key, 'Record', 'instructionsButton', c);
			button.clickCallback = handleReaction_Click;
			button.setWidth(0.4);
			button.setHeight(0.2);
			button.setY(0);
		}
		
	}
	
	/**
	 * Populate the instructions page 
	 * @return void
	 */
	function populateInstructions(){
	
		prepareSubPage();
		
		addPageTitle('Creating time: Options and Reaction times');
		var text="";

		text+="The more viable options available to you. The longer it takes to make a choice.\n";
		text+="This experiment will show you that the number of options available effects your reaction time.\n";
		text+="The more options available. The slower your reaction time. This is the same for everyone.\n";
		addPageText(text);
		
		text="Winning points on a tennis court is all about manipulating time. Giving yourself more time ";
		text+="and your opponent less.\n";
		addPageText(text);
		
		text ="As an attacker if your opponent has to prepare for more options. They'll take longer ";
		text+="to respond to your shot. \n";
		text+="As the opponent the fewer options you have to consider the faster you can respond and ";
		text+="the more time you have.\n";
		addPageText(text, 0.5);
		
		text="That's the principle behind every shot and taking control of the point.\n";
		text+="Taking time away or creating time.";
			
		addPageText(text);
		
	}
	
	function getChallengeReactionTextByOption(o: String){
		var total: ReactionTotal = reactionTotals[o];
		var text="";
		text+= total.buttons+" option: "+total.getAverageTime()+" s";
		text+=" Reactions recorded: "+total.reactions;
		return text;
	}
	
	function updateChallengeReactionsLabel(){
		challengeReactionsLabel.label.text = getChallengeReactionTextByOption(numberOfTargetButtons.ToString());
	}
	
	/**
	 * Populate the Challenge page
	 * Challenges test the reaction time hypothesis
	 * @return void
	 */
	function populateChallenge(){
	
		prepareSubPage('reactions');
		var ct = getTimer(TIMER_CHALLENGE_ID);
		ct.reset();
		
		// Create labels
		var text="";
		challengeReactionsLabel = addPageText(text, 0.1);
		updateChallengeReactionsLabel();
		challengeTimerLabel = addPageText(text, 0.1);
		challengeDelayLabel = addPageText(text, 0.1);
		
		buttons = new Dictionary.<String, iGUIButton>();
		
		var id = 'Start';
		var b = addPageChallengeButton (id, id);
		b.setVariableName(id);
		buttons.Add(id, b);
		
		text="";
		statusLabel = addPageText(text, 0.1);
		
		for(var buttonId = 1; buttonId<=numberOfTargetButtons;buttonId++){
			id = buttonId.ToString();
			b = addPageChallengeButton (id, id);
			b.setVariableName(id);
			buttons.Add(id, b);
		}
	}
	
	function handleReactions(id: String){
		
		switch(id) {
			case 'Start':
				start(id);
				return;
				break;
		}
		
		if(id == targetButtonId){
			correct();
			resetButtons();
			resetLabels();
			populateChallenge();
			return;
		}
		
		inCorrect();
	}
	
	function start(id: String){
		challengeStarted = true;
		delayComplete = false;
		
		var b: iGUIButton = getButton(id);
		b.labelColor = Color.red;
	}
	
	function correct(){
		statusLabel.label.text = "Correct";
		var ct = getTimer(TIMER_CHALLENGE_ID);
		reactionTimes[numberOfTargetButtons.ToString()] = ct.getTime();
		ct.stop();
		challengeStarted = false;
		
		// Record reaction
		var r: Reaction = new Reaction(reactions.Count);
		r.buttons = numberOfTargetButtons;
		r.time = ct.getTime();
		addReaction(r);
		
		// Update relevant Reaction Total
		var total: ReactionTotal = reactionTotals[numberOfTargetButtons.ToString()];
		total.addReaction(r);
		
		var dt = getTimer(TIMER_DELAY_ID);
		dt.reset();
		delayComplete = false;
		
		updateChallengeReactionsLabel();
	}
	
	function inCorrect(){
		statusLabel.label.text = "incorrect. Try again";
	}
	
	function resetButtons(){
	
		for(var b in buttons.Values){
			b.labelColor = Color.white;
		}
		
		targetButtonId = "";
	}
	
	function resetLabels(){
		challengeDelayLabel.label.text = "";
	}
	
	function getButton(id:String){
		if(!buttons.ContainsKey(id)){
			return null;
		}
		
		return buttons[id];
	}

	function addPageChallengeButton (id: String, t: String, p: iGUIListBox) {
		var b: iGUIButton = addPageButton (id, t, 'instructionsButton', p);
		b.clickCallback = handleChallenge_Click;
		return b;
	}
	
	function addPageChallengeButton (id: String, t: String) {
		return addPageChallengeButton(id, t, list);
	}
	
	function handleReaction_Click(caller : iGUIButton){
		numberOfTargetButtons = int.Parse(caller.userData);
		populateChallenge();
	}
	
	function handleChallenge_Click(caller : iGUIButton){
		handleReactions(caller.userData);
	}
	
	function getTimeToDisplay(time: float){
		time = Mathf.Round(time*100)/100;
		var timeToDisplay = floatToDecimal(time);
		
		return timeToDisplay + ' secs';
	}
	
	function floatToDecimal(number:float){
		return floatToDecimal(number, 3);
	}
	/**
	 *	Convert a float to a number string to the given prevision
	 * @param float number
	 * @param int precision
	 */
	function floatToDecimal(number:float, precision: int){
		var decimal = number.ToString();
		var decimalPosition = decimal.IndexOf('.');
		
		if(decimal.Length-(decimalPosition+1)==precision){
			return decimal;
		}
	
		if(decimalPosition<1){
			decimal+='.';
			decimalPosition = decimal.Length-1;
		}
		var toAdd = precision-(decimal.Length-(decimalPosition+1));
	
		for(var i=0;i<toAdd;i++){
			decimal+='0';
		}
		
		return decimal;
	}
	
	function getTimer(n){
		return panel.getTimer(n);
	}
	
	function addTimer(n: String, v){
		panel.addTimer(n, v);
	}
	
	function createAndAddReaction(){
		var r: Reaction = new Reaction(reactions.Count);
	}
	
	function getReactions(){
		return reactions;
	}
	
	function getReaction(n){
		return reactions[n];
	}
	
	function addReaction(v: Reaction){
		reactions.Add(v);
	}
	
}