$(function() {
	
    var palette = [
            ["rgb(255, 255, 255)", "rgb(248, 248, 248)", "rgb(56, 126, 245)", "rgb(17, 193, 243)", "rgb(51, 205, 95)", 
			"rgb(255, 201, 0)", "rgb(239, 71, 58)", "rgb(136, 106, 234)", "rgb(68, 68, 68)"], 
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(153, 153, 153)","rgb(183, 183, 183)",
            "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(239, 239, 239)", "rgb(243, 243, 243)", "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
            "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
            "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
            "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
            "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
            "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
            "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
            "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
            "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
            "rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
            "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",
            "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
            "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
        ];

    // enable the spectrum color picker on all eligible sidebar inputs
    $(".enable-cp").each(function(i, obj) {
        $(this).spectrum({
            allowEmpty: false,
            //color: "#6795f5",
            showInput: true,
            showInitial: true,
            showPalette: true,
            preferredFormat: "hex",
            //localStorageKey: "tnstheme." + $(this).attr("id"),
            palette: palette,
            change: function(color) {
                updateCSS($(this).attr("id"), color.toHexString());
            }
        });
    });

	// enable the change event on all eligible sidebar text inputs
	$(".enable-txt").each(function(i, obj) {
		//$(this).change(function() {
		$(this).on("change keyup paste click", function(){
			var val = $(this).val().trim();
			if (val.length > 0) {
				var id = $(this).attr("id");
				// add exception when we need a "px"
				if (id.match(/-px$/)) {
					updateCSS(id, val + "px");
				// add exception when we need a "%"
				} else if (id.match(/-pct$/)) {
					updateCSS(id, val + "%");
				} else {
					updateCSS(id, val);
				}
			}
		});
	});

	// enable toggling of side menus
	$("#side-global").click(function(){
		$("#side-global-items").slideToggle("fast");
	});
	$("#side-widgets").click(function(){
		$("#side-widgets-items").slideToggle("fast");
	});
	$("#side-listviews").click(function(){
		$("#side-listviews-items").slideToggle("fast");
	});
	$("#side-text").click(function(){
		$("#side-text-items").slideToggle("fast");
	});
	$("#side-buttons").click(function(){
		$("#side-buttons-items").slideToggle("fast");
	});
	$("#side-form-elements").click(function(){
		$("#side-form-elements-items").slideToggle("fast");
	});
	$("#side-tabs").click(function(){
		$("#side-tabs-items").slideToggle("fast");
	});

	// hack to change between ios/android font and header style for simulators
	$("#global-font").on("change", function() {
		var os = $(this).val();
		
		// font
		if (os == "ios") {
			$(".device-screen").contents().find("body, h1, h2, h3, h4, h5, h6, button, .tab-item").css("style", "font-family: San Francisco");
		} else if (os == "android") {
			$(".device-screen").contents().find("body, h1, h2, h3, h4, h5, h6, button, .tab-item").css("style", "font-family: Roboto");
		}

		// header
		if (os == "ios") {
			$(".device-screen").contents().find(".bar-positive").removeClass("header-md");
		} else if (os == "android") {
			$(".device-screen").contents().find(".bar-positive").addClass("header-md");
		}

		// device chrome
		if (os == "ios") {
			$(".device-bg").removeClass("device-bg-android");
			$(".device-screen").removeClass("device-screen-android");
		} else if (os == "android") {
			$(".device-bg").addClass("device-bg-android");
			$(".device-screen").addClass("device-screen-android");
		}

		// button text and box shadow
		if (os == "ios") {
			$("#ui-buttons").contents().find(".button").removeClass("btn-android-shadow btn-android-text");
		} else if (os == "android") {
			$("#ui-buttons").contents().find(".btn-primary, .button-outline").addClass("btn-android-shadow");
			$("#ui-buttons").contents().find(".button").addClass("btn-android-text");
		}

		// move tabs to top/bottom
		if (os == "ios") {
			$("#ui-listviews").contents().find(".tabs-positive").removeClass("tabs-striped tabs-top");
			$("#ui-listviews").contents().find(".list-tabs-content").removeClass("list-tabs-content-android");
			$("#ui-tabs").contents().find(".tabs-positive").removeClass("tabs-striped tabs-top");
			$("#ui-tabs").contents().find(".tabs-content").removeClass("tabs-content-android");
		} else if (os == "android") {
			$("#ui-listviews").contents().find(".tabs-positive").addClass("tabs-striped tabs-top");
			$("#ui-listviews").contents().find(".list-tabs-content").addClass("list-tabs-content-android");
			$("#ui-tabs").contents().find(".tabs-positive").addClass("tabs-striped tabs-top");
			$("#ui-tabs").contents().find(".tabs-content").addClass("tabs-content-android");
		}

	});

});

// id = id of color picker or whatever widget from sidebar
// str = value (hex color, string, etc) of associated widget
function updateCSS(id, str) {
	$.getJSON("scripts/data/relations.json", function(data){
		$.each(data, function (index, value) {
			if (id == value.id) {
				// loop through iframes
				$.each(value.iframe, function (index, valueIframe) {
					var iframe = valueIframe.id;
					// loop through web css attributes
					$.each(value.web, function (index, valueWeb) {
						// exception for slider bg color
						if (valueWeb.class == ".range input") {
							$("#" + iframe).contents().find(valueWeb.class).css(valueWeb.attr, "linear-gradient(to right," + str + " 0," + str + " 100%)");
						} else {
							$("#" + iframe).contents().find(valueWeb.class).css(valueWeb.attr, str);
						}
					});
				});

				// have a lot of exceptions to add contrasting text colors when necessary!
				if (id == "global-ab") {
					// when setting action bar, make sure text is contrasting
					$(".device-screen").contents().find(".pane .bar.bar-positive .title").css("color", idealTextColor(str));
				} else if (id == "ios-seg-bar-text-active") {
					// when setting segmented bar text, add contrasting ios "selected" text color
					$("#ui-widgets").contents().find(".segment-ios .segment-button.segment-activated").css("color", idealTextColor(str));
				}

				return;
			}

			// console.log("id: " + value.id);
			// console.log("iframe: " + value.iframe);

			// $.each(value.tns, function (index, valueTns) {
			// 	console.log("tns class: " + valueTns.class);
			// 	console.log("tns attr: " + valueTns.attr);
			// });

			// $.each(value.web, function (index, valueWeb) {
			// 	console.log("web class: " + valueWeb.class);
			// 	console.log("web attr: " + valueWeb.attr);
			// });

		});

		// let's reset the item-divider to always be the basic grey color
		$("#ui-widgets").contents().find(".item-divider").css("background-color", "#f5f5f5");
	});
}

function idealTextColor(bgColor) {

   var nThreshold = 105;
   var components = getRGBComponents(bgColor);
   var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

   return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";   
}

function getRGBComponents(color) {       

    var r = color.substring(1, 3);
    var g = color.substring(3, 5);
    var b = color.substring(5, 7);

    return {
       R: parseInt(r, 16),
       G: parseInt(g, 16),
       B: parseInt(b, 16)
    };
}