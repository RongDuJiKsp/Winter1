function getjsons(fileid) {
    var input;
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
    // 	"planfinish1": 1,
    // 	"planfinish2": 1,
    // 	"planfinish3": 1,
    // 	"planfinish4": 0,
    // 	"planfinish5": 0,
    // 	"planfinish6": 0,
    // 	"planfinish7": 0,
    // 	"cntplan": 7,
    // 	"datebtn": 27,
    // 	"datefin": "Sat Jan 28 2023 00:00:00 GMT+0800 (中国标准时间)",
    // 	"finishplancnt": 0
    // };
    input = JSON.parse(DATA.getData("file" + fileid));
    var items = {
        id: fileid,
        titles: input.titles,
        plans: input.cntplan,
        finishplans: Number(input.finishplancnt)
    }
    for (var i = 1; i <= items.plans; i++) {
        items["plan" + i] = input["plan" + i];
        items["planfinish" + i] = Number(input["planfinish" + i]);
    }
    console.log(JSON.stringify(items));
    return items;
}

function finish(fileid, planid) {
    var input;
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
    // 	"datefin": "Sat Jan 28 2023 00:00:00 GMT+0800 (中国标准时间)",
    // 	"finishplancnt": 0
    // };
    input = JSON.parse(DATA.getData("file" + fileid));
    input.finishplancnt = Number(input.finishplancnt);
    input.finishplancnt += 1;
    input["planfinish" + planid] = 1;
    DATA.setData("file" + fileid, JSON.stringify(input));
    DATA.setData("Finishcnt", String(Number(DATA.getData("Finishcnt")) + 1));
}

function tapact(idfile, idplan) {
    mui.confirm('请注意，一旦确认完成后无法更改', '警告', ['重新检查', '确认提交'], function (e) {
        if (e.index == 1) {
            finish(idfile, idplan);
            console.log(114514);
            // setTimeout(function() {
            // 	SETTINGS.jmp("../htmls/index.html");
            // }, 500);
            location.reload();
        } else {
            mui.toast('你已取消更改！');
        }
    }, 'div')
}

function listener(a, b, obj) {
    obj.addEventListener('tap', function () {
        tapact(a, b);
    })
}

function addlisten(injson) {
    for (var i = 1; i <= injson.plans; i++) {
        var obj = document.getElementById(injson.id + "plan" + i);
        if (injson["planfinish" + i] == "0") {
            listener(injson.id, i, obj);
            obj.style.backgroundImage = "linear-gradient(to right, #fa709a 0%, #fee140 100%)";
        } else {
            obj.style.backgroundImage = "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)";
        }
    }
}

function main_loadsetting() {
    var t1, t2, objson, obj, titleobj, cnt, t;
    // t = 15;
    t = Number(DATA.getData("IDcnt"));
    for (var i = 1; i <= t; i++) {
        objson = getjsons(i);
        if (objson.plans <= objson.finishplans) continue;
        addlisten(objson);
        titleobj = document.getElementById("title" + i);
        titleobj.innerHTML = objson.titles;
        document.getElementById(i + "plan").style.display = "block";
        t2 = objson.plans;
        for (var j = 1; j <= t2; j++) {
            obj = document.getElementById(objson.id + "plan" + j);
            obj.innerHTML = objson["plan" + j];
        }
        for (var j = t2 + 1; j <= 30; j++) {
            document.getElementById(objson.id + "plan" + j).style.display = "none";
        }
    }
}

mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});
