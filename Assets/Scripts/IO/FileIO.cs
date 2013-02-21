using UnityEngine;
using System.Collections;
using System.IO;
/*
public class FileIO : MonoBehaviour {
	private string outputString = "";
	private string pdpResult = "";
	private string tcpResult = "";
	
	// Use this for initialization
	void OnGUI() {
		GUI.Label(new Rect(25, 25, 50, 25), "Output:");
		outputString = GUI.TextField(new Rect(75, 25, 200, 25), outputString);
		GUI.Label(new Rect(25, 55, 180, 25), "Result (persistentDataPath):");
		GUI.Label(new Rect(205, 55, 200, 25), pdpResult);
		GUI.Label(new Rect(25, 90, 180, 25), "Result (temporaryCachePath):");
		GUI.Label(new Rect(205, 90, 200, 25), tcpResult);
		
		if (GUI.Button(new Rect(25, 140, 50, 25), "Write")) {
			pdpResult = writeFile(Application.persistentDataPath, outputString);
			tcpResult = writeFile(Application.temporaryCachePath, outputString);
		}
		
		if (GUI.Button(new Rect(85, 140, 50, 25), "Read")) {
			pdpResult = readFile(Application.persistentDataPath);
			tcpResult = readFile(Application.temporaryCachePath);
		}
		
		if (GUI.Button(new Rect(145, 140, 50, 25), "Delete")) {
			pdpResult = deleteFile(Application.persistentDataPath);
			tcpResult = deleteFile(Application.temporaryCachePath);
		}
	}
	
	string writeFile(string dirPath, string output) {
		string result = "";
		
		print (Application. persistentDataPath);
		if (dirPath != null && dirPath.Length > 0) {
			StreamWriter writer = File.CreateText(dirPath + "/foo.txt");
			writer.WriteLine(output);
			writer.Close();
			result = "done";
		} else {
			result = "path empty";
		}
		
		return result;
	}
	
	string readFile(string dirPath) {
		string result = "";
		
		if (dirPath != null && dirPath.Length > 0) {
			StreamReader reader = File.OpenText(dirPath + "/foo.txt");
			result = reader.ReadLine();
			reader.Close();
		} else {
			result = "path empty";
		}
		
		return result;
	}
	
	string deleteFile(string dirPath) {
		string result = "";
		
		if (dirPath != null && dirPath.Length > 0) {
			string fileName = dirPath + "/foo.txt";
			if (File.Exists(fileName)) {
				File.Delete(fileName);
				if (File.Exists(fileName))
					result = "failed";
				else result = "deleted";
			} else {
				result = "file does not exist. nothing to delete";
			}
		} else {
			result = "path empty";
		}
		
		return result;
	}
}
*/