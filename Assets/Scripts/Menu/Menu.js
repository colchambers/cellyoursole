#pragma strict

class Menu extends MVP {
	var introText: String = "";
	var mainMenuButtonTitle : String = "Main Menu";

	function Menu(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function Menu(){
		super();
	}
	
	function init(){
		super();
		title = "The Court";
	}
	
	function display() {
		populateMenu();
	}
	
	/**
	 * Populate the Page menu 
	 * @return void
	 */
	function populateMenu(){
		reset();
		
		addBackToSceneButton();
		
		if(introText){
			addPageText(introText);
		}
	
		addInstructionsButton();
		if(mainMenuButtonTitle){
			addMainMenuButton();
		}
		
		// Disable background scene
		setBackgroundEnabled(false);
		
	}
	
	function backToScene_Click(caller : iGUIButton){
		mainPresenter.disablePanel(11);
		setBackgroundEnabled(true);
	}
	
	function instructions_Click(caller : iGUIButton){
		mainPresenter.displayMVP('instructions', 'menu');
	}
	
	function mainMenu_Click(caller : iGUIButton){
		Application.LoadLevel("Main Menu");
	}
	
	function addMainMenuButton(){
		addPageButton('tennisCourt', mainMenuButtonTitle);
		/* Useful when multiple scenes are used. 
		var button: iGUIButton;
		button = list.addElement("iGUIButton");
    	button.setWidth(1);
		button.label.text = 'Main Menu';
		button.clickCallback = mainMenu_Click;
		*/
	}
	
	function addBackToSceneButton(){
		var button: iGUIButton;
		button = addPageButton('', 'Back to scene');
		button.clickCallback = backToScene_Click;
	}
	
	function addInstructionsButton(){
		var button: iGUIButton;
		button = list.addElement("iGUIButton");
    	button.setWidth(1);
		button.label.text = 'Instructions';
		button.clickCallback = instructions_Click;
	}
	
	function reset() {
		setTitle(title);
		super();
	}
	
}