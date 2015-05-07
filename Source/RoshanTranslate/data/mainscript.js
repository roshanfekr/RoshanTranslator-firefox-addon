 
 var x2=0; var y=0;  
  window.onload= function ()
                {
                  loadStart();
                };
 
    function loadStart()
    {
        var tag='<div class="bubble" style="position: absolute;top: 105px;border-color: rgb(121, 127, 127); border-width: 0px; border-radius: 7px; padding: 0px; height: 140px; width: 415px; background-color: rgb(255, 242, 255);">' +
		'<div class="pointer" style="content: \'\';position: absolute;border-style: solid;border-width: 14px 9px 0;border-color: #FFF2FF transparent;display: block;width: 0;z-index: 1;margin-left: -9px;bottom: -14px;left: 50%;">' +
		'</div>' +
		'<div class="pointerBorder" style="display: none">' +
		'</div>' +
	'</div>';
        
        document.body.innerHTML = document.body.innerHTML +  "<div id=\'tran1\' style=\'left:200px;top:200px\' class=\'alert-box error\'></div>";
        
        
        $(document).mousemove(function(event){
            var newabc = 456;y=event.pageY-30;x2 =event.pageX ;
            });
        var t = '';
    
        document.onmouseup = gText;
        if (!document.all) document.captureEvents(Event.MOUSEUP);
    }



    function gText(e) { t = (document.all) ? document.selection.createRange().text :document.getSelection();
      var x = document.getElementById("tran1");
      x.onmouseover=function(){var objX = document.getElementById("tran1"); objX.style.opacity = 1.0; objX.style.filter = "alpha(opacity=100)";};
      x.onmouseout=function(){var objX = document.getElementById("tran1"); objX.style.opacity = 0.5; objX.style.filter = "alpha(opacity=50)";};
      if(t!='') { 
            x.style.display = 'block'; x.style.opacity = 0.5;
            x.style.filter = "alpha(opacity=50)";
            x.style.left = x2.toString() +'px';
            x.style.top = (y ).toString()+'px';
         }
         else {
           x.style.display = 'none';
           }
     }
      
      

    
    