#pragma strict

class Modal {
	var currentMaxIdName: String = "";
	var currentMaxId: int = 0; // It's really current max id
	var listName: String = "";
	var persistentDataPath : String;
	var dataFileExtension: String = "csv";
	var imageFileExtension: String = 'png';
	var currentItem: Item; // Currently selected item
	
	function Modal (){
		
	}
	
	function getCurrentItem(){
		return currentItem;
	}
	
	function setCurrentItem(i: Item){
		currentItem = i;
	}
	
	function getCurrentMaxId(){
		return currentMaxId;
	}

	function loadCurrentMaxId(){
		currentMaxId = PlayerPrefs.GetInt(currentMaxIdName);
		return currentMaxId;
	}
	
	function getNextMaxId(){
		currentMaxId++;
		return currentMaxId;
	}
	
	function setCurrentMaxId(id:int){
		currentMaxId = id;
	}
	
	function saveCurrentMaxId(currentMaxId){
		setCurrentMaxId(currentMaxId);
		PlayerPrefs.SetInt(currentMaxIdName, currentMaxId);
	}
	
	function setCurrentMaxIdName(name: String){
		currentMaxIdName = name;
	}
	
	function getCurrentMaxIdName(){
		return currentMaxIdName;
	}
	
	function setListName(name: String){
		listName = name;
	}
	/**
	 * Encode given string in html format
	 * @param string s string to encode
	 * @return string
	 */
	public static function encode(s: String){
		return s.Replace(',', '&comma;');
	}
	
	/**
	 * Decode given string from html format
	 * @param string s string to decode
	 * @return string
	 */
	public static function decode(s: String){
		return s.Replace('&comma;', ',');
	}
	
	/**
	 * Fill out a given number string with zeros to the required length
	 * @param string s string to fill out
	 * @param int z string length required
	 */
	function appendZeros(s:String, z: int){
		for(var i=0;i<(z-s.length);i++){
			s='0'+s;
		}
		return s;
	}
	
		
	function createPersistentDataDirectory() {
	
		if(FileSystem.directoryExists(persistentDataPath)){
			return true;
		}
		
		Directory.CreateDirectory(persistentDataPath);
		return true;
	}
	
	function getPersistentDataFilePath(type:String){	
		return getPersistentDataFolderPath(type)+'/'+listName+'.'+dataFileExtension;
	}
	
	function getPersistentDataFilePath(){
		return getPersistentDataFilePath('m');
	}
	
	function getPersistentDataFolderPath(type:String){
		var p: String;
		switch (type) {
			case "a": // Application
				p =  Application.persistentDataPath;
				break;
			default: // Modal
				p = persistentDataPath;
				break;
		}
		
		return p;
	}
	
	function getPersistentDataFolderPath(){
		return getPersistentDataFolderPath('m');
	}

	/**
	 * Save file in appropriate location
	 * @param String f File File as a string.
	 * @param String p Path to file from base path.
	 * @param String n File name.
	 */
	function saveFile(f: String[], p: String, n:String){
		// Save as a file in application persistent path. Removed on app uninstall
		FileSystem.checkAndCreateFile(f, getPersistentDataFolderPath('a')+p, n);
		
		// Save to sdcard root. Remains on uninstall
		FileSystem.checkAndCreateFile(f, getPersistentDataFolderPath()+p, n);
	}
	
	function saveFile(f: String[]){
		saveFile(f, '', '');
	}
	
	function saveFile(f: String, p: String, n: String){
		saveFile([f], p, n);
	}
	/**
	 * Is the given file name a modal file name
	 * @param String n name
	 * @return boolean
	 */
	function isModalFilename(n: String){
		return n.Contains(dataFileExtension);
	}
}