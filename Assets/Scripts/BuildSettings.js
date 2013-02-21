#pragma strict
import System.Collections.Generic;
/*
 * Simple class recording the version number and date of the application.
 * Structure kept simple. Modal Class. May be stored in database in future. 
 * Presentation requires separate View and Presenter classes
 */
class BuildSettings {
	var settings: Setting;
	
	function BuildSettings(){
		__construct();
	}
	
	function __construct(){
	
		settings = new Setting('buildSettings', 'Build Settings', '');
		// Code Settings
		settings.addSetting('code', 'Code');
		settings.addSetting('code.datetime', 'DateTime', '201302122100');
		
		// Project Settings
		settings.addSetting('project');
		settings.addSetting('project.name', 'Cell Your Sole');
		settings.addSetting('project.folderName', 'cell your sole');
		settings.addSetting('project.scriptExecutionOrder');
		settings.addSetting('project.scriptExecutionOrder.SceneInteraction', '100');
		
		// Platforms: Specific platform settings
		settings.addSetting('platform');
		
		// Cross platform settings
		settings.addSetting('platform.general');
		settings.addSetting('platform.general.companyName', 'ColChambers');
		settings.addSetting('platform.general.productName', 'Cell Your Sole');
		
		// Android
		settings.addSetting('platform.android');
		
		settings.addSetting('platform.android.presentation.resolution.defaultOrientation', 'auto rotation');
		settings.addSetting('platform.android.presentation.statusBar.statusBarHidden', '0');
		
		settings.addSetting('platform.android.textureCompression', 'Don\'t override');
		settings.addSetting('platform.android.developmentBuild', '0');
		settings.addSetting('platform.android.otherSettings.bundleIdentifier', 'uk.co.colchambers.cell_your_sole');
		settings.addSetting('platform.android.otherSettings.bundleVersion', '1.0');
		settings.addSetting('platform.android.otherSettings.bundleVersionCode', '1');
		settings.addSetting('platform.android.otherSettings.minimumApiLevel', 'Android 4.0');
		settings.addSetting('platform.android.otherSettings.configuration.installLocation', 'Prefer External');
		settings.addSetting('platform.android.otherSettings.configuration.internetAccess', 'Auto');
		settings.addSetting('platform.android.otherSettings.configuration.writeAccess', 'External SD card');
		
		settings.addSetting('platform.android.fileSettings.apkName', 'cell your sole');
		
		// iOS
		settings.addSetting('platform.ios');
		settings.addSetting('platform.android.otherSettings.optimisation.scriptSpeed', 'fast but no exceptions');
		
		
		
	}
}