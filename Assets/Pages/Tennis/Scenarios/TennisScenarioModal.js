#pragma strict
import System.IO;
var item : TennisScenarioItem;

class TennisScenarioModal extends Modal{
	// Item Details
	var items : Dictionary.<int, TennisScenarioItem>;
	var defaultItemId: int = 1;
	
	function TennisScenarioModal(){
		super();
		setListName("tennis_scenarios");
		setCurrentMaxIdName("tennis_scenarios_current_index");
		persistentDataPath = '/mnt/extSdCard/cell/court/scenarios';
		this.loadCurrentMaxId();
		items = this.load();
	}
	
	function setCurrentItem(i: TennisScenarioItem){
		currentItem = i;
	}

	function load(){
		// Get file names in application persistent path
		var p: String = getPersistentDataFolderPath('a')+'/'+listName;
		var f: String[];
		var currentPath: String = p;
		if(FileSystem.directoryExists(p)){
			f = FileSystem.getFiles(p);
		}
		
		p = getPersistentDataFolderPath()+'/'+listName;
		if((!f || !f.Length) && FileSystem.directoryExists(p)) {
			// Load from sdcard root. Remains on uninstall
			currentPath = p;
			f = FileSystem.getFiles(p);
		}
		
		if (!f || !f.Length) {
			f = PlayerPrefsX.GetStringArray(listName);
		}
		
		items = new Dictionary.<int, TennisScenarioItem>();
		var item : TennisScenarioItem;
		var maxCurrentId : int = this.getCurrentMaxId();

		for(var name in f){
			if(!isModalFilename(name)){
				continue;
			}
			item = new TennisScenarioItem(FileSystem.fileReadAllLines(name)[0]);
			items.Add(item.id, item);
			maxCurrentId = item.id>maxCurrentId?item.id:maxCurrentId;
		}
		
		if(maxCurrentId>currentMaxId){
			this.saveCurrentMaxId(maxCurrentId);
		}
		
		return items;
	}
	
	function save(items:Dictionary.<int,TennisScenarioItem>){
		var t : String[] =  new String[items.Count];
		var x=0;
		for(var item:TennisScenarioItem in items.Values){
			t[x] = item.toString();
			x++;
		}
		
		Debug.Log('Save items');
		//saveFile(t);
		
		//return PlayerPrefsX.SetStringArray(listName, t);
	}
	
	function save(){
		save(items);
	}
		
	function saveItem(item: TennisScenarioItem){
		var s = item.toString();
		
		saveFile(s, '/'+listName, item.id+'.'+dataFileExtension);
	}
	
	function deleteItem(id: int){
		// Can't delete default scenario
		if(id==defaultItemId){
			return;
		}
		var item = getItemById(id);
		
		// Remove from item list
		items.Remove(item.id);

		// Delete saved file
		var n: String = item.id+'.'+dataFileExtension;
		var p: String = getPersistentDataFolderPath()+'/'+listName+'/'+n;
		
		if(FileSystem.fileExists(p)){
			FileSystem.deleteFile(p);
		}
		
		p = getPersistentDataFolderPath('a')+'/'+listName+'/'+n;
		if(FileSystem.fileExists(p)){
			FileSystem.deleteFile(p);
		}
	}

	function getItemById(id : int){
		if(!id){
			item = new TennisScenarioItem(getNextMaxId()); 
			// Set current date
			//var d = System.DateTime.Now.ToString('yyyyMMddHHmm');
			//item.datetime.setDate(d);
			items.Add(item.id, item);
			return item;
		}
		return items[id];
	}
	
	function createScreenshot(id: int){
		var n: String = id+'.'+imageFileExtension;
		var p: String = getPersistentDataFolderPath()+'/'+listName+'/'+n;
		Debug.Log('p = '+p);
		
		Application.CaptureScreenshot(p);
	}
}