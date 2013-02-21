#pragma strict

class Phoneme {
	var words: Dictionary.<String, PhonemeWord> = new Dictionary.<String, PhonemeWord>();
	
	function getWords(){
		return words;
	}
	
	function getWord(k:String){
		if(!words.ContainsKey(k)){
			return null;
		}
		
		return words[k];
	}
	
	function addWord (k: String, v: PhonemeWord) {
		words.Add(k,v);
	}
	
	function Add (k: String, v: PhonemeWord) {
		addWord(k,v);
	}
	
}