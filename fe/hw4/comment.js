var PageNum = 0;
var currentPage;
var commentSum;

function ProcessPageNum(data) {
	PageNum = data.num;
	commentSum = data.commentNum;
	for (var i = 0; i < PageNum; i++) {
		$('ul.pages').append('<li><a onclick="setCurrentPage(' + i + ')">' + (i + 1) + '</a></li>');
	}
	if (!localStorage.pageID) {
		localStorage.pageID = 1;
	}
	currentPage = localStorage.pageID - 1;
	var currentItem = $('ul.pages li:eq(' + (localStorage.pageID - 1) + '), ul.pages li:eq(' + (localStorage.pageID + PageNum - 1) + ')');
	currentItem.addClass('current');
	currentItem.empty();
	currentItem.append('<span>' + localStorage.pageID + '</span>');
	setTurn(localStorage.pageID - 1);
	setStat(localStorage.pageID - 1);
	getComments(localStorage.pageID - 1);
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
	localStorage.pageID = num + 1;
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