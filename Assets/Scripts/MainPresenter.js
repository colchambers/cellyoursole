#pragma strict

class MainPresenter extends MVP {
	var currentView: String = 'task';
	var currentMVP: MVP;
	var pageDetailsById: Dictionary.<String, PageModal>;
	var configuration: ApplicationConfiguration;
	
	function enablePanel(id: int, disableOthers: boolean){
		var v = p.getView(currentView);
		return v.enablePanel(v.panelIds[id], disableOthers);
	}
	
	function enablePanel(id: int){
		return enablePanel(id, true);
	}
	
	function disablePanel(id: int, disableOthers: boolean){
		var v = p.getView(currentView);
		//Debug.Log(v);
		//Debug.Log(v.panelIds);
		return v.disablePanel(v.panelIds[id], disableOthers);
	}
	
	function disablePanel(id: int){
		return disablePanel(id, true);
	}
	
	function createClass(name: String){
	
		var className = "";
		
		switch(name){
			case 'calendar': 
				return new Calendar();
				break;
			case 'settings': 
				return new Settings();
				break;
			case 'menu': 
				return new Menu();
				break;
			case 'instructions': 
				return new Instructions();
				break;
			case 'options': 
				return new Options();
				break;
			case 'phoneme': 
				return new PhonemeMenu();
				break;
			case 'reactions': 
				return new ReactionsMenu();
				break;
			case 'tennisOptions':
				className = "TennisOptions";
				break;
			default:
				var page = configuration.getPageById(name);
				if(page && page.className){
					className = page.className;
				}
		}
		
		var type = Type.GetType(className);
		//Debug.Log('className = '+className);
		//Debug.Log(type);
		
		if(!type){
			return;
		}
		return new type();
	}
	
	function getPanelIdFromPanel(panel: iGUIElement){
		var v = p.getView(currentView);
		return v.getPanelIdFromPanel(panel);
	}
	
	function displayMVP(id: String){
		return displayMVP(id, "");
	}
	
	function displayMVP(id: String, callbackId: String){
		//Debug.Log('id = '+id);
		var mvp = getMVP(id);
		mvp.callbackId = callbackId;
		mvp.display();
		setCurrentMVP(mvp);
		return mvp;
	}
	
	function initialiseMVP(id: String){
		var mvp = getMVP(id);
		mvp.initialiseDisplay();
		return mvp;
	}
	
	function displayItemMenu(id: String){
		var mvp:Options = getMVP('items');
		mvp.m.setCurrentMaxIdName(id);
		initialiseMVP('items');
		displayMVP('items');
	}
	
	function setCurrentMVP(m: MVP){
		currentMVP = m;
	}
	
	function getCurrentMVP(){
		return currentMVP;
	}
	
	function getStyle(n: String){
		return p.getView('main').getStyle(n);
	}
	
	function getComponent(n: String){
		return p.getView('main').getComponent(n);
	}
	
	function createCameraWithParentId(n: String, parentId: String) {
	
		// Find parent object
		var parent = GameObject.Find(parentId);
		if(!parent){
			return null;
		}
		// Create camera
		createCamera(n, parent);
		
		return parent;
	}
	/**
	 * Create a camera and camera parent GameObject.
	 * @param n String name
	 * @param p Vector3 position
	 * @param r Quaternion rotation
	 * @param t String type
	 */
	function createCameraAndParent(n:String, p: Vector3, r: Vector3, t: String){
		var parent: GameObject = new GameObject(n+"Parent");
		parent.transform.position.x = p.x;
		parent.transform.position.y = p.y;
		parent.transform.position.z = p.z;
		
		parent.transform.rotation = Quaternion.Euler(r.x, r.y, r.z);
		// Camera shouldn't be part of scene interaction
		parent.layer = LayerMask.NameToLayer("Ignore Raycast");
		
		if(t == 'character'){
			var cc: CapsuleCollider = parent.AddComponent(CapsuleCollider);
			cc.radius = 0.83;
			cc.height = 1.5;
			
			var rb: Rigidbody = parent.AddComponent(Rigidbody);
			rb.isKinematic = true;
			rb.useGravity = false;
		}
		
		createCamera(n, parent);
		//parent.transform.localPosition.z = -10;
		
		return parent;
	}
	
	function createCameraAndParent(n:String, p: Vector3, r: Vector3){
		return createCameraAndParent(n, p, r, '');
	}
	
	function createCamera(n: String, parent: GameObject){
		var go: GameObject = new GameObject(n);
		go.transform.parent = parent.transform;
		go.transform.localPosition = new Vector3(0,0,0);
		go.transform.localRotation = new Quaternion(0,0,0,0);
		var c: Camera = go.AddComponent(Camera);
		c.enabled = false;
		go.AddComponent("FlareLayer");
		go.AddComponent("GUILayer");
		go.tag = 'MainCamera';
		return go;
	}
	
