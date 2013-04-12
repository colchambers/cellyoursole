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
		m.id = 'mainMenuInstructions';
		m.className = 'MainMenuInstructions';
		pageDetailsById.Add(m.id, m);
		*/
		
		m = new PageModal();
		m.id = 'mainMenu';
		m.className = 'MainMenu';
		m.levelName = 'Main Menu';
		//m.addPageId('instructions', 'mainMenuInstructions');
		m.addPageId('menu', 'mainMenu');
		pageDetailsById.Add(m.id, m);
		
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
		 * Tennis Serve
		 */
		m = new PageModal();
		m.id = 'tennisServeOptions';
		m.className = 'TennisServeOptions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'tennisServeLesson';
		m.className = 'TennisServeMenu';
		m.levelName = 'Serve';
		m.addPageId('options', 'tennisServeOptions');
		m.addPageId('instructions', 'tennisInstructions');
		m.addPageId('items', 'tennisItems');
		m.addPageId('menu', 'tennisServeLesson');
		pageDetailsById.Add(m.id, m);
		
		/*
		 * Tennis Serve Height
		 */
		m = new PageModal();
		m.id = 'tennisServeHeightLesson';
		m.className = 'TennisServeOptions';
		m.levelName = 'Serve Height';
		m.addPageId('options', 'tennisServeHeightLesson');
		//m.addPageId('menu', 'tennisServeHeightLesson');
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
		
		/*
		 * Shadow Room
		 */
		m = new PageModal();
		m.id = 'roomOptions';
		m.className = 'RoomOptions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'roomItems';
		m.className = 'RoomItems';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'room';
		m.className = 'RoomMenu';
		m.levelName = 'Apartment Scene';
		m.addPageId('options', 'roomOptions');
		m.addPageId('menu', 'room');
		m.addPageId('items', 'roomItems');
		pageDetailsById.Add(m.id, m);
		
		/*
		 * Cell
		 */
		m = new PageModal();
		m.id = 'cellOptions';
		m.className = 'CellOptions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'cellInstructions';
		m.className = 'CellInstructions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'cellItems';
		m.className = 'CellItems';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'cell';
		m.className = 'CellMenu';
		m.levelName = 'Animal Cell';
		m.addPageId('options', 'cellOptions');
		m.addPageId('instructions', 'cellInstructions');
		m.addPageId('items', 'cellItems');
		m.addPageId('menu', 'cell');
		pageDetailsById.Add(m.id, m);
		
		/*
		 * Brain
		 */
		m = new PageModal();
		m.id = 'brainInstructions';
		m.className = 'BrainInstructions';
		pageDetailsById.Add(m.id, m);
		
		m = new PageModal();
		m.id = 'brain';
		m.className = 'BrainMenu';
		m.levelName = 'Brain';
		m.addPageId('instructions', 'brainInstructions');
		m.addPageId('menu', 'brain');
		pageDetailsById.Add(m.id, m);
		
		/*
		 * Lab
		 */
		m = new PageModal();
		m.id = 'lab';
		m.className = 'LabMenu';
		m.levelName = 'Lab';
		m.addPageId('menu', 'lab');
		pageDetailsById.Add(m.id, m);
		
		/*
		 * Reactions
		 */
		m = new PageModal();
		m.id = 'reactions';
		m.className = 'ReactionsMenu';
		m.levelName = 'Reactions';
		pageDetailsById.Add(m.id, m);

		/*
		 * Phonemes
		 */
		m = new PageModal();
		m.id = 'phonemes';
		m.className = 'PhonemeMenu';
		m.levelName = 'Phonemes';
		pageDetailsById.Add(m.id, m);
		
		/*
		 * MyDay
		 */
		
		m = new PageModal();
		m.id = 'myDay';
		m.className = 'MyDay';
		m.levelName = 'Tasks';
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
		
		//Debug.Log('pageIdByLevelId = ');
		//Debug.Log(pageIdByLevelId);
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