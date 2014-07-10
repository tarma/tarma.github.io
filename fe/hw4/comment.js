var PageNum = 0;
var currentPage = 0;
var commentSum;

function ProcessPageNum(data) {
	PageNum = data.num;
	commentSum = data.commentNum;
	for (var i = 0; i < PageNum; i++) {
		$('ul.pages').append('<li><a onclick="setCurrentPage(' + i + ')">' + (i + 1) + '</a></li>');
	}
	var currentItem = $('ul.pages li:eq(' + 0 + '), ul.pages li:eq(' + PageNum + ')');
	currentItem.addClass('current');
	currentItem.empty();
	currentItem.append('<span>1</span>');
	setTurn(0);
	setStat(0);
	getComments(0);
}

function setCurrentPage(num) {
	var currentItem = $('ul.pages li:eq(' + currentPage + '), ul.pages li:eq(' + (currentPage + PageNum) + ')');
	var nextItem = $('ul.pages li:eq(' + num + '), ul.pages li:eq(' + (num + PageNum) + ')');
	currentItem.removeClass('current');
	nextItem.addClass('current');
	currentItem.empty();
	nextItem.empty();
	currentItem.append('<a onclick="setCurrentPage(' + currentPage + ')">' + (currentPage + 1) + '</a>');
	nextItem.append('<span>' + (num + 1) +'</span>');
	setTurn(num);
	setStat(num);
	getComments(num);
	currentPage = num;
}

function setTurn(num) {
	$('li.pre').empty();
	$('li.next').empty();
	if (num == 0) {
		$('li.pre').append('<span>上一页</span>');
	} else {
		$('li.pre').append('<a onclick="setCurrentPage(' + (num - 1) + ')">上一页</a>');
	}
	if (num == PageNum - 1) {
		$('li.next').prepend('<span>下一页</span>');
	} else {
		$('li.next').append('<a onclick="setCurrentPage(' + (num + 1) + ')">下一页</a>');
	}
}

function setStat(num) {
	$('div.stat').empty();
	if ((num + 1) * 10 > commentSum) {
		var end = commentSum;
	} else {
		var end = (num + 1) * 10;
	}
	$('div.stat').append('<span>第' + (num * 10 + 1) + '-' + end + '条，共' + commentSum + '条</span>');
}

function getComments(num) {
	var commentsNumRequest = new XMLHttpRequest();
	commentsNumRequest.open('GET', 'comment_content/Page_' + (num + 1) + '.json', true);
	commentsNumRequest.send();
	commentsNumRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			ProcessComment(JSON.parse(this.responseText));
		}
	};
}

function ProcessComment(data) {
	var commentsNum = parseInt(data.num);
	var comments = data.comments;
	$('div#commentBody').empty();
	for (var i = 0; i < commentsNum; i++) {
		$('div#commentBody').append('<div class="comment"></div>');
		var currentItem = $('div#commentBody div.comment:eq(' + i + ')');
		currentItem.append('<div class="icon"><img class="icon" src="' + comments[i].icon + '"></div>');
		currentItem.append('<div class="name"><span>' + comments[i].name + '</span></div>');
		currentItem.append('<div class="commentContent"><span>' + comments[i].comment + '</span></div>');
		currentItem.append('<div class="time"><span>' + comments[i].time + '</span></div>');
	}
}