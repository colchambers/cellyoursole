#pragma strict
/**
 * contains basic configuration options for the application
 */ 
class ApplicationConfiguration {
	
	var pageDetailsById: Dictionary.<String, PageModal>;
	var pageIdByLevelId: Dictionary.<String, String>;
	function init(){
		populatePageDetailsById();
		populatePageIdByLevelId();
	}
	
	/**
	 * Link each page id to its classname and other details
	 * @return void
	 */
	function populatePageDetailsById() {
		pageDetailsById = new Dictionary.<String, PageModal>();
		
		/*
		 * Main Menu
		 */
		var m = new PageModal();
		/*
		m = new PageModal();
		m.id = 'mainMenu';
		m.className = 'MainMenuOptions';
		m.levelName = 'Main Menu';
		//m.addPageId('instructions', 'mainMenuInstructions');
		m.addPageId('menu', 'mainMenu');
		pageDetailsById.Add(m.id, m);
		*/
		
		/*
		 * Tennis Court
		 */
		m = new PageModal();
		m.id = 'tennisOptions';
		m.className = 'TennisOptions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisInstructions';
		m.className = 'TennisInstructions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisItems';
		m.className = 'TennisItems';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisCourt';
		m.className = 'TennisMenu';
		m.levelName = 'tennis court';
		m.addPageId('options', 'tennisOptions');
		m.addPageId('instructions', 'tennisInstructions');
		m.addPageId('items', 'tennisItems');
		m.addPageId('menu', 'tennisCourt');
		pageDetailsById.Add(m.id, m);
		
		/*
		 * Tennis Serve Game
		 */
		m = new PageModal();
		m.id = 'tennisServeGameOptions';
		m.className = 'TennisServeGameOptions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisServeGame';
		m.className = 'TennisServeMenu';
		m.levelName = 'ServeGame';
		m.addPageId('options', 'tennisServeGameOptions');
		m.addPageId('instructions', 'tennisInstructions');
		m.addPageId('items', 'tennisItems');
		m.addPageId('menu', 'tennisServeLesson');
		m.addPageId('mainMenu', 'mainMenu');
		pageDetailsById.Add(m.id, m);
		
		/*
		 * Tennis Serve Challenge
		 */
		m = new PageModal();
		m.id = 'mainMenu';
		m.className = 'MainMenuOptions';
		m.levelName = 'Serve';
		m.addPageId('options', 'mainMenu');
		m.addPageId('serve', 'tennisServeLesson');
		m.addPageId('mainMenu', 'mainMenu');
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisServeLesson';
		m.className = 'TennisServeOptions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisServeTopSpinLesson';
		m.className = 'TennisServeTopSpinOptions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisServeSliceLesson';
		m.className = 'TennisServeSliceOptions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisServeHeightLesson';
		m.className = 'TennisServeHeightOptions';
		pageDetailsById.Add(m.id, m);
		
		/*
		 * Garden
		 */
		m = new PageModal();
		m.id = 'garden';
		m.className = 'GardenMenu';
		m.levelName = 'Garden';
		m.addPageId('menu', 'garden');
		pageDetailsById.Add(m.id, m);
		
	}
	
	/**
	 * Simplifies finding a root page for a scene.
	 * Organises root pages by relevant level name
	 */
	function populatePageIdByLevelId(){
		pageIdByLevelId = new  Dictionary.<String, String>();
		
		for(var p in pageDetailsById.Values){
			if(!p.levelName){
				continue;
			}
			
			pageIdByLevelId.Add(p.levelName, p.id);
		}
		
		// Debug.Log('pageIdByLevelId = ');
		// Debug.Log(pageIdByLevelId);
	}
	
	function getPageByLevelId(id){
		//ensureConfigurationLoaded();
		if(!pageIdByLevelId.ContainsKey(id)){
			return null;
		}
		
		return pageDetailsById[pageIdByLevelId[id]];
	}
	
	function ensureConfigurationLoaded() {
		if(pageIdByLevelId){
			return;
		}
		
		init();
	}
	
	function getChildPageByPageId(parent: PageModal, id: String){
		if(!parent || !parent.getPageId(id)) {
			return null;
		}
		
		return  getPageById(parent.getPageId(id));
	}
	
	function getPageById(id){
		if(!pageDetailsById.ContainsKey(id)){
			return null;
		}
		
		return pageDetailsById[id];
	}
	
}