#pragma strict

class Settings extends MVP {

	public var notifications: Errors;
	var persistentDataPath : String;
	
	function Settings(m: Modal, v: View, p: Presenter){
		super(m,v,p);
	}
	function Settings(){
		super();
	}
	
	function init(){
	
		persistentDataPath = '/mnt/extSdCard/cell';
		populateMenu();
	}
	
	/**
	 * Populate the settings menu 
	 * @return void
	 */
	function populateMenu(){

		var list: iGUIListBox = panel.getContainer('list');
		var button: iGUIButton = list.addElement("iGUIButton");
    	button.setWidth(1);
		button.label.text = 'Archive Data';
		button.clickCallback = archive_Click;
		
	}
	
	function archive_Click(caller : iGUIButton){
		// Copy existing files to sub folder based on current date.
		var date = System.DateTime.Now.ToString('yyyyMMdd');
		var p = Application.persistentDataPath;
		FileSystem.copyDirectory(p, p+'/'+date);
		
		// Report result in debug log. Or use notification system from task details to report result.
		Debug.Log('Archived data to '+p+'/'+date);
		notifications.addError('archived', 'Successfully archived data to '+p+'/'+date);
		
		p = persistentDataPath;
		FileSystem.copyDirectory(p, p+'/'+date);
		
		// Report result in debug log. Or use notification system from task details to report result.
		Debug.Log('Also archived data to '+p+'/'+date);
		notifications.addError('archived', 'Successfully archived data to '+p+'/'+date);
		displayNotifications();
	}
	
	function displayNotifications(){
		mainPresenter.enablePanel(8, false);
		notifications.window.label.text = "Notifications";
		var text: String = "";
		var errors: Dictionary.<String, String> = notifications.getErrors();
		for(error in errors.Values){
			text += error+"\n";
		}
		notifications.textarea.setValue(text);
		notifications.clearErrors();
	}
	
}