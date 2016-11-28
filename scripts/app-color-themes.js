$(function() {

	// enable prettied radio buttons for color theme modal
	$(".icheck").iCheck({radioClass: "iradio_minimal-grey"});

    $("#theme-ok").click(function(){

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

				if (cpId.match(/-ab$/)) { // actionbar color
					color = actionBarColor;
				} else if (cpId.match(/-bg$/)) { // background color
					color = backgroundColor;
				} else {
					color = widgetColor;
				}

				$("#" + cpId).spectrum("set", color);

			});
		});

    });

});