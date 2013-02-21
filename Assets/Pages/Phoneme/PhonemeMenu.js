#pragma strict
import System.Collections.Generic;
import System.Collections;

class PhonemeMenu extends Menu {
	

	var phonemes: Dictionary.<String, Phoneme>;
	function PhonemeMenu(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function PhonemeMenu(){
		super();
	}
	
	function init(){
		super();
		
		title = "Phonemes";
		
		phonemes = new Dictionary.<String, Phoneme>();
		
		var phoneme: Phoneme = new Phoneme();
		phoneme.Add('boy', new PhonemeWord('Boy', '.__'));
		phoneme.Add('toy', new PhonemeWord('Toy', '.__'));
		phoneme.Add('joy', new PhonemeWord('Joy', '.__'));
		phoneme.Add('employ', new PhonemeWord('Employ', '....__'));
		phoneme.Add('destroy', new PhonemeWord('Destroy', '..__.__'));
	
		phonemes.Add('oy', phoneme);
		
		phoneme = new Phoneme();
		phoneme.Add('mouse', PhonemeWord('Mouse', '.____'));
		phoneme.Add('house', PhonemeWord('House', '.____'));
		phoneme.Add('out', PhonemeWord('Out', '__.'));
		phoneme.Add('shout', PhonemeWord('Shout', '__.'));
		// out, shout, about, aloud, mouth
		/*
		
		phoneme.Add('louse', 'Louse');
		phoneme.Add('blouse', 'Blouse');
		phoneme.Add('ouch', 'Ouch');
		*/
		
		
		phonemes.Add('ou', phoneme);
		/*
		phoneme = new Phoneme();
		phoneme.Add('choice', 'Choice');
		phoneme.Add('voice', 'Voice');
		// coil, oil, spoil, boil

		phonemes.Add('oi', phoneme);
		*/
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateMenu(){
		reset();
		
		addPageNavigationButton('phonemes', 'Play');
		addInstructionsButton();
		addMainMenuButton();
		
		// Disable bakground scene
		setBackgroundEnabled(false);
		
	}
	
	function loadPage(id: String){
		switch (id) {
			case 'menu':
				populateMenu();
				break;
			case 'phonemes':
				populatePhonemes();
				break;
			case 'phoneme':
				populatePhoneme("");
				break;
			case 'instructions':
				populateInstructions();
				break;
		}
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populatePhonemes(){
	
		prepareSubPage();
		
		var text="";
		
		text ="Using this resource you can organise a room and explore how your ";
		text+="changes affect its accessibility. \n";
		text+="You can move most furniture and lights by dragging them.\n";
		text+="To drag an item select it with your finger or mouse and drag it.\n";
		text+="You can see the impact of turning lights on and off using the lights menu.";
			
		addPageText(text, 0.5);
		
		for(var phoneme in phonemes.Keys){
			addPagePhonemeButton (phoneme, phoneme);
		}
		

	}
	
	/**
	 * Populate the phoneme menu 
	 * @return void
	 */
	function populatePhoneme(p: String){
	
		prepareSubPage('phonemes');
		
		var text="Your chosen phoneme is "+p;
		addPageText(text, 0.5);
		addPageSoundButton (p, 'Hear Phoneme');
		
		var phoneme = phonemes[p];
		var words = phoneme.getWords();
		var phonemeArray: PhonemeWord[] = words.Values.ToArray();
		var word = phonemeArray[Random.Range(0, phonemeArray.Length)];
		
		addPhonemePageText(word.text, 0.1);
		addPhonemePageText(word.soundButton, 0.1);
		var imagePath: String = 'images/'+p+'/'+word.image;
		addPageImage(imagePath, 1.0);
		
		addPagePhonemeButton (p, 'Next word');

	}
	
	function addPhonemePageText(t: String, h: float){
		var e = addPageText(t, h);
		setElementFont(e.style, 'fixedWidth');
	}
	
	/**
	 * Populate the instructions page 
	 * @return void
	 */
	function populateInstructions(){
	
		prepareSubPage();
		
		addPageTitle('Creating time: Options and Reaction times');
		var text="";

		text+="The more viable options available to you. The longer it takes to make a choice.\n";
		text+="This experiment will show you that the number of options available effects your reaction time.\n";
		text+="The more options available. The slower your reaction time. This is the same for everyone.\n";
		addPageText(text);
		
		text="Winning points on a tennis court is all about manipulating time. Giving yourself more time ";
		text+="and your opponent less.\n";
		addPageText(text);
		
		text ="As an attacker if your opponent has to prepare for more options. They'll take longer ";
		text+="to respond to your shot. \n";
		text+="As the opponent the fewer options you have to consider the faster you can respond and ";
		text+="the more time you have.\n";
		addPageText(text, 0.5);
		
		text="That's the principle behind every shot and taking control of the point.\n";
		text+="Taking time away or creating time.";
			
		addPageText(text);
		
	}
	
	function addPagePhonemeButton (id: String, t: String) {
		var b: iGUIButton = addPageButton (id, t, 'instructionsButton');
		b.clickCallback = loadPhoneme_Click;
		return b;
	}
	
	function addPageSoundButton (id: String, t: String) {
		var b: iGUIButton = addPageButton (id, t, 'instructionsButton');
		b.clickCallback = playSound_Click;
		return b;
	}
	
	function loadPhoneme_Click(caller : iGUIButton){
		populatePhoneme(caller.userData);
	}
	
	function playSound_Click(caller : iGUIButton){
	
		mainPresenter.playSound('Sounds/Phonemes/british_english/group7/'+caller.userData);
		
		
	}

}