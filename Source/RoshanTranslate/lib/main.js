var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.

var pageMod = require("sdk/page-mod");
var pageMod1 = require("sdk/page-mod");

var self = require("sdk/self");
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
var script = "onMessage = function onMessage(message) {" +
                 "  window.alert(message);};"
                 
// get mouse position and set global variable
pageMod1.PageMod({
  include: "*",
  contentScriptFile: [data.url("get-text.js"),
                      data.url("jquery-1.11.1.js")],
  contentScript:'var x2=0; var y=0; ' +
    '$(document).mousemove(function(event){ var newabc = 456;y=event.pageY;x2 =event.pageX ;   });' +
    'var t = \'\';' +
    ' function gText(e) { t = (document.all) ? document.selection.createRange().text :document.getSelection();' +
       'var x = document.getElementById("tran1");' +
       'if(t!=\'\') { ' +
          'x.style.display = \'block\'; ' +
          'x.style.left = x2.toString() +\'px\'; x.style.top = (y ).toString()+\'px\';' +
          '} else { x.style.display = \'none\'; }' +
      '}' +
    'document.onmouseup = gText;'+
    'if (!document.all) document.captureEvents(Event.MOUSEUP);',
    
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






var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*",
  contentScript: 'document.body.innerHTML = document.body.innerHTML + ' + ' "<div id=\'tran1\' style=\'left:200px;top:200px\' class=\'alert-box error\'></div>";',
  contentStyleFile: [data.url("notify.css")]
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