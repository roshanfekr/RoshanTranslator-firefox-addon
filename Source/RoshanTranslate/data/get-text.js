// When the user hits return, send the "text-entered"
// message to main.js.
// The message payload is the contents of the edit box.


var textArea = null;


// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing.
self.port.on("show", function onShow() {
    var textArea = $("#edit-box");
    //textArea.focus();
});


    function GetMember(message) {

            var div = $(".textarea");
            /*
            $.getJSON(message,
                        $.each(message, function(i,user)
                           {
                                div.append( "<h4>"+ user +"</h4>" );
                                
                            })); */

    }


self.port.on('warning', function(message)
{
    
    GetMember(message);

});

