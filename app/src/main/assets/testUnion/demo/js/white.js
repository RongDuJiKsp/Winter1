var plan = 0;
var startdate = new Date("2023/01/01");
var inputdate = new Date("2023/01/01");

function makeajson() {
	var jsons = $("form").serializeArray();
	var myjson = {},
		flagdate = [0, 0, 0, 0],
		flagtext = 0,
		flagsmall = 0,
		flagsaying = 0;
	flagtitle = 0;
	for (var i = 0; i < jsons.length; i++) {
		if (jsons[i].value != "") {
			myjson[jsons[i].name.toString()] = jsons[i].value;
		}
		if (jsons[i].name == "indate" && jsons[i].value.trim() != "") flagdate[0] = 1;
		else if (jsons[i].name == "year" && jsons[i].value.trim() != "") flagdate[1] = 1;
		else if (jsons[i].name == "month" && parseInt(jsons[i].value.trim()) < 13) flagdate[2] = 1;
		else if (jsons[i].name == "day" && parseInt(jsons[i].value.trim()) < 32) flagdate[3] = 1;
		else if (jsons[i].name == "usertext" && jsons[i].value.trim() != "") flagtext = 1;
		else if (jsons[i].name == "usersaying" && jsons[i].value.trim() != "") flagsaying = 1;
		else if (jsons[i].name == "plan1" && jsons[i].value.trim() != "") flagsmall = 1
		else if (jsons[i].name == "titles" && jsons[i].value.trim() != "") flagtitle = 1
	}
	for (var i = 1; i <= plan; i++) {
		myjson["planfinish" + i] = 0;
	}
	myjson["cntplan"] = plan;
	if (flagdate[0]) inputdate = new Date(myjson.indate.replace(/-/g, "/"));
	else inputdate = new Date(myjson.year + '/' + myjson.month + '/' + myjson.day);
	myjson["datebtn"] = ((inputdate - startdate) / 3600 / 24 / 1000);
	myjson["datefin"] = inputdate.toString();
	myjson["finishplancnt"] = 0;
	if ((flagdate[0] || (flagdate[1] && flagdate[2] && flagdate[3])) && flagtext && flagsaying && flagsmall &&
		flagtitle)
		return myjson;
	else return 0;
}

function submit(subjson) {
	var fileid = Number(DATA.getData("IDcnt")) + 1;
	DATA.setData("file" + fileid, JSON.stringify(subjson));
	DATA.setData("IDcnt", fileid.toString());
	DATA.setData("plancnt", String(Number(DATA.getData("plancnt")) + subjson.cntplan));
}

function deleterun() {
	if (plan == 0) {
		mui.alert('最小0个计划！', '提示', '确认', function(e) {
			e.index
		}, 'div')
		return;
	}
	document.getElementById("plan" + plan).style = "display:none;";
	plan -= 1;
}

function onrun() {
	if (plan == 30) {
		mui.alert('最大30个计划！', '提示', '确认', function(e) {
			e.index
		}, 'div')
		return;
	}
	plan += 1;
	document.getElementById("plan" + plan).style = "display:block;sss";


}

document.getElementById("rubutton").addEventListener('tap', function() {
	onrun();
	document.getElementById("cntofjh").innerHTML = '计划个数：' + plan;
});
document.getElementById("rubutton-delete").addEventListener('tap', function() {
	deleterun();
	document.getElementById("cntofjh").innerHTML = '计划个数：' + plan;
});
document.getElementById("submitbutton").addEventListener('tap', function() {
	mui(this).button('loading');
	var obj = makeajson();
	console.log(JSON.stringify(obj));
	if (obj != 0) {
		submit(obj);
		mui.alert('提交成功！', '提交计划', 'OK', function() {
			setTimeout(function() {
				mui.back();
				// SETTINGS.jmp("../htmls/index.html");
			}, 500);
		}, 'div')
	} else {
		//不符合要求的代码写这里
		mui.alert('请检查日期是否合法且完整，标题，大计划及详细计划是否填写', '警告：提交失败', '确定', function(e) {
			e.index
		}, 'div')
		mui(this).button('reset');
	}
});
