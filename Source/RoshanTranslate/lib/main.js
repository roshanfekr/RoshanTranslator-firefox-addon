var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.

var pageMod = require("sdk/page-mod");


var self = require("sdk/self");
// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: "*.org",
  contentScriptFile: self.data.url("jquery-1.11.1.js")
});


var langCode;
    
var text_entry = require("sdk/panel").Panel({
  contentURL: data.url("text-entry.html"),
  contentScriptFile: [
                      data.url("get-text.js"),
                      data.url("jquery-1.11.1.js")]
});



//Create Context menu
var contextMenu = require("sdk/context-menu");
 var menuItem = contextMenu.Item({
  label: "Roshan Translate!!",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
  onMessage: function (selectionText) {
    /*
     * console.log(selectionText);
    text_entry.port.emit("warning", selectionText);
    handleClick(); */
    
      var Request = require("sdk/request").Request;
      var quijote = Request({
        url: "http://localhost:56864/WebService1.asmx/HelloWorld",
        content : '{"userName":"mohammad"}',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        overrideMimeType: "application/json; charset=utf-8",
        onComplete: function (response) {
          console.log(response.text);
        }
      });
      //text_entry.port.emit("warning", selectionText);
      quijote.post();
      
  }
  
  
});
 

 //Create Context menu
var contextMenu = require("sdk/context-menu");
 var menuItem = contextMenu.Item({
    label: "Translate Selection",
    context: contextMenu.SelectionContext(),
    contentScriptFile : [self.data.url('jquery-1.11.1.js')],
    onMessage: function (data) {
        require('sdk/request')
            .Request({
                url: 'http://localhost:56864/WebService1.asmx/HelloWorld',
                content: '',
                onComplete: function (response) {

                    console.log("sdfsdfsdf");
                    text_entry.port.emit("show");
  
                }
                
            })
            .get();
            text_entry.port.emit("warning", selectionText);
    }
});
 
 

 
  function translate(word)
  {
    
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
  
  //jqloader.translate();
  
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