import iGUI;

private static var instance : iGUICode_tenniscourt;
function Awake(){
	instance=this;
}
static function getInstance(){
	return instance;
}
@HideInInspector
var listBox1 : iGUIListBox;
@HideInInspector
var switch1 : iGUISwitch;
@HideInInspector
var label2 : iGUILabel;
@HideInInspector
var image1 : iGUIImage;
var instructionsStyle : GUIStyle;
var instructionsTitleStyle : GUIStyle;
var instructionsButtonStyle : GUIStyle;
var fixedWidthStyle: GUIStyle;

@HideInInspector
var button1 : iGUIButton;
@HideInInspector
var label1 : iGUILabel;
@HideInInspector
var window1 : iGUIWindow;

@HideInInspector
var showMenu : iGUIButton;
@HideInInspector
var showOptions : iGUIButton;
@HideInInspector
var root1 : iGUIRoot;

private var configuration: ApplicationConfiguration;
var presenter: MainPresenter;
private var v: View;

private var menu: Menu;
private var instructions: Instructions;

private var options: Options;
private var optionsId: String; // Id for options page and class

var elementText: TextMesh;

function Start() {
	configuration = ApplicationConfiguration();
	configuration.init();
	
	var type = Type.GetType('MainPresenter');
	presenter = new type();
	presenter.configuration = configuration;
	var si :SceneInteraction = presenter.getScript('sceneInteraction');
	if(si){
		si.presenter = presenter;
	}
	
	/*var ts:TennisServe = presenter.getScript('tennisServe');
	if(ts){
		ts.presenter = presenter;
	}*/

	v = new View();
	v.populatePanels();
	v.init();
	v.addStyle('instructions', instructionsStyle);
	v.addStyle('instructionsTitle', instructionsTitleStyle);
	v.addStyle('instructionsButton', instructionsButtonStyle);
	v.addStyle('fixedWidth', fixedWidthStyle);
	
	v.addComponent('elementText', elementText);

	presenter.addView('main', v);
	presenter.currentView = 'main';
	presenter.panel.addContainer("root", root1);
	presenter.disablePanel(11); // Hide demo panel
	initMenuPanels(presenter);
	initTextPanels(presenter);
	
	presenter.initialiseMVP('menu');
	presenter.initialiseMVP('options');
	presenter.setCurrentMVP(presenter.getMVP('options'));
	
	// Set up view options
	if(Application.loadedLevelName == 'Apartment Scene'){
		presenter.createCameraAndParent("Walking Camera", new Vector3(0, 1.86, -0.1223917), 
			new Vector3(12.70337,0,0), 'character');
		presenter.createCameraAndParent("Top Camera", new Vector3(0.2, 15.93, 0.27), 
			new Vector3(90,270,0));
	}
	/*
	
	if(Application.loadedLevelName == 'Phoneme'){
		menu = presenter.initialiseMenuMVP('phoneme');
		presenter.displayMVP('phoneme');
	}
	
	if(Application.loadedLevelName == 'Reactions'){
		var menu: ReactionsMenu = presenter.initialiseMenuMVP('reactions');
		presenter.displayMVP('reactions');
	}
	*/
	
	//var path = '/mnt/extSdCard/cell/court/scenarios/tennis_scenarios';
	//path = 'test/there/we/are.txt';
	//var path = 'C:/Users/colin/AppData/LocalLow/ColChambers/court/tennis_scenarios';
	//FileSystem.createDirectory(path);
	
}

function FixedUpdate(){
	var mvp = presenter.getCurrentMVP();
	if(!mvp){
		return;
	}
	mvp.FixedUpdate();
	
}
@HideInInspector
var menuPanel : iGUIWindow;
@HideInInspector
var menuPanelList : iGUIListBox;

function initMenuPanels(presenter: MainPresenter){
	presenter.panel.addContainer("menuPanel", menuPanel);
	presenter.panel.addContainer("menuPanelList", menuPanelList);
}

@HideInInspector
var textWindow : iGUIWindow;
@HideInInspector
var textWindowLabel : iGUILabel;

function initTextPanels(presenter: MainPresenter){
	presenter.panel.addContainer("textWindow", textWindow);
	presenter.panel.addContainer("textWindowLabel", textWindowLabel);
}

function OnGUI(){
	var mvp = presenter.getCurrentMVP();
	if(!mvp){
		return;
	}
	mvp.OnGUI();
}