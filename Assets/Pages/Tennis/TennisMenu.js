#pragma strict

class TennisMenu extends Menu {

	function TennisMenu(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisMenu(){
		super();
	}
	
	function init(){
		super();	
		
		initialiseToggle();	
		
		title = "The Court";
		introText += "Tennis is a very dynamic game. You can't fully appreciate it with photos and pictures. ";
		introText += "You need 3d to be able to understand how things look for ";
		introText += "you, your opponent or even the ball in any given scenario.\n\n";
		
		introText += "This knowledge is crucial for determining the winning strategies and exploring the options available ";
		introText += "throughout a tennis match.\n\n";
		
		introText += "In this prototype you can drag the players and ball around the court to play out the desired rally. ";
		introText += "You can then switch your view point and understand the scenario from different angles.\n\n";

		introText += "Future developments will have preloaded scenarios to choose from and much more interactivity.";
		
		mainMenuButtonTitle = ""; // Clear the title so the button doesn't show.
		createPlayerCamera('Player 1 Camera', 'Player 1');
		createPlayerCamera('Player 2 Camera', 'Player 2');
		createPlayerCamera('Player 3 Camera', 'Player 3');
		createPlayerCamera('Player 4 Camera', 'Player 4');
		mainPresenter.createCameraWithParentId('Ball Camera', 'ball');
		
		mainPresenter.createCameraAndParent("Walking Camera", new Vector3(0, 1.86, -0.1223917), 
			new Vector3(12.70337,0,0), 'character');
		mainPresenter.createCameraAndParent("Top Camera", new Vector3(0.2, 9.1, 4.64), 
			new Vector3(70,180,0));
	}
	
	function initialiseToggle(){
		// Add mode button
		var r: iGUIRoot = mainPresenter.panel.getContainer("root");
		var button: iGUIButton = addPageButton(this.id, 'M', 'instructionsButton', r);
		button.setX(0);
		button.setY(0);
		button.setWidth(0.11);
		button.clickCallback = mainPresenter.mvpToggle_Click;
	}
	
	/**
	 * Populate the Page menu 
	 * @return void
	 */
	function populateMenu(){
		super();
		var menu: iGUIWindow = panel.getContainer('menu');
		menu.setWidth(0.93);
		menu.setWidth(0.96);
		menu.setX(0.53);
		menu.setY(0.55);
		
		addPageButton('reactions', 'Reactions');
		//addPageButton('phonemes', 'Phonemes');
		//addPageButton('myDay', 'MyDay');
		
	}
	
	function createPlayerCamera(n: String, parentId: String){
		var p: GameObject = mainPresenter.createCameraWithParentId(n, parentId);
		if(p){
			p.Find(n).transform.localPosition.y +=0.77;
		}
	}
	
}