// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

var $selectedScreenId, $selectedScreenListItem;

var $selectedDrag = null;
var $selectedResize = null;
var $dragger = null;

var $phoneX, $phoneY, $relX, $relY;

$(document).ready(function() {

    // Initial setup
    $dragger = $('#dragger');

    // Select first screen
    $selectedScreenListItem = $('.screen-list-container .item').first()
    $selectedScreenId = $selectedScreenListItem.data('screen-id');
    console.log("First Screen: "+$selectedScreenId);
    $('.screen-list-container .item').first().toggleClass('item_selected'); 
    // Take care of hovering
    $('.screen-list-container .item').hover(function(){$(this).toggleClass('item_hover');});
    // New screen selection
    $('.screen-list-container .item').click( function(){ 
        $selectedScreenId = $(this).data('screen-id');
        console.log("New Screen:"+$selectedScreenId);
        $selectedScreenListItem.toggleClass('item_selected'); 
        $(this).toggleClass('item_selected'); 
        $selectedScreenListItem = $(this);
    });


});

$(document).on("mousemove", "body", updateDrag);
$(document).on("mousedown", ".box", startDrag);
$(document).on("mouseup mouseleave", "body", stopDrag);

function startDrag(event) {

    // Pull from view library on left
    if ($(this).parent().hasClass('view-list-container')) {
        // Get the selected element and assign to dragger
        // alert("selected " + $(this).data("pointer"));
        $selectedDrag = $(this);
        $dragger.data("pointer", $selectedDrag.data("pointer"))
            .css({
            "background-color": $(this).css("background-color"),
                "left": event.pageX - $(this).width() / 2,
                "top": event.pageY - $(this).height() / 2,
        }).show();
    }

    // Pull from view on phone
    if ($(this).parent().is('#phone')) {

        var $clickX = event.pageX - $(this).offset().left
        var $clickY = event.pageY - $(this).offset().top
        $("#click-position").text("click-position(" + $clickX + ", " + $clickY + ")");

        // Resize Time
        if (($clickX > $(this).width() - 10) && ($clickY > $(this).height() - 10)) {
            //alert("resize time");
            $selectedResize = $(this)
        } else {
            // Time to re-locate
            $selectedDrag = $(this);
            $selectedDrag.hide();
            // alert("selected "+$selectedDrag.data("pointer"));
            console.log("Relocating: " + $selectedDrag.data("id"));
            $dragger.data("pointer", $selectedDrag.data("pointer"))
                .css({
                "background-color": $(this).css("background-color"),
                    "left": event.pageX - $(this).width() / 2,
                    "top": event.pageY - $(this).height() / 2,
                    "width": $(this).width(),
                    "height": $(this).height(),
            }).show();

        }
    }

    // Get the correct value of phone coordinates for display of position values
    $phoneX = $("#phone").offset().left;
    $phoneY = $("#phone").offset().top;
}

function updateDrag(event) {

    // If nothing is selected, do nothing
    if ($selectedDrag != null) {

        // Get the absolute values
        var $absX = event.pageX - $dragger.width() / 2;
        var $absY = event.pageY - $dragger.height() / 2;

        // Move the dragging object to the correct absolute position
        $dragger.css({
            "left": $absX,
            "top": $absY,
        });

        $relX = $absX - $phoneX;
        $relY = $absY - $phoneY;

        $("#a-position").text("abs-position(" + $absX + ", " + $absY + ")");
        $("#r-position").text("rel -position(" + $relX + ", " + $relY + ")");
    }
    
    if ($selectedResize != null) {
                    
        var $newWidth = event.pageX - $selectedResize.offset().left
        var $newHeight = event.pageY - $selectedResize.offset().top
        
        $selectedResize.css({
            "width": $newWidth,
            "height": $newHeight,
        });
        
    }
}

function stopDrag(event) {
    
    if ($selectedResize != null) $selectedResize = null;
    
    // Do nothing if nothing is being dragged
    if ($selectedDrag === null) return;

    // Check to see if element is on the screen of the phone
    if ($relX >= 0 && $relY >= 0) {

        // Create correct element        
        var className = "";
        if ($dragger.data("pointer") == "box1") className = "orange";
        else if ($dragger.data("pointer") == "box2") className = "blue";
        else if ($dragger.data("pointer") == "box3") className = "pink";
        else if ($dragger.data("pointer") == "box4") className = "yellow";
        else if ($dragger.data("pointer") == "box5") className = "green";
        var $newDiv = $("<div/>") // creates a div element
        //.attr("class", "box orange")  // adds the class
            .addClass("box " + className)
            .data("pointer", $dragger.data("pointer"))
            // .data("id", 10)
            .css({
                "left": $relX,
                "top": $relY,
                "width": $dragger.width(),
                "height": $dragger.height(),
        });

        // Add element to phone  
        $("#phone").append($newDiv);

        var $properties = {screen_id:1, background_color:"White",
        					origin_x:$relX, origin_y:$relY,
        					width:$dragger.width(), height:$dragger.height()};

        if ($selectedDrag.parent().hasClass('view-list-container')) {
	        createView($properties,$newDiv);
        }

    	if ($selectedDrag.parent().is('#phone')) {
    		// Pass the view id to the new div
    		$newDiv.data("id",$selectedDrag.data("id"));
    		updateView($selectedDrag.data("id"),$properties)
    	}
    }

    // Get rid of element being dragged
    $dragger.data("poiner", "").hide();
    if (!$selectedDrag.is(":visible")) $selectedDrag.remove();
    $selectedDrag = null;
    // alert("dropped " + $dragger.data("pointer") + " position(" + event.pageX + ", " + event.pageY + ")");

}

function createView(properties, div) {
	$.ajax({
	    url: '/views',
	   	type: 'POST',
	   	data: {view:properties},
	    dataType: 'json',
	    success: function(data) { 
	    	console.log(data); 
	    	console.log("New View: " + data.id);
        	div.data("id", data.id);
	    },
	    failure: function() { alert("Unsuccessful"); }
	  });
}

function updateView(id, properties) {
	$.ajax({
	    url: '/views/'+id,
	   	type: 'PUT',
	   	data: {view:properties},
	    dataType: 'json',
	    success: function(data) { 
	    	console.log(data); 
	    	console.log("Updated View: " + data.id);
	    },
	    failure: function() { alert("Unsuccessful"); }
	  });
}

