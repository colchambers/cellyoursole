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
	
	function initialiseText(){
		challengeMenuTitle = "The Serve: Slice";
		challengeMenuText = "The tennis serve becomes a real weapon when combined with spin";
		challengeMenuText += "This lesson will teach you how to apply slice (Side) spin during a serve to make ";
		challengeMenuText += "the ball curve sideways during flight";
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