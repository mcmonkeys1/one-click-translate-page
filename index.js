
//	https://translate.google.com/translate?sl=auto&tl=en&js=y&prev=_t&hl=en&ie=UTF-8&u=
//	https://translate.google.com/translate?sl=auto&tl=en&js=y&u=
//	
//	BAD URLS!!
//	file:///C:/Users/ros/Dropbox/HTDOCS/rosmcmahon-NEW-SITE/parallax.html
//	about:addons

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var myIconURL = "./icon-64.png";

const badUrl = [
	"about:",
	"https://translate.google.com",
	"http://translate.google.com",
	"file://",
	"view-source:"
];

var button = buttons.ActionButton({
  id: "translate-link",
  label: "Translate Page",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
	var url = tabs.activeTab.url;
	
	// Check against bad URLs
	for (var i = badUrl.length - 1; i >= 0; i--) {
		if( badUrl[i] == url.substr(0,badUrl[i].length)){
			// Display error message
			var myPanel = require("sdk/panel").Panel({
				contentURL: "./panel/index.html"
			});
			myPanel.show();
			// var toast = require("sdk/notifications");
			// toast.notify({
			// 	text: 'Google Translate would not like this page!\n\n"'+url+'"',
			// 	iconURL: myIconURL
			// });
			return;
		}
	};

	url = encodeURI( url );
  tabs.activeTab.url = "https://translate.google.com/translate?sl=auto&tl="+prefs['sLang']+"&js=y&u="+url;
}