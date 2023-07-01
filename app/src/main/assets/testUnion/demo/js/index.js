var times = 0;
mui('.mui-scroll-wrapper').scroll({
	scrollY: true, //是否竖向滚动
	scrollX: false, //是否横向滚动
	startX: 0, //初始化时滚动至x
	startY: 0, //初始化时滚动至y
	indicators: true, //是否显示滚动条
	deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
	bounce: true //是否启用回弹
});

function gdate(str) {
	var dt = new Date(str);
	return dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
}

function getitems(fileid) {
	var input;
	input = JSON.parse(DATA.getData("file" + fileid))
	// input = {
	// 	"titles": "今天天气真好",
	// 	"indate": "2023-01-28",
	// 	"usertext": "打本",
	// 	"plan1": "p1",
	// 	"plan2": "p2",
	// 	"plan3": "p3",
	// 	"plan4": "p4",
	// 	"plan5": "p5",
	// 	"plan6": "p6",
	// 	"plan7": "p7",
	// 	"usersaying": "决战欧米伽",
	// 	"planfinish1": 0,
	// 	"planfinish2": 0,
	// 	"planfinish3": 0,
	// 	"planfinish4": 0,
	// 	"planfinish5": 0,
	// 	"planfinish6": 0,
	// 	"planfinish7": 0,
	// 	"cntplan": 7,
	// 	"datebtn": 27,
	// 	"datefin": "Sat Jan 31 2023 00:00:00 GMT+0800 (中国标准时间)",
	// 	"finishplancnt": 0
	// }
	var items = {
		title: input.titles,
		finishtime: new Date(input.datefin),
		leasttime: 0,
		start: Number(input.finishplancnt), //完成事件数
		total: Number(input.cntplan),
		next: "这是计划的一部分",
		saying: "时间最不偏私，给任何人都是二十四小时；时间也最偏私，给任何人都不是二十四小时。——赫胥黎",
		usersaying: input.usersaying
	}
	items.leasttime = Math.floor(Number((items.finishtime.getTime() - new Date().getTime()) / 3600 / 24 / 1000));
	items.finishtime = gdate(items.finishtime.toString());
	for (var i = 1; i <= items.total; i++) {
		if (input["planfinish" + i] == 0) {
			items.next = input["plan" + i];
			break;
		}
	}
	return items;
}

function printcards() {
	var carditem = "";
	var itemobj, times;
	times = Number(DATA.getData("IDcnt"));
	// times = 5;
	for (var i = 1; i <= times; i++) {
		itemobj = getitems(i);
		if (itemobj.start >= itemobj.total) continue;
		carditem += '<div class="mui-card" style="margin-bottom: 5%;">\
								<!--页眉，放置标题-->\
								<div class="mui-card-header caihong-color">\
									<h1 class="mui-title" style="color: darkorange;">' + itemobj.title + '</h1>\
								</div>\
								<!--内容区-->\
								<div class="mui-card-content caihong-color">\
									<ul class="mui-table-view">\
										<div class="mui-table-view-cell" style="width: 50%;float: left;">总任务个数\
											<span class="mui-badge mui-badge-primary">' + itemobj.total + '</span>\
										</div>\
										<div class="mui-table-view-cell" style="width: 50%;float: left;">已完成任务个数\
											<span class=" mui-badge mui-badge-success">' + itemobj.start + '</span>\
										</div>\
										<div class="mui-table-view-cell" style="width: 50%;float: left;">剩余时间\
											<span class=" mui-badge mui-badge-danger">' + itemobj.leasttime + '</span>\
										</div>\
										<div class="mui-table-view-cell" style="width: 50%;float: left;">\
											任务完成时间&emsp;<span style="color: coral;">' + itemobj.finishtime + '</span>\
										</div>\
									</ul>\
									<div class="mui-card-footer">\
										"' + itemobj.saying + '"\
									</div>\
									<div class="mui-card-footer">\
										"' + itemobj.usersaying + '"\
									</div>\
								</div>\
								<!--页脚，放置补充信息或支持的操作-->\
								<div class="mui-card-footer caihong-color">\
									<h1 class="mui-title" style="color: darkcyan;">下一个任务：' + itemobj.next + '</h1>\
								</div>\
							</div>'
	}
	document.getElementById("cardboxs").innerHTML = carditem;
}

function printtotal() {
	document.getElementById("total_plan").innerHTML = DATA.getData("plancnt");
	document.getElementById("total_finish").innerHTML = DATA.getData("Finishcnt");
	document.getElementById("total_without").innerHTML = (Number(DATA.getData("plancnt")) - Number(DATA.getData(
		"Finishcnt"))).toString()
	document.getElementById("count_ids").innerHTML = DATA.getData("IDcnt");
}

function fresh() {
	printcards();
	printtotal();
}
document.getElementById("refreshbutton").addEventListener('tap', function() {
	fresh();
})
document.getElementById("whitenotes").addEventListener('tap', function() {
	mui.openWindow({
		url: "white.html",
		id: "whitenotes"
	});
	// SETTINGS.jmp("../htmls/white.html");
});
document.getElementById("settings").addEventListener('tap', function() {
	console.log("洛天依我老婆");
	mui.openWindow({
		url: "setting.html",
		id: "settings"
	})
	// SETTINGS.jmp("../htmls/setting.html");
})
