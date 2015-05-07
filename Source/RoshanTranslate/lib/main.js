var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.

var pageMod = require("sdk/page-mod");
var pageMod1 = require("sdk/page-mod");
var self = require("sdk/self");

const { pathFor } = require('sdk/system');
const path = require('sdk/fs/path');
const file = require('sdk/io/file');



// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: "*",
  contentScriptFile: self.data.url("jquery-1.11.1.js"),
  contentScriptWhen: 'ready',

                  
});




var abc = 123;
var pos_x = -1;
var pos_y = -1;
var work;


// This content script sends header titles from the page to the add-on:
var script =self.data.load("mainscript.js");      
// get mouse position and set global variable
pageMod1.PageMod({
  include: "*",
  contentScriptWhen: 'start',
  contentScriptFile: [data.url("jquery-1.11.1.js"),data.url("get-text.js")],
  contentStyleFile: [data.url("notify.css")],
  contentScript: script,
  onAttach: function onAttach(worker) {
    work = worker;
    worker.on('message', function(x,y)
    {
      data=x.split(',');
      pos_x = parseInt(data[0].trim(),10);
      pos_y = parseInt(data[1].trim(),10);
      
    });
  }
});





function myListener() {
  if (selection.text)
  {
    console.log(selection.text);
    translate(selection.text)
    //text_entry.show({position:{ top:pos_y ,left:pos_x } });
  }
}
var selection = require("sdk/selection");
selection.on('select', myListener);



var langCode;
var text_entry = require("sdk/panel").Panel({

  contentURL: data.url("text-entry.html"),
  contentScriptFile: [data.url("get-text.js"),
                      data.url("jquery-1.11.1.js")],
  
  
});






function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}



//Create Context menu
var contextMenu = require("sdk/context-menu");
 var menuItem = contextMenu.Item({
  label: "Roshan Translate!!",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text); ' +
                 '});',
  onMessage: function (selectionText) {
 
   translate(selectionText)
      
  }
  
  
});


 
  function translate(selectionText)
  {
      var Request = require("sdk/request").Request;
      var quijote = Request({
        url: 'http://translate.google.com/translate_a/t?client=t&sl=en' + 
                '&tl=fa&ie=UTF-8&oe=UTF-8&q=' + selectionText ,
        content : '',
        dataType : 'json',
        userAgent : 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0)',
        contentType: "application/x-www-form-urlencoded",
        overrideMimeType: "application/json; charset=utf-8",
        onComplete: function (response) {
          console.log(response.text);
          //text_entry.show();
          text_entry.port.emit("warning", response.text);
        }
      });
      
      quijote.post();
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