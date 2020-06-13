var p = MindFusion.Scheduling;

var calendar = new p.Calendar(document.getElementById("calendar"));

calendar.theme = "first-theme";

calendar.render();

calendar.itemCreating.addEventListener(CreateItem);

function CreateItem (sender, args){
 if ((args.item.startTime.day >= 1 && args.item.startTime.day <= 3) ||
(args.item.endTime.day > 1 && args.item.endTime.day <= 3) )
 {
  
  alert("Events cannot be scheduled during the first three days.");
  args.cancel = true;
 }
  
}


var button = document.getElementById( 'saveButton' );
button.addEventListener( 'click', function() {
    
    var data = calendar.schedule.toJson();

    var blob = new Blob( [ data ], {
        type: 'application/json'
    });
    
    url = URL.createObjectURL( blob );
    var link = document.createElement( 'a' );
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', 'first-schedule.json' );
    
    var event = document.createEvent( 'MouseEvents' );
    event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent( event );
});

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'first-schedule.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
var button1 = document.getElementById( 'loadButton');
button1.addEventListener( 'click', function() {
	init();
	});
	
function init() {
 loadJSON(function(response) {
  calendar.schedule.fromJson(response);
 });
}


