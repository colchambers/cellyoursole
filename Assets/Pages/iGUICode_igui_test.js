import iGUI;
import System.Collections.Generic;
import System.Linq;
import System.DateTime;

Screen.sleepTimeout = SleepTimeout.SystemSetting;

private static var instance : iGUICode_igui_test;
function Awake(){
	instance=this;
}
static function getInstance(){
	return instance;
}
@HideInInspector
var panel6 : iGUIPanel;
@HideInInspector
var slidePanel1 : iGUISlidePanel;
@HideInInspector
var listBox3 : iGUIListBox;
@HideInInspector
var textfield2 : iGUITextfield;
@HideInInspector
var scrollView1 : iGUIScrollView;
@HideInInspector
var container1 : iGUIContainer;
@HideInInspector
var textarea2 : iGUITextarea;

@HideInInspector
var window1 : iGUIWindow;
@HideInInspector
var label1 : iGUILabel;
@HideInInspector
var numberField1 : iGUINumberField;
@HideInInspector
var panel5 : iGUIPanel;
@HideInInspector
var button1 : iGUIButton;
@HideInInspector
var tasksList : iGUIListBox;
@HideInInspector
var taskDetailsPanel1Name : iGUITextfield;
@HideInInspector
var taskDetailsPanel1Done : iGUIButton;
@HideInInspector
var taskDetailsPanel1DateMinute : iGUIDropDownList;
@HideInInspector
var taskDetailsPanel1DateHour : iGUIDropDownList;
@HideInInspector
var taskDetailsPanel1DateDay : iGUIDropDownList;
@HideInInspector
var taskDetailsPanel1DateMonth : iGUIDropDownList;
@HideInInspector
var taskDetailsPanel1DateYear : iGUIDropDownList;
@HideInInspector
var taskDetailsPanel1Duration : iGUITextfield;
@HideInInspector
var taskDetailsPanel1Description : iGUITextarea;
@HideInInspector
var taskDetailsPanel1Delete : iGUIButton;
@HideInInspector
var panel4 : iGUIPanel;
@HideInInspector
var panel3 : iGUIPanel;
@HideInInspector
var slidePanel2 : iGUISlidePanel;
@HideInInspector
var label4 : iGUILabel;
@HideInInspector
var label3 : iGUILabel;
@HideInInspector
var slideShow1 : iGUISlideShow;
@HideInInspector
var floatVerticalSlider1 : iGUIFloatVerticalSlider;
@HideInInspector
var floatHorizontalSlider1 : iGUIFloatHorizontalSlider;
@HideInInspector
var panel2 : iGUIPanel;
@HideInInspector
var panel1 : iGUIPanel;
@HideInInspector
var listBox2 : iGUIListBox;
@HideInInspector
var button2 : iGUIButton;
@HideInInspector
var listBox1 : iGUIListBox;
@HideInInspector
var label2 : iGUILabel;
@HideInInspector
var root1 : iGUIRoot;

// Car Details
var monthsInYear : int = 12;
var daysInMonth : int = 31;
var startYear : int = 2011;
var endYear : int = 2016;

var presenter: MainPresenter;
var tm: TaskModal;
var tv: View;
var tp : TaskPresenter;
var mvp : TaskMVP;
var e: Errors;
var adp: ActivityDetailPanel;
var mmp: MainMenuPanel;
var myDay: MyDay;
var calendar: Calendar;
var settings: Settings;

var buildSettings: BuildSettings;

// Main Menu Panel
@HideInInspector
var mainNavigationPanel : iGUIListBox;
@HideInInspector
var mainNavigationToggle : iGUIButton;
@HideInInspector
var mainNavigationHome : iGUIButton;
@HideInInspector
var mainNavigationMyDay : iGUIButton;


