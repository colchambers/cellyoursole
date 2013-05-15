#pragma strict

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
		
		helpMenuText = "This lesson is about exploring the difference slice (side spin) makes when serving.\n\n";
		helpMenuText +="The ball is already aimed at the target in the service box. The only adjustments to make are:\n";
		helpMenuText +="* the amount of slice\n* the amount power.\n\n";
		helpMenuText +="You have 3 serves. You only need one good serve. \n\n";
		helpMenuText +="Tip: Try the different views to see the serve from different angles.";
	}
	
	function addControls(){
		addControl('power');
		addControl('side');
	}
}