	function createCamera(n: String, p: Vector3){
		var go: GameObject = new GameObject(n);
		go.transform.position = p;
		var c: Camera = go.AddComponent(Camera);
		c.enabled = false;
		go.AddComponent("FlareLayer");
		go.AddComponent("GUILayer");
		go.tag = 'MainCamera';
		return go;
	}
	
	function playSound(s: String){
		// Creatwe game object
		var go: GameObject = new GameObject('Phoneme Sound');
		// Create Audio source
		var audio: AudioSource = go.AddComponent(AudioSource);
		// Create audio clip
		var clip: AudioClip = Resources.Load(s) as AudioClip;
		
		// Play Sound
		audio.PlayClipAtPoint(clip, Vector3(0,0,0));
	}
	
	function getScenePageId(id){
	
		var pageId = id;
		/**
		 * If there are multiple versions of the page. Figure out which 
		 * version we need.
		 */
		switch(id){
			// Page ids with multiple versions
			case 'items':
			case 'menu':
			case 'options':
			case 'instructions':
				// Get the page details for this scene id
				var p = configuration.getPageByLevelId(Application.loadedLevelName);
				var page = configuration.getChildPageByPageId(p, id);
				
				//Debug.Log(id);
				
				//Debug.Log('page = ');
				//Debug.Log(page);
				if(page){
					pageId = page.id;
					//Debug.Log('pageId = '+pageId);
				}

				break;
		}
		
		return pageId;
		
	}
	
	function initialiseMenuMVP(id: String){
	
		var pageId = getScenePageId(id);
		//Debug.Log('pageId = '+pageId);
		var mvp: MVP = createClass(pageId);
		if(!mvp){
			return false;
		}
		mvp.mainPresenter = this;
		mvp.id = pageId;
		
		// Create menu panel
		var root: iGUIRoot = panel.getContainer("root");
		var w: iGUIWindow = root.addElement('iGUIWindow');
		var menuId = pageId+'Window';
		w.variableName = menuId;
		w.isDraggable = true;
		var l: iGUIListBox = w.addElement('iGUIListBox');
		var b: iGUIButton = w.addElement('iGUIButton');
		var wRect: Rect = w.getAbsoluteRect();
		var menuWidth = wRect.width;
		//w.style.border.top = 1;
		var bWidth = menuWidth*0.25;
		b.setWidth(bWidth);
		var bX = (menuWidth*0.8);
		bX = 0;
		b.setX(bX);
		var height = wRect.height;
		var bY = height*0.25*-1;
		bY = 0;
		b.setY(bY);
		b.label.text = 'x';
		b.userData = pageId;
		b.clickCallback = mvpToggle_Click;
		mvp.panel.addContainer("menu", w);
		mvp.panel.addContainer("list", l);
		mvp.panel.rootPanel = w;
		// Hide Window
		w.setEnabled(false);
		addMVP(pageId, mvp);
		mvp.init();
		
		return mvp;
	}
	
	function mvpToggle(id){
		var mvp: MVP = getMVP(id);
		var m: iGUIWindow = mvp.panel.getContainer("menu");
		m.setEnabled(!m.enabled);
		if(m.enabled){
			setCurrentMVP(mvp);
		}
	}
	
	function mvpShow(id){
		var mvp: MVP = getMVP(id);
		var m: iGUIWindow = mvp.panel.getContainer("menu");
		m.setEnabled(true);
		setCurrentMVP(mvp);
	}
	
	function mvpHide(id){
		var mvp: MVP = getMVP(id);
		var m: iGUIWindow = mvp.panel.getContainer("menu");
		m.setEnabled(false);
	}
	
	function mvpToggle_Click(caller : iGUIButton){
		Debug.Log('caller.userData = '+caller.userData);
		mvpToggle(caller.userData);
	}
	
	function initialiseTextMVP(id: String){
		var mvp: MVP = createClass(id);
		mvp.mainPresenter = this;
		
		var menuPanel = panel.getContainer("textWindow");
		mvp.panel.addContainer("menu", menuPanel);
		mvp.panel.addContainer("list", panel.getContainer("textWindowLabel"));

		mvp.panel.rootPanel = menuPanel;
		addMVP(id, mvp);
		mvp.init();
		
		return mvp;
	}
	
	/**
	 * Presenter convenience methods. Legacy from original design
	 */
	function getModal(n:String){
		return p.getModal(n);
	}
	
	function addModal(fn:String, f){
		p.addModal(fn, f);
	}
	
	function addView(fn:String, f){
		p.addView(fn, f);
	}
	
	function getMVP(id:String){
		var pageId = getScenePageId(id);
		loadMVP(pageId);
		return p.getMVP(pageId);
	}
	
	function addMVP(fn:String, f){
		p.addMVP(fn, f);
	}
	
	/**
	 * Load an MVP into the MVP array
	 */
	function loadMVP(pageId){
		if(p.getMVP(pageId)){
			return;
		}
		
		initialiseMenuMVP(pageId);
		return;
		
	}
	
	function getPresenter(n:String){
		return p.getPresenter(n);
	}
	
	function addPresenter(n:String, f){
		p.addPresenter(n, f);
	}
}