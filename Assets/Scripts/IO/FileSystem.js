#pragma strict
import System.Collections;
import System.IO;

class FileSystem {
	
	function createFile(p: String, n: String){
		#if !UNITY_WEBPLAYER
		var writer: StreamWriter = File.CreateText(p + "/"+n);
			//writer.WriteLine(output);
		writer.Close();
		#endif
	}
	
	public static function deleteFile(p: String){
		#if !UNITY_WEBPLAYER
		File.Delete(p);
		#endif
	}
	
	function fileWriteAllText(p: String, s: String){
		#if !UNITY_WEBPLAYER
		File.WriteAllText(p, s);
		#endif
	}
	
	static public function fileWriteAllLines(p: String, s: String[]){
		#if !UNITY_WEBPLAYER
		File.WriteAllLines(p, s);
		#endif
	}
	
	static public function fileReadAllLines(p: String){
		return File.ReadAllLines(p);
	}
	
	static public function fileExists(p: String){
		return File.Exists(p);
	}
	
	static public function directoryExists(p: String){
		return Directory.Exists(p);
	}
	
	static public function getFiles(p: String){
		return Directory.GetFiles(p);
	}
	
	/**
	 * @param s string source path
	 * @param d string destination path
	 */
	static public function copyDirectory(s: String, d: String){
		//Copy all the files
		var newPath : String;
		
		if(!Directory.Exists(d)){
			Directory.CreateDirectory(d);
		}
		for (newPath in Directory.GetFiles(s, "*.*")) {
    		File.Copy(newPath, newPath.Replace(s, d), true);
    	}
	}
	
	/**
	 * Create directory from the given path.
	 */
	 static public function createDirectory(p: String) {
	 	var separator : char[] = ["/"[0]];
	 	var f: String[] = p.Split(separator);
	 	var current_path: String = '';
	 	var count=0;
	 	for (var folder:String in f) {
	 		current_path+=folder;
	 		count++;
	 		if(!folder.Length){
	 			current_path+='/';
				continue;
			}
			if(count){
	 			current_path+='/';
			}
			if(Directory.Exists(current_path)){
				continue;
			}
			
			Directory.CreateDirectory(current_path);
	 	}
	 }
	 
	 /**
	 * Check directory exists from the given path. If not create it.
	 */
	 static public function checkAndCreateDirectory(p: String) {
	 	if(FileSystem.directoryExists(p)){
			return true;
		}
		FileSystem.createDirectory(p);
		return true;
	 }
	 
	 /**
	 * Check directory exists from the given path. If not create it.
	 */
	 static public function checkAndCreateFile(f: String[], p: String, n: String) {
		FileSystem.checkAndCreateDirectory(p);
		FileSystem.fileWriteAllLines(p+'/'+n, f);
		return true;
	 }
	 
}