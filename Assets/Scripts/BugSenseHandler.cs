using UnityEngine;
using System.Collections;

public class BugSenseHandler : MonoBehaviour {

	// Use this for initialization
	void Start () {
		AndroidJavaObject context;
		using (AndroidJavaClass jc = new AndroidJavaClass("com.unity3d.player.UnityPlayer"))
		{
		   //Get the context reference from Unity’s current activity
		   context = jc.GetStatic<AndroidJavaObject>("currentActivity");
		   if (context == null) {
				Debug.Log("Something is wrong here!");
			} else {
		// start bugsense
	           using(var BugsenseClass = new AndroidJavaClass("com.bugsense.trace.BugSenseHandler") );
		//Rest of the BugSense code here
			}
		}
	 
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