function Start() {

	buildSettings = new BuildSettings();

	presenter = new MainPresenter();
	// Main Menu Panel
	mmp = new MainMenuPanel();
	mmp.addButton("toggle", mainNavigationToggle);
	mmp.addButton("home", mainNavigationHome);
	mmp.addButton("myDay", mainNavigationMyDay);
	mmp.rootPanel = mainNavigationPanel;
	mmp.presenter = presenter.p;
	mmp.init();
	
	//presenter.addPresenter('', presenter);
	adp = new ActivityDetailPanel();
	
	adp.addField("name", taskDetailsPanel1Name);
	adp.addField("duration", taskDetailsPanel1Duration);
	adp.addField("notes", taskDetailsPanel1Description);
	adp.addField("year", taskDetailsPanel1DateYear);
	adp.addField("month", taskDetailsPanel1DateMonth);
	adp.addField("day", taskDetailsPanel1DateDay);
	adp.addField("hour", taskDetailsPanel1DateHour);
	adp.addField("minute", taskDetailsPanel1DateMinute);
	adp.addButton("done", taskDetailsPanel1Done);
	adp.addButton("delete", taskDetailsPanel1Delete);
	
	e = new Errors();	
	tm = new TaskModal();
	tv = new TaskView();
	tp = new TaskPresenter(tm, tv, e);
	mvp = new TaskMVP(tm, tv, tp);
	presenter.addPresenter('task', tp);
	presenter.addView('task', tv);
	presenter.addModal('task', tm);

	tp.adp = adp;
	tp.fieldsBlur = taskDetailsPanel_field_blur;
	tp.fieldsFocus = taskDetailsPanel_field_focus;
	tp.fieldsValueChange_dropdownlist = taskDetailsPanel_field_value_change_dropdownlist;
	tp.tasksList = tasksList;
	tp.tasksList_Init = tasksList_Init;
	tp.init();
	e.textarea = errorsWindowText;
	e.close = errorsWindowClose;
	e.window = errorsWindow;
	
	tp.prepareErrorElements();
	
    //tv.prepareLists(); // refactor. Use on a per panel basis. Call for the panel.
	tv.populatePanels();
	tv.init();
	
	myDay = initialiseActivitiesMVP(presenter, 'myDay');
	calendar = initialiseActivitiesMVP(presenter, 'calendar');
	settings = initialiseSettingsMVP(presenter, 'settings');
	settings.notifications = e;
	
	// Enable initial panel. Ignoring until I have a desired home panel or a config.
	var enabled = tv.enablePanel(tv.panelIds[0]);
	
}

@HideInInspector
var activitiesByDayMenuActivities: iGUIButton;
@HideInInspector
var activitiesByDayMenuToday: iGUIButton;
@HideInInspector
var activitiesByDayMenuCalendar: iGUIButton;
@HideInInspector
var activitiesByDayMenuAdd: iGUIButton;
@HideInInspector
var activitiesByDayMenu : iGUIListBox;
@HideInInspector
var activitiesByDayList : iGUIListBox;
function initialiseActivitiesMVP(presenter: MainPresenter, id: String){
	var mvp: MVP = presenter.createClass(id);
	mvp.mainPresenter = presenter;
	mvp.panel.addButton("activities", activitiesByDayMenuActivities);
	mvp.panel.addButton("today", activitiesByDayMenuToday);
	mvp.panel.addButton("calendar", activitiesByDayMenuCalendar);
	mvp.panel.addButton("add", activitiesByDayMenuAdd);
	mvp.panel.addContainer("menu", activitiesByDayMenu);
	mvp.panel.addContainer("list", activitiesByDayList);
	mvp.panel.rootPanel = activitiesByDayMenu;
	presenter.addMVP(id, mvp);
	mvp.init();
	
	return mvp;
}

@HideInInspector
var generalSettingsMenu : iGUIPanel;
@HideInInspector
var generalSettingsList : iGUIListBox;
function initialiseSettingsMVP(presenter: MainPresenter, id: String){
	var mvp: MVP = presenter.createClass(id);
	mvp.mainPresenter = presenter;
	mvp.panel.addContainer("menu", generalSettingsMenu);
	mvp.panel.addContainer("list", generalSettingsList);
	mvp.panel.rootPanel = generalSettingsMenu;
	presenter.addMVP(id, mvp);
	mvp.init();
	
	return mvp;
}

