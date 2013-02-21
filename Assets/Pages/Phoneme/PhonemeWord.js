#pragma strict

class PhonemeWord {
	var text : String;
	var image : String;
	var soundButton: String; // Lines and dots under word. Representing the sound of the word.
	function PhonemeWord (text: String, soundButton : String){
		this.text = text;
		this.image = text.ToLower();
		this.soundButton = soundButton;
	}

}