#pragma strict

/**
 * Describes and records the functionality and data a page contains
 */
class PageModal {
	static var TYPE_SCENE = 1; // Default template displayed when scene is loaded
	static var TYPE_PAGE = 2;
	var id: String; // Page id. Used by MVP as page reference
	var className: String; // Name of page class
	var type: int; // Type of the page. Scene, page
	var levelName: String; // Name of scene file
	var pageIds: Dictionary.<String, String>; // Ids of child pages
	
	function PageModal() {
		init();
	}
	
	function init(){
		pageIds = new Dictionary.<String, String>();	
	}
	function getPageId(n:String){
		if(!pageIds.ContainsKey(n)){
			return null;
		}
		
		return pageIds[n];
	}
	
	function addPageId(n:String, v){
		pageIds.Add(n, v);
	}
	
}