/**
 * Car Details
 */
@HideInInspector
var taxMonth: iGUIDropDownList;
@HideInInspector
var taxYear: iGUIDropDownList;
@HideInInspector
var motMonth: iGUIDropDownList;
@HideInInspector
var motYear: iGUIDropDownList;
function taxYear_Init(caller : iGUIDropDownList){
	appendNumbersToList(endYear, caller, startYear);
}

function taxMonth_Init(caller : iGUIDropDownList){
	appendNumbersToList(monthsInYear, caller);
}

function motYear_Init(caller : iGUIDropDownList){
	appendNumbersToList(endYear, caller, startYear);
}

function motMonth_Init(caller : iGUIDropDownList){
	appendNumbersToList(monthsInYear, caller);
}

/**
 * Helper functions
 */
function appendNumbersToList(size: int, list: iGUIDropDownList, start: int){
	list.removeAll();
	for(var x=start;x<size+1;x++){
		list.addOption(x.ToString());
	}
}
function appendNumbersToList(size: int, list: iGUIDropDownList){
	appendNumbersToList(size, list, 1);
}

function tasksAdd_Click(caller : iGUIButton){

	caller.userData = 0;
   	taskListButtonClick(caller);
	
}

function tasksList_Init(caller : iGUIListBox){

	var button : iGUIButton;
	var task : Task;
	var i:int;
	
	// Empty list
	caller.removeAll();
	for(task in tm.tasks.Values){
		button = caller.addElement("iGUIButton");
    	button.setWidth(1);
    	button.label.text = task.getField("name");
    	button.userData = task.id;
    	button.clickCallback = taskListButtonClick;
	}
	
}

function taskListButtonClick(caller : iGUIButton){
	var enabled = tv.enablePanel(tv.panelIds[2]);
	tp.populateTaskActivityPanel(caller.userData);
}

function taskDetailsPanel_field_blur(caller: iGUIElement){
	var u: UserData = caller.userData;
	var fv = tv.getElementValue(caller);
	u.value = fv;
	taskDetailHandler(u);
}

function taskDetailsPanel_field_value_change_dropdownlist(caller: iGUIElement){
	var field: iGUIDropDownList = caller;
	var userData: UserData = field.userData;
	userData.value = field.options[field.selectedIndex].text;
	taskDetailHandler(userData);
}

function taskDetailHandler(ud: UserData){
	var task = tm.tasks[ud.id];
	task.setField(ud.field, ud.value);
}

function taskDetailsPanel_field_focus(caller : iGUIElement){
	var fv = tv.getElementValue(caller);
	tv.openTouchKeyboard(fv.ToString());
}

function taskDetailsPanel1Done_Click(caller : iGUIButton){
	tp.validateTask(caller.userData);
	if(e.hasErrors()){
		tp.displayErrors();
		return;
	}
	e.clearErrors();

	tp.saveTasksAndDisplayList();
}

function taskDetailsPanel1Delete_Click(caller : iGUIButton){
	tm.tasks.Remove(caller.userData);
	tp.saveTasksAndDisplayList();
}


/*
 * Progress Tracker
 */
