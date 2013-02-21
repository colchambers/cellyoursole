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
		//Debug.Log('mvp = '+mvp);
		mvp.callbackId = callbackId;
		var panel: iGUIElement = mvp.panel.rootPanel;
		var panelId: int = getPanelIdFromPanel(panel);
		//Debug.Log(panelId);
		mvp.display();
		enablePanel(panelId);
		setCurrentMVP(mvp);
		return mvp;
	}
	
	function displayItemMenu(id: String){
		var mvp:Options = getMVP('items');
		mvp.m.setCurrentMaxIdName(id);
		//Debug.Log('id = '+id);
		//mvp.display();
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
		var menuPanel = panel.getContainer("menuPanel");
		mvp.panel.addContainer("menu", menuPanel);
		mvp.panel.addContainer("list", panel.getContainer("menuPanelList"));
		mvp.panel.rootPanel = menuPanel;
		addMVP(pageId, mvp);
		mvp.init();
		
		return mvp;
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