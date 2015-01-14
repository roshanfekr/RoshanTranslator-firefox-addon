var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.




    var langCode;
    
var text_entry = require("sdk/panel").Panel({
  contentURL: data.url("text-entry.html"),
  contentScriptFile: data.url("get-text.js")
});


//Create Context menu
var contextMenu = require("sdk/context-menu");
 var menuItem = contextMenu.Item({
  label: "Roshan Translate!!",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 ' document.write("<script>alert(22);</script>");' +
                 '});',
  onMessage: function (selectionText) {
    
    callbackDescription(selectionText);
    console.log(selectionText);
  }
  
  
});
 




    function translateToLangCode(lang) {
        langCode = lang;
        translateDescription();
    }

    function translateDescription() {
        var faciDescScript = document.createElement('script');
        faciDescScript.type = 'text/javascript';
        var sourceText = escape(document.getElementById("siteDescEN").innerHTML);
        var faciDesc = 'https://www.googleapis.com/language/translate/v2?key=API_KEY_HEREsource=en&target=' + langCode.toLowerCase() + '&callback=callbackDescription&q=' + sourceText;
        faciDescScript.src = faciDesc;
        document.getElementsByTagName('head')[0].appendChild(faciDescScript);
    }   
// Create a button
require("sdk/ui/button/action").ActionButton({
  id: "show-panel",
  label: "Show Panel",
  icon: {
    "16": "./icon/icon-16.png",
    "32": "./icon/icon-32.png",
    "64": "./icon/icon-64.png"
  },
  onClick: handleClick
});

// Show the panel when the user clicks the button.
function handleClick(state) {
  text_entry.show();
}

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});

// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
text_entry.port.on("text-entered", function (text) {
  console.log(text);
  text_entry.hide();
});