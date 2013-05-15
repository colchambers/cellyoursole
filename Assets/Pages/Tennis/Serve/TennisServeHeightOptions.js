#pragma strict

class TennisServeHeightOptions extends TennisServeOptions {

	function TennisServeHeightOptions(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisServeHeightOptions(){
		super();
		hasBackground = true;
	}
	
	function initialiseText(){
		challengeMenuTitle = "The Serve: Height";
		challengeMenuText = "The tennis serve becomes more effective when hit from a higher point.";
		challengeMenuText += "This lesson will teach you how a serve from a higher position to give ";
		challengeMenuText += "it more pace without compromising margin of error.";
		
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
		addControl('power');
		addControl('serveY');
		addControl('targetY');
	}
}