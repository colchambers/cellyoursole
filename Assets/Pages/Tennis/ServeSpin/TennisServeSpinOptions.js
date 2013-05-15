#pragma strict
import System.Reflection;

class TennisServeSpinOptions extends TennisServeOptions {

	
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
	
	function addControls(){
		addControl('power');
		addControl('targetx');
		addControl('side');
		addControl('top');
		addControl('up');
	}
}