#pragma strict
import System.IO;
var task : Task;

class TaskModal extends Modal{
	// Task Details
	var tasks : Dictionary.<int, Task>;
	
	function TaskModal(){
		super();
		setListName("tasks");
		setCurrentMaxIdName("tasks_current_index");
		//persistentDataPath = '/mnt/sdcard/cell';
		//persistentDataPath = '/mnt/extsdcard/Android/data/uk.co.colchambers.cell_your_sole/cell';
		persistentDataPath = '/mnt/extSdCard/cell';
		this.loadCurrentMaxId();
		tasks = this.load();
		
	}

	function load(){
		// Read from file in application persistent path
		var p: String = getPersistentDataFilePath('a');
		var t: String[];
		if(FileSystem.fileExists(p)){
			t = FileSystem.fileReadAllLines(p);
		}
		
		if((!t || !t.Length) && FileSystem.fileExists(getPersistentDataFilePath())) {
			// Load from sdcard root. Remains on uninstall
			t = FileSystem.fileReadAllLines(getPersistentDataFilePath());
		}
		
		if (!t || !t.Length) {
			t = PlayerPrefsX.GetStringArray(listName);
		}
		
		tasks = new Dictionary.<int, Task>();
		var task : Task;
		var maxCurrentId : int = this.getCurrentMaxId();

		for(var x=0;x<t.length;x++){
			task = new Task(t[x]);
			tasks.Add(task.id, task);
			maxCurrentId = task.id>maxCurrentId?task.id:maxCurrentId;
		}
		
		if(maxCurrentId>currentMaxId){
			this.saveCurrentMaxId(maxCurrentId);
		}
		return tasks;
	}
	
	function save(tasks:Dictionary.<int,Task>){
		var t : String[] =  new String[tasks.Count];
		var x=0;
		for(var task:Task in tasks.Values){
			t[x] = task.toString();
			x++;
		}
		
		Debug.Log('Save tasks');
		// Save as a file in application persistent path. Removed on app uninstall
		FileSystem.fileWriteAllLines(getPersistentDataFilePath('a'), t);
		
		// Save to sdcard root. Remains on uninstall
		createPersistentDataDirectory();
		//p = persistentDataPath+'/'+listName+'.txt';
		FileSystem.fileWriteAllLines(getPersistentDataFilePath(), t);
		
		//return PlayerPrefsX.SetStringArray(listName, t);
	}
	
	function save(){
		save(tasks);
	}

	function getTaskById(id : int){
		if(!id){
			task = new Task(getNextMaxId()); 
			// Set current date
			var d = System.DateTime.Now.ToString('yyyyMMddHHmm');
			task.datetime.setDate(d);
			tasks.Add(task.id, task);
			return task;
		}
		return tasks[id];
	}
}

