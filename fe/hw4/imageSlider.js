var current = 0;
var imageNum = 0;
var id;
var timeoutCount = 0;
var timeoutID;

function ProcessImageData(data) {
	var enter = [];
	for (var a in data) {
		$('div#selector').before('<div class="sliderItem"><img class="sliderItem" src="' + data[a] + '"></div');
		$('div#selector').append('<span></span>');
		imageNum++;
		if (imageNum > 1) {
			$('div.sliderItem').last().css('opacity', 0);
		} else {
			$('div.sliderItem').first().css('opacity', 0.94);
		}
		$('div.sliderItem').last().append('<h2>' + a + '</h2>');
		enter[imageNum - 1] = function(num) {
			return function() {
				setCurrent(num);
				window.clearInterval(window.id);
			}
		}(imageNum - 1);
		$('div#selector span').last().mouseenter(enter[imageNum - 1]);
		$('div#selector span').last().mouseleave(function () {
			id = setInterval('setCurrent(current + 1)', 5000);
		});
	}
	$('div#selector span:first').addClass('selected');
}

$(document).ready(function() {
	var xmlRequest = new XMLHttpRequest();
	xmlRequest.open('GET', 'imageList.json', true);
	xmlRequest.send();
	
	var PageRequest = new XMLHttpRequest();
	PageRequest.open('GET', 'pageNum.json', true);
	PageRequest.send();

	xmlRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			ProcessImageData(JSON.parse(this.responseText));
		}
	};
	
	PageRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			ProcessPageNum(JSON.parse(this.responseText));
		}
	}
	
	$('div#toLeft').click(function() {
		setCurrent(current - 1);
		if (timeoutCount) {
			timeoutCount--;
			clearTimeout(timeoutID);
		}
		clearInterval(id);
		timeoutID = setTimeout("id = window.setInterval('setCurrent(current + 1)', 5000)", 2000);
		timeoutCount++;
	});
	$('div#toRight').click(function() {
		setCurrent(current + 1);
		if (timeoutCount) {
			timeoutCount--;
			clearTimeout(timeoutID);
		}
		clearInterval(id);
		timeoutID = setTimeout("id = window.setInterval('setCurrent(current + 1)', 5000)", 2000);
		timeoutCount++;
	});
	id = setInterval('setCurrent(current + 1)', 5000);
});

function setCurrent(num) {
	if (current == num) {
		return;
	}
	if (num == -1) {
		num = imageNum - 1;
	}
	if (num == imageNum) {
		num = 0;
	}
	$('div.sliderItem:eq(' + num + ')').css('opacity', 0.94);
	$('div.sliderItem:eq(' + current + ')').css('opacity', 0);
	$('div#selector span:eq(' + num +')').addClass('selected');
	$('div#selector span:eq(' + current + ')').removeClass('selected');
	current = num;
}