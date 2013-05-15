#pragma strict

class TennisServeTopSpinOptions extends TennisServeOptions {

	function TennisServeTopSpinOptions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisServeTopSpinOptions(){
		super();
		hasBackground = true;
	}
	
	function initialiseTargets(){
		super();
		targetServeBoxPosition = Vector3(0.8057368,0,0.7);
	}
	
	function initialiseText(){
		challengeMenuTitle = "The Serve: Topspin";
		challengeMenuText = "The tennis serve becomes a real weapon when combined with spin";
		challengeMenuText += "This lesson will teach you how to apply topspin during a serve to make ";
		challengeMenuText += "the ball curve downwards during flight";
		
		helpMenuText = "This lesson is about exploring the difference topspin makes when serving.\n\n";
		helpMenuText +="The ball is already aimed at the target in the service box. The power is already set.\n\n";
		helpMenuText +="The only adjustments to make are:\n";
		helpMenuText +="* the amount of topspin\n* the amount power.\n\n";
		helpMenuText +="You have 3 serves. You only need one good serve. \n\n";
		helpMenuText +="Tip: Try the different views to see the serve from different angles.";
	}
	
	/**
	 * Reset control variables.
	 * @return void
	 */
	function resetControls(){
		super();
		power = 0.6;
	}
	
	function addControls(){
		addControl('top');
	}
}