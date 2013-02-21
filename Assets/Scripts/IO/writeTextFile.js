#pragma strict

import System.IO; 
var sw = new StreamWriter("TestFile.txt", true); // append 

function Start () {
}

function Update () {
    if (Input.GetButtonDown("Jump")) {
        sw.WriteLine(Time.time);
    }

    if (Input.GetButtonDown("Fire1")) {
        sw.Close();
    }
}