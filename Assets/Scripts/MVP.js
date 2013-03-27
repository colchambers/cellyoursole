#pragma strict

class MVP {

	var m: Modal;
	var v: View;
	var p: Presenter;
	var mainPresenter: MainPresenter;
	var panel : ModalPanel  = new ModalPanel();
	var callbackId: String;
	var list: iGUIListBox;
	var hasBackground: Boolean = true;
	var title: String = "MVP";
	var id: String;
	
	var mode: String;
	static public var MODE_STANDARD: String = "s";
	static public var MODE_EDIT: String = "e";

	function MVP (m: Modal, v: View, p: Presenter){
		__construct(m, v, p);
	}
	function MVP (){
		__construct(new Modal(), new View(), new Presenter());
	}
	function __construct(m: Modal, v: View, p: Presenter) {
		this.m = m;
		this.v = v;
		this.p = p;
	}
	
	function init() {
		list = panel.getContainer('list');
	}
	
	function FixedUpdate(){
	}
	
	function initialiseDisplay(){
	}
	
	function display() {
	}
	
	function loadPage(id: String){
		//Debug.Log('id = '+id);
		mainPresenter.displayMVP(id);
	}
	
	function loadPageById(id: String){
		mainPresenter.displayMVP(id);
	}
	
	function OnGUI(){
	}
	
	function call(m: String){
		
	}
	
	function reset() {
		list.removeAll();
	}
	
	/**
	 * Create a default header for a menu subpage.
	 * @param p String id of sub page for back link
	 */
	function prepareSubPage(p: String) {
		reset();
	
		addPageButton(p, 'back');
	}
	
	function prepareSubPage() {
		prepareSubPage('menu');
		setBackgroundEnabled(true);
		// Remove existing fields and buttons from panel
		
		panel.clearItems('field');
		//panel.clearItems('button');
	}
	
	function setTitle(t: String) {
		var menu: iGUIWindow = panel.getContainer('menu');
		menu.label.text = t;
	}
	
	function initialisePageButton(e: iGUIButton, id: String, t: String){
		e.label.text = t;
		e.clickCallback = loadPage_Click;
		e.userData = id;
		//panel.addButton('back', button);
		return e;
	}
	
	function addPageButton (id: String, t: String, s: String, p: iGUIContainer) {
		return initialisePageButton(createButton(p, s), id, t);
	}
	
	function addPageButton (id: String, t: String, s: String, p: iGUIListBox) {
		return initialisePageButton(createButton(p, s), id, t);
	}
	
	function addPageButton (id: String, t: String, s: String) {
		return  addPageButton (id, t, s, list);
	}
	
	function addPageButton (id: String, t: String) {
		return addPageButton (id, t, 'instructionsButton');
	}
	
	function addPageNavigationButton (id: String, t: String) {
		return addPageButton (id, t, 'instructionsButton');
		//panel.addButton('back', button);
	}
	
	function addLoadPageByIdButton(id: String, t: String){
		var button: iGUIButton = addPageButton(id, t, 'none');
		button.clickCallback = loadPageById_Click;
	}
	
	function addPageSwitch (id: String, t: String, c: iGUIEventCallback, s: String) {
		var e: iGUISwitch = createSwitch(list, s);
		e.label.text = t;
		e.valueChangeCallback = c;
		e.userData = id;
		return e;
	}
	
	function addPageSwitch (id: String, t: String, c: iGUIEventCallback) {
		return addPageSwitch (id, t, c, 'instructionsButton');
	}
	
	/*
	 * @param string n Name
	 * @param float r Ratio width to height
	 */
	function addPageImage (n: String, r: float) {
		var image: iGUIImage = list.addElement("iGUIImage");
    	image.setWidth(1);
    	image.setHeight(1*r);
		image.image = Resources.Load(n);
		//panel.addButton('back', button);
	}
	
	/* 
	 * Add a button that opens a url
	 * @param string url url to link to 
	 * @param string t Button text
	 */
	function addPageLink (url: String, t: String) {
		var button: iGUIButton = createButton(list);
		button.label.text = t;
		button.clickCallback = loadUrl_Click;
		button.userData = url;
		//panel.addButton('back', button);
	}
	
	function addPageTitle (t: String) {
		var e: iGUILabel = createLabel(list, 'instructionsTitle');
		e.label.text = t;
		e.setHeight(0.1);
	}
	
	/*
	 * Add a page paragraph specifying height
	 * @param String t Text
	 * @param float h height
	 */
	function addPageText (t: String, h: float, l: iGUIListBox) {
		var e: iGUILabel = createLabel(l);
		e.label.text = t;
		e.setHeight(h);
		
		return e;
	}
	
	/*
	 * Add a page paragraph specifying height
	 * @param String t Text
	 * @param float h height
	 */
	function addPageText (t: String, h: float) {
		return addPageText(t, h, list);
	}
	
	/*
	 * Add a page paragraph with default height
	 * @param String t Text
	 */
	function addPageText (t: String) {
		return addPageText(t, 0.2);
	}
	
	/*
	 * Add a page text field specifying height
	 * @param String t Text
	 * @param float h height
	 */
	function addPageTextField (t: String, v: String, h: float, l: iGUIListBox) {
		var e: iGUITextfield = createTextField(l);
		e.label.text = t;
		e.setValue(v);
		e.setHeight(h);
		
		return e;
	}
	
	/*
	 * Add a page paragraph specifying height
	 * @param iGUIListBox p Parent
	 */
	function addPageListBox (p: iGUIListBox) {
		var l: iGUIListBox = createListBox(p);
		
		return l;
	}
	
