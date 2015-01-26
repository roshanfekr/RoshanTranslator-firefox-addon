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

    function GetMember() {
        var wsurl = "http://localhost:56864/WebService1.asmx/HelloWorld";
                $.ajax({
                    type: "POST",
                    url: wsurl ,
                    contentType: "application/json; charset=utf-8",
                    data: '',
                    dataType: "json",
                    success: function(data) {
                        console.log(data)
                        alert("ok");
                    },
                    error: function(data ,error) {
                        console.log(data)
                        var textArea = $("#edit-box");
                        textArea.val(val);
                    }

                });
    }


self.port.on('warning', function(message)
{
    GetMember();

});

