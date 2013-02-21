#pragma strict

class Button {
	public var name: String;
	public var label: String;
	public var callback: iGUIEventCallback;
	function Button(n: String, l: String, cb: iGUIEventCallback) {
		name = n;
		label = l;
		callback = cb;
	}
}