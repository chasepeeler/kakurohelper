define(["jquery", "underscore", "tmpl", "jquery-ui", "bootstrap"], function($, _, templates) {

	if(!String.prototype.startsWith) {
		String.prototype.startsWith = function(pattern) {
			return 0 === this.lastIndexOf(pattern, 0);
		}
	}
	var defaultAjaxFail = function(jqxhr) {
		var error = {};
		if(jqxhr.status == 401) {
			error.title = "Session Expired";
			error.text = "Please <a href='/frontend/login/' target='_blank'>login</a> again.";
		} else {
			error.title = 'Update Failed';
			error.text = jqxhr.responseText;
		}
		$('#alerts').html(renderTemplate('servererrors', error));
	};

	var defaultAjaxAlways = function() {
		$(window).waitdialog('destroy');
	};



	var renderTemplate = function(template, data) {
		if(templates[template]) {
			return templates[template](data);
		} else {
			return "";
		}
	};

	$(function() {






		$('#boxesForm').submit(function(event){
			event.stopPropagation();
			event.preventDefault();

			var boxes = $('#num_boxes').val();

			var data = {};
			data.num_boxes = boxes;
			data.numberBox = templates.boxes;

			$('#numbersForm').html(renderTemplate('numbersform',data));
			$('#output').html('');
			return false;
		});

		$('#numbersForm').submit(function(event){
			event.stopPropagation();
			event.preventDefault();


			var data = {};
			data.strings = $('#sums').val();
			data.boxes = [];
			$('.number-box').each(function(key,element){
				var l = $(element).val();
				if(l == ""){
					l = "123456789";
				}
				data.boxes.push(l);
			});

			$.post('api.php',data,function(json){
				data = [];
				$.each(json,function(k,box_list) {
					var d = {};
					d.num = k + 1;
					d.list = [];
					d.add = [];
					d.remove = [];
					var inputs = $('#box_' + (k + 1)).val();
					//if(inputs == "") {
					//	inputs = "123456789";
					//}
					for(var i = 0; i < box_list.length; i++) {
						if(-1 == inputs.indexOf(box_list[i])) {
							d.add.push(box_list[i]);
						} else {
							d.list.push(box_list[i]);
						}
					}
					inputs = inputs.split("");
					var outputs = box_list.join("");
					for(i=0;i<inputs.length;i++){
						if(-1 == outputs.indexOf(inputs[i])){
							d.remove.push(inputs[i]);
						}
					}
					data.push(d);
				});

				$('#output').html(renderTemplate('output',data));
			});

			return false;
		});



	});


});
