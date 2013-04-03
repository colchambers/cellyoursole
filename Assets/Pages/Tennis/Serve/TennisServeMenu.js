#pragma strict

class TennisServeMenu extends Menu {

	function TennisServeMenu(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function TennisServeMenu(){
		super();
	}
	
	function init(){
		super();	
		
		initialiseToggle();	
		
		title = "The Serve";
		introText += "Tennis is a very dynamic game. You can't fully appreciate it with photos and pictures. ";
		introText += "You need 3d to be able to understand how things look for ";
		introText += "you, your opponent or even the ball in any given scenario.\n\n";
		
		mainMenuButtonTitle = ""; // Clear the title so the button doesn't show.
	
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
	
	function loadPage(id: String){
		switch (id) {
			case 'play':
				play();
				return;
				break;
		}
		super(id);
	}
	
	/**
	 * Populate the Page menu 
	 * @return void
	 */
	function populateMenu(){
		super();
		var menu: iGUIWindow = panel.getContainer('menu');
		menu.setHeight(0.93);
		menu.setWidth(0.96);
		menu.setX(0.53);
		menu.setY(0.55);

		addPageNavigationButton('play', 'Play');
		//
	}
	
	function play(){
		var mvp: TennisServeOptions = mainPresenter.getMVP('tennisServeOptions');
		mvp.setPaused(false);
		mainPresenter.mvpHide(this.id);
	}
	
}