@HideInInspector
var mainMenuPanel1Button1 : iGUIButton;
@HideInInspector
var mainMenuPanel1Button2 : iGUIButton;
@HideInInspector
var mainMenuPanel1Button3 : iGUIButton;
@HideInInspector
var mainMenuPanel1Button4 : iGUIButton;
@HideInInspector
var mainMenuPanel1Button5 : iGUIButton;
@HideInInspector
var mainMenuPanel1Button6 : iGUIButton;
@HideInInspector
var mainMenuPanel1ButtonAnimalCell : iGUIButton;
@HideInInspector
var mainMenuPanel1ButtonRoomDemo : iGUIButton;
@HideInInspector
var mainMenuPanel1ButtonGLUT4 : iGUIButton;
@HideInInspector
var mainMenuPanel1ButtonStandardisedScene : iGUIButton;
@HideInInspector
var mainMenuPanel1ButtonPhonemes : iGUIButton;
@HideInInspector
var mainMenuPanel1ButtonReactions : iGUIButton;
@HideInInspector
var mainMenuPanel1ButtonSettings : iGUIButton;
@HideInInspector
var progressTrackerPanelDone : iGUIButton;
@HideInInspector
var tasksPanelDone : iGUIButton;
var Done_home : iGUIButton;

function mainMenuPanel1Button1_Click(caller : iGUIButton){
	var enabled = tv.enablePanel(tv.panelIds[3]);
}

function mainMenuPanel1Button2_Click(caller : iGUIButton){
	Application.LoadLevel("tennis court");
}

function mainMenuPanel1Button3_Click(caller : iGUIButton){
	var enabled = tv.enablePanel(tv.panelIds[1]);
}

function mainMenuPanel1Button4_Click(caller : iGUIButton){
	var enabled = tv.enablePanel(tv.panelIds[7]);
}

function mainMenuPanel1Button5_Click(caller : iGUIButton){
	var enabled = tv.enablePanel(tv.panelIds[5]);
}

function mainMenuPanel1Button6_Click(caller : iGUIButton){
	Application.LoadLevel("Menu");
}

function mainMenuPanel1ButtonAnimalCell_Click(caller : iGUIButton){
	Application.LoadLevel("Animal Cell");
}

function mainMenuPanel1ButtonRoomDemo_Click(caller : iGUIButton){
	Application.LoadLevel("Apartment Scene");
}

function mainMenuPanel1ButtonGLUT4_Click(caller : iGUIButton){
	Application.LoadLevel("GLUT4_home");
}

function mainMenuPanel1ButtonStandardisedScene_Click(caller : iGUIButton){
	Application.LoadLevel("standardised cell scene");
}

function mainMenuPanel1ButtonPhonemes_Click(caller : iGUIButton){
	Application.LoadLevel("Phoneme");
}

function mainMenuPanel1ButtonReactions_Click(caller : iGUIButton){
	Application.LoadLevel("Reactions");
}

function mainMenuPanel1ButtonSettings_Click(caller : iGUIButton){
	var enabled = tv.enablePanel(tv.panelIds[10]);
}

function tasksPanelDone_Click(caller : iGUIButton){
	tv.displayMainMenu();
}

function Done_home_Click(caller : iGUIButton){
	tv.displayMainMenu();
}

function progressTrackerList_Init(caller : iGUIListBox){

	var button : iGUIButton;
	var task : Task;
	var i:int;
	
	// Empty list
	caller.removeAll();
	for(task in tm.tasks.Values){
		button = caller.addElement("iGUIButton");
    	
    	button.label.text = task.name;
    	button.userData = task.id;
    	button.clickCallback = progressTrackerListButtonClick;
	}
	
}

function progressTrackerListButtonClick(caller : iGUIButton){
	var enabled = tv.enablePanel(tv.panelIds[6]);
	tp.populateTaskActivityPanel(caller.userData);
}

/*
 * Experiment
 */
@HideInInspector
var experiment : iGUISlidePanel;
@HideInInspector
var textfield1 : iGUITextfield;
@HideInInspector
var textarea1 : iGUITextarea;

function textfield1_Focus(caller : iGUITextfield){
	tv.openTouchKeyboard(caller.value.ToString());
}
function textarea1_Focus(caller : iGUITextarea){
	tv.openTouchKeyboard(caller.value.ToString());
}

/*
 * Errors Window
 */
@HideInInspector
var errorsWindowText: iGUITextarea;
@HideInInspector
var errorsWindowClose : iGUIButton;
@HideInInspector
var errorsWindow: iGUIWindow;
