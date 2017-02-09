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

			// if this is a text field (ends w/ pct or px) or it's a text color, DO NOT set any colors!
			var cp = isColor(cpId);

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

			// sometimes we still have to override the default colors
			if (cpId == "ios-seg-bar-text-ios-active") {
				$("#" + cpId).spectrum("container").find("button.sp-choose").click();
			}
		});
	});
}

function isColor(cpId) {
	// function tells us whether or not a given input is a color picker or not ***that should be overridden when we choose a theme***
	if (cpId.match(/-pct$/) || cpId.match(/-px$/) || 
	cpId == "global-text" || cpId == "tab-label-text-color" ||
	cpId == "buttons-primary-text-color" || cpId == "buttons-disabled-text-color" ||
	cpId == "text-primary-color" || cpId == "text-danger-color" || cpId == "text-muted-color" ||
	cpId == "drawer-header-text-color" || cpId == "drawer-item-text-color" || cpId == "drawer-item-sel-text-color" || cpId == "ios-seg-bar-text-ios-active") {
		return false;
	} else {
		return true;
	}
}

function isColorPicker(cpId) {
	// function tells us whether or not a given input is a color picker or not
	if (cpId.match(/-pct$/) || cpId.match(/-px$/)) {
		return false;
	} else {
		return true;
	}
}

function readCSSFile(evt) {
	var files = evt.target.files;
	var file = files[0];           
	var reader = new FileReader();
	reader.onload = function() {
		//console.log(this.result);      
		var lines = this.result.split('\n');
		var myClass = "";
		var myAttr = "";
		var myVal = "";
		var lineAV;
		
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i].replace('{', '').replace('}','').trim();

			if (line.startsWith('.')) { // starts with "."? must be the class
				myClass = line;
			} else if (line.length > 0) { // otherwise, split the line on an empty space
				lineAV = line.split(' ');
				for (var ii = 0; ii < lineAV.length; ii++) {
					var l = lineAV[ii].trim();
					if (l.endsWith(':')) { // ends with ":"? must be attribute
						myAttr = l.replace(":","");
					} else if (l.endsWith(';')) { // ends with ";"? must be value
						myVal = l.replace(";","");
					}
				}
			}

			if (myClass.length > 0 && myAttr.length > 0 && myVal.length > 0) {
				setCSSFileValue(myClass, myAttr, myVal);
				myClass = "";
				myAttr = "";
				myVal = "";
			}
		}
	}
	reader.readAsText(file)

	// reset the form field
	$("#file").val("");
}

function setCSSFileValue(myClass, myAttr, myVal) {
	var done = false;
	$.getJSON("scripts/data/relations.json", function(data){
		$.each(data, function (index, value) {
			var elementId = value.id;
			// loop through tns
			$.each(value.tns, function (index, valueTns) {
				var tnsClass = valueTns.class;
				var tnsAttr = valueTns.attr;
				if (myClass == tnsClass && myAttr == tnsAttr) {
					if (isColorPicker(elementId)) {
						$("#" + elementId).spectrum("set", myVal);
						$("#" + elementId).spectrum("container").find("button.sp-choose").click();
					} else {
						$("#" + elementId).val(myVal).change();
					}
				}
			});
		});
	});
}