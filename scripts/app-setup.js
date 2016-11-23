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
            color: "#6795f5",
            showInput: true,
            showInitial: true,
            showPalette: true,
            preferredFormat: "hex",
            localStorageKey: "tnstheme." + $(this).attr("id"),
            palette: palette,
            change: function(color) {
                updateCSS($(this).attr("id"), color.toHexString());
            }
        });
    });

	// enable the change event on all eligible sidebar text inputs
	$(".enable-txt").each(function(i, obj) {
		$(this).change(function() {
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
	$("#side-listviews-tabs").click(function(){
		$("#side-listviews-tabs-items").slideToggle("fast");
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

	// enable prettied radio buttons
    $(".remodal :radio").labelauty();

    $("#theme-ok").click(function(){
        $("#core-theme").val($("input[name=pick-theme]:checked").val());
		$("#selected-core-theme").text($("input[name=pick-theme]:checked").val());
    });

    $("#theme-cancel").click(function(){
		var value = $("#core-theme").val();
		$("input[name=pick-theme][value=" + value + "]").prop("checked", true);
    });

	// hack to change font (just for simulator)
	$("#global-font").on("change", function() {
		console.log($(this).val());
		$(".device-screen").contents().find("body").attr("style", "font-family: " + $(this).val());
		$(".device-screen").contents().find("h1").attr("style", "font-family: " + $(this).val());
		$(".device-screen").contents().find("h2").attr("style", "font-family: " + $(this).val());
		$(".device-screen").contents().find("h3").attr("style", "font-family: " + $(this).val());
		$(".device-screen").contents().find("h4").attr("style", "font-family: " + $(this).val());
		$(".device-screen").contents().find("h5").attr("style", "font-family: " + $(this).val());
		$(".device-screen").contents().find("h6").attr("style", "font-family: " + $(this).val());
		$(".device-screen").contents().find("button").attr("style", "font-family: " + $(this).val());
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
	});
}