	/*
	 * Create a label with standard settings appended to the given element
	 * @param p iGUIElement parent
	 * @param s String style id
	 * @return iGUILabel
	 */
	function createLabel(p: iGUIListBox, s: String){
		var e: iGUILabel = p.addElement('iGUILabel');
		e.style.wordWrap = true;
		e.autoCollapseHeight = true;
		e.dropBasicShadow = true;
		e.style.padding.bottom = 8;
		setElementStyle (e.style, s);

		return e;
	}
	
	function createLabel(p: iGUIListBox){
		return createLabel(p, 'instructions');
	}
	
	/*
	 * Create a text field with standard settings appended to the given element
	 * @param p iGUIElement parent
	 * @param s String style id
	 * @return iGUITextfield
	 */
	function createTextField(p: iGUIListBox, s: String){
		var e: iGUITextfield = p.addElement('iGUITextfield');
		e.style.wordWrap = true;
		//e.autoCollapseHeight = true;
		//e.dropBasicShadow = true;
		e.style.padding.bottom = 8;
		setElementStyle (e.style, s);

		return e;
	}
	
	function createTextField(p: iGUIListBox){
		return createTextField(p, 'instructions');
	}
	
	/*
	 * Create a listbox with standard settings appended to the given element
	 * @param p iGUIListBox parent
	 * @return iGUIListBox
	 */
	function createListBox(p: iGUIListBox){
		var l: iGUIListBox = p.addElement('iGUIListBox');
		return l;
	}
	
	/*
	 * Set the style of the given element
	 * @param s GUIStyle supplied style
	 * @param id String id of style to use
	 * @return void
	 */
	function setElementStyle (s: GUIStyle, id: String) {
		if(id == 'none'){
			return;
		}
		var style : GUIStyle;
		style = mainPresenter.getStyle(id);	
		s.font = style.font;
	}
	
	/*
	 * Set the style of the given element
	 * @param p iGUIElement parent
	 * @param s String style id
	 * @return iGUILabel
	 */
	function setElementFont (s: GUIStyle, id: String) {
		if(id == 'none'){
			return;
		}
		var style : GUIStyle;
		style = mainPresenter.getStyle(id);	
		s.font = style.font;
	}
	
	function initialiseButton(e: iGUIButton, s: String){
		e.style.wordWrap = true;
		e.setWidth(1);
		if(s=='none'){
			return e;
		}
		e.style.fixedHeight = 42;
		e.style.alignment = TextAnchor.MiddleCenter;
		setElementStyle (e.style, s);
		return e;
	}
	
	/*
	 * Create a button with standard settings appended to the given element
	 * @param p iGUIElement parent
	 * @param s String style id
	 * @return iGUILabel
	 */
	function createButton(p: iGUIListBox, s: String){
		var e: iGUIButton = p.addElement('iGUIButton');
		initialiseButton(e, s);
		return e;
	}
	
	function createButton(p: iGUIListBox){
		return createButton(p, 'instructionsButton');
	}
	
	/*
	 * Create a button with standard settings appended to the given element
	 * @param p iGUIElement parent
	 * @param s String style id
	 * @return iGUILabel
	 */
	function createButton(p: iGUIContainer, s: String){
		var e: iGUIButton = p.addElement('iGUIButton');
		initialiseButton(e, s);
		return e;
	}
	
	/*
	 * Create a button with standard settings appended to the given element
	 * @param p iGUIElement parent
	 * @param s String style id
	 * @return iGUILabel
	 */
	function createSwitch(p: iGUIListBox, s: String){
		var e: iGUISwitch = p.addElement('iGUISwitch');
		
		e.labelStyle.wordWrap = true;
		e.setWidth(1);
		if(s=='none'){
			return e;
		}
		
		e.labelStyle.fixedHeight = 30;
		e.labelStyle.alignment = TextAnchor.MiddleCenter;
		setElementStyle (e.labelStyle, s);
		return e;
	}
	
	function createSwitch(p: iGUIListBox){
		return createSwitch(p, 'instructionsButton');
	}

	function back_Click(caller : iGUIButton){
		if(callbackId){
			mainPresenter.displayMVP(callbackId);
			return;
		}
		
		mainPresenter.disablePanel(12);
		
	}
	
	function loadPage_Click(caller : iGUIButton){
		loadPage(caller.userData);
	}
	
	function loadPageById_Click(caller : iGUIButton){
		loadPageById(caller.userData);
	}
	
	function loadUrl_Click(caller : iGUIButton) {
		Application.OpenURL(caller.userData);
	}
	
	function getScript(n: String) {
		var scripts: GameObject;
		switch(n){
			case "sceneInteraction":
				scripts = GameObject.Find('Scripts');
				if(!scripts){
					return null;
				}
				return scripts.GetComponent(SceneInteraction);
				break;
			case "tennisServe":
				scripts = GameObject.Find('Scripts');
				if(!scripts){
					return null;
				}
				return scripts.GetComponent(TennisServe);
				break;
		}
	}
	
	function setBackgroundEnabled(enabled: boolean){
		if(!hasBackground){
			return;
		}
		var script :SceneInteraction = getScript('sceneInteraction');
		if(!script){
			return;
		}
		script.enabled = enabled;
	}
	
	function addSceneItem(id, item) {
		panel.addSceneItem(id, item);
	}
	
	function getSceneItem(id:String){
		return panel.getSceneItem(id);
	}
	
	function getSceneItems(){
		return panel.getSceneItems();
	
	}
	
	function getDraggables(){
		return new GameObject[0];
	}
	
	function getMode(){
		return mode;
	}
	
	function setMode(v: String){
		mode = v;
	}
}