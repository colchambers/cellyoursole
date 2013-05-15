#pragma strict
import System.Reflection;

class TennisServeSliceOptions extends TennisServeOptions {
	
	function TennisServeSliceOptions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisServeSliceOptions(){
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
		title = "The Serve: Slice";
		var introText: String = "The tennis serve becomes a real when when combined with spin";
		introText += "This lesson will teach you how to apply slice (Side) spin during a serve to make ";
		introText += "the ball curve sieways during flight";
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
		addControl('side');
	}
}