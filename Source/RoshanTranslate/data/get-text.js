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


    function replaceAll(str1  , find , rep)
    {
        var old = str1 ;
        var string1 = "";
        string1=str1.toString();
          // var reg= RegExp(find , 'g');
        while(1)
        {
            string1 = string1.replace(find , rep);
            if(old==string1)
            {
               break;
            }
            old= string1;
        }
        return string1;
    }


    function GetMember(message)
    {

            var div = $(".textarea");
            var div1 = $(".box15");
            var string2 ="";
            var reg= RegExp(find , 'g');
            message=replaceAll(message,",,",",[],");
           // div.innerHtml= "<h4>" + message + "</h4>" ;
            div.html("");
            var count=0;
            div1.html('');
            
            $.each($.parseJSON(message), function (item, value) {
              var valuesub=value[0];
              count ++;
              switch (count) {
                case 1:
                    div.append("<h3>" + valuesub[0] + "</h3>");
                    break;
                case 2:
                    //Annex(value);
                    div1.append("<h3>" + valuesub[2] + "</h3>");
                    break;
              }

            })
    }



    function Annex(json)
    {
        var div1 = $(".box15");
        
        $.each($.parseJSON(json), function (item, value) {
        var valuesub=value[1];
        
        div1.append("<h3>" + valuesub + "</h3>");
        
         });
    }
    

self.port.on('warning', function(message )
{
    
    GetMember(message);

}
);

