$(function() {

	// enable prettied radio buttons for color theme modal
	$(".icheck").iCheck({radioClass: "iradio_minimal-grey"});

    $("#theme-ok").click(function(){
		acceptColorTheme();
    });

	// pre-select a theme when all iframes are loaded
	var widgetsLoaded = false,
		listviewsLoaded = false,
		textsLoaded = false,
		buttonsLoaded = false,
		formsLoaded = false,
		tabsLoaded = false;

	$("#ui-widgets, #ui-listviews, #ui-texts, #ui-buttons, #ui-forms, #ui-tabs").on("load", function() {
		if (this.id == "ui-widgets") {
			widgetsLoaded = true;
		} else if (this.id == "ui-listviews") {
			listviewsLoaded = true;
		} else if (this.id == "ui-texts") {
			textsLoaded = true;
		} else if (this.id == "ui-buttons") {
			buttonsLoaded = true;
		} else if (this.id == "ui-forms") {
			formsLoaded = true;
		} else if (this.id == "ui-tabs") {
			tabsLoaded = true;
		}

		if (widgetsLoaded && listviewsLoaded && textsLoaded && buttonsLoaded && formsLoaded && tabsLoaded) {
			acceptColorTheme();
		}
	});

});

function acceptColorTheme() {
	// get value of checked radio button
	var val = $("input[name=color-scheme]:checked").val();

	if (val == "undefined") return;

	var widgetColor = $("#" + val + "-color-wd").spectrum("get").toHexString();
	var actionBarColor = $("#" + val + "-color-ab").spectrum("get").toHexString();
	var backgroundColor = $("#" + val + "-color-bg").spectrum("get").toHexString();

	// console.log(widgetColor);
	// console.log(actionBarColor);
	// console.log(backgroundColor);

	$.getJSON("scripts/data/relations.json", function(data){
		$.each(data, function (index, value) {

			var cpId = value.id;
			var color;
			var cp = true;

			// if this is a text field (ends w/ pct or px) or it's a text color, DO NOT set any colors!
			if (cpId.match(/-pct$/) || cpId.match(/-px$/) || 
			cpId == "global-text" || cpId == "tab-label-text-color" ||
			cpId == "buttons-primary-text-color" || cpId == "buttons-disabled-text-color" ||
			cpId == "text-primary-color" || cpId == "text-danger-color" || cpId == "text-muted-color" ||
			cpId == "drawer-header-text-color" || cpId == "drawer-item-text-color" || cpId == "drawer-item-sel-text-color") {
				cp = false;
			}

			if (cp === true) {
				if (cpId.match(/-ab$/) || cpId.indexOf("lbl") !== -1) { // actionbar color or a button label
					color = actionBarColor;
				} else if (cpId.match(/-bg$/)) { // background color
					color = backgroundColor;
				} else {
					color = widgetColor;
				}

				$("#" + cpId).spectrum("set", color);
				$("#" + cpId).spectrum("container").find("button.sp-choose").click();
			}
		});
	});
}