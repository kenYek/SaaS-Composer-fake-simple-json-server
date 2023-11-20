(function(global) {
    if(global.scPlugin &&
        global.scPlugin.datasource &&
        global.scPlugin.datasource["fake-simple-json-datasource"]){
        return;
    }
    commonUtil.createObjFromString(global,'scPlugin.datasource.fake-simple-json-datasource',{});

var simpleJsonSource = {};

simpleJsonSource.deviceConnectUI = function(sourceFormPane, targets) {
	console.log('--- in source deviceConnectUI fake-simple-json ---')
    // header row
    let tableRow = new ht.ui.TableRow();
    var label = new ht.ui.Label();
    label.setText('HeaderG:');
    tableRow.addView(label);

    var textArea = new ht.ui.TextArea();
    textArea.setFormDataName('header');
    tableRow.addView(textArea);

    tableLayout.addView(tableRow);
    // body row
    tableRow = new ht.ui.TableRow();
    var label = new ht.ui.Label();
    label.setText('Layer:');
    tableRow.addView(label);

	let comboBox1 = new ht.ui.ComboBox();
	comboBox1.setDatas([1,2,3,4,5]);
	comboBox1.on('p:value', function(e) { // 监听选择事件
		console.log(e.newValue);
    });
	comboBox1.setFormDataName('layer');
    tableRow.addView(comboBox1);

	tableLayout.addView(tableRow);

	// max layer row
	tableRow = new ht.ui.TableRow();
    var label = new ht.ui.Label();
    label.setText('Max Layer:');
    tableRow.addView(label);
	comboBox1 = new ht.ui.ComboBox();
	comboBox1.setDatas([1,2,3,4,5,6,7,8,9,10]);
	comboBox1.on('p:value', function(e) { // 监听选择事件
		console.log(e.newValue);
    });
	comboBox1.setFormDataName('maxLayer');
    tableRow.addView(comboBox1);
    tableLayout.addView(tableRow);

	// count row
	tableRow = new ht.ui.TableRow();
    var label = new ht.ui.Label();
    label.setText('Count:');
    tableRow.addView(label);
	comboBox1 = new ht.ui.ComboBox();
	comboBox1.setDatas([1,2,3,4,5]);
	comboBox1.on('p:value', function(e) { // 监听选择事件
		console.log(e.newValue);
    });
	comboBox1.setFormDataName('count');
    tableRow.addView(comboBox1);
    tableLayout.addView(tableRow);

	// index row
	tableRow = new ht.ui.TableRow();
    var label = new ht.ui.Label();
    label.setText('Index:');
    tableRow.addView(label);
	comboBox1 = new ht.ui.ComboBox();
	comboBox1.setDatas([1,2,3,4,5]);
	comboBox1.on('p:value', function(e) { // 监听选择事件
		console.log(e.newValue);
    });
	comboBox1.setFormDataName('idx');
    tableRow.addView(comboBox1);
    tableLayout.addView(tableRow);
}

simpleJsonSource.saveFloorPlan = function(sourceInfo) {
    console.log('--- in source saveFloorPlan fake-simple-json ---', sourceInfo)
}

simpleJsonSource.getDeviceTree = function(sourceInfo) {
    console.log('--- in source device tree fake-simple-json ---', sourceInfo)
	const deviceList = [
		{
			id: 'g1',
			name: 'g1',
			type: 'device'
		}
	]
	var sourceList = dataSourceUtil.getSourceListByOrg();
	var orgId = commonUtil.getParamFromURL('org_id');
	const deviceConection = sourceInfo[0].deviceConection;
	const sourceName = deviceConection.sourceName;
	const postBody = {
		count: deviceConection.count,
		idx: deviceConection.idx,
		layer: deviceConection.layer,
		maxLayer: deviceConection.maxLayer
	}
	return new Promise((resolve, reject) => {
		let exist = false;
		console.log('body:****', postBody)
		//  body: JSON.stringify(JSON.parse(deviceConection.body))
		for (var i = 0; i < sourceList.length; i++) {
			if (sourceName == sourceList[i]['name']) {				
				fetch(`${sourceList[i].url}/assetsTopology`,{
					mode: "cors",
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": '*'
					},
					body: JSON.stringify(postBody)
				})
				.then(function (response) {
					return response.json();
				})
				.then(function (myJson) {
					if (myJson.assetsTree) {
						resolve(myJson.assetsTree);
					} else {
						resolve([]);
					}
				})
				exist = true;
				break;
			}
		}
		if (!exist) {
			resolve(deviceList);
		}
    })
}

simpleJsonSource.dataBindingUI = function(sourceFormPane, targets) {
	var S = hteditor.getString;
	if (targets && targets[0] && targets[0]['sourceType']) {
		dataBindingUI.addSrouceTypeRow(sourceFormPane, targets[0]['sourceType']);
	}else{
		dataBindingUI.addSrouceTypeRow(sourceFormPane);
	}
	if (targets && targets[0] && targets[0]['formatType']) {
		dataBindingUI.addFormatTypeRow(sourceFormPane, targets[0]['formatType']);
	}else{
		dataBindingUI.addFormatTypeRow(sourceFormPane);
	}
	if (targets && targets[0] && targets[0]['scDataType']) {
		dataBindingUI.addDataTypeRow(sourceFormPane, targets[0]['scDataType']);
	}else{
		dataBindingUI.addDataTypeRow(sourceFormPane);
	}
	if (targets && targets[0] && targets[0]['sourceType']) {
		var targetListComboBox = new ht.widget.ComboBox();

		// scadaNodeComboBox.setValue(source);
		targetListComboBox.setWidth(90);
		targetListComboBox.setDropDownWidth(140);
		targetListComboBox.setEditable(true);
		targetListComboBox.onValueChanged = function() {};
		sourceFormPane.addRow([S('target'), {
			id: 'target',
			label: 'String',
			element: targetListComboBox,
			unfocusable: true
		}], [55, 0.1]);

		dataSourceUtil.sendHttpReqBySourceType(targets[0]['sourceType'], '/search', [], function (response) {
			if (Array.isArray(response) && response.length > 0) {
				var values, labels;
				if (typeof (response[0]) === "string") {
					values = response,
						labels = response;
				} else {
					values = [], labels = [];
					for (var i = 0; i < response.length; i++) {
						values.push(response[i]['text']);
						labels.push(response[i]['text']);
					}
				}
				targetListComboBox.setValues(values);
				targetListComboBox.setLabels(response);
				if (typeof (targets[0]['target']) != "undefined") {
					targetListComboBox.setValue(targets[0]['target']);
				} else {
					targetListComboBox.setValue(values[0]);
				}
			}

			return true;
		});
	}
}

simpleJsonSource.applyDataBindingUI = function(sourceFormPane) {
	var targets = [];
	var paneRows = sourceFormPane.getRows();
	var target = {};
	for (var i = 0; i < paneRows.length; i++) {
		if (paneRows[i]['items']) {
			target[paneRows[i]['items'][1]['id']] = sourceFormPane.v(paneRows[i]['items'][1]['id']);
		}
	}
	targets.push(target);
	return targets;
};

simpleJsonSource.mapToValue = function(aniPropName, formatType, dataResult){
    //special property list
    //table
    if (['table.columns','table.dataSource'].indexOf(aniPropName) > -1) {
        return dataResult;
    }

     if (formatType == 'timeseries') {
        return dataRefreshUtil.refreshTimeSeriesData(dataResult);
    } else if (formatType == 'table') {
        return dataRefreshUtil.refreshTableData(dataResult);
    } else {
        return dataResult
    }
    return dataResult;
};


simpleJsonSource.getValue = function (sourceName, reqTargets, callback, option) {
	var queryType = '/query';
	var proxyqueryType = '/api/datasource/proxy/query';
	var sourceList = dataSourceUtil.getSourceListByOrg();
	var orgId = commonUtil.getParamFromURL('org_id');
	var fileName;
	if (typeof option != 'undefined' && option['fileName']) {
		fileName = option['fileName']
	}

	for (var i = 0; i < sourceList.length; i++) {
		if (sourceName == sourceList[i]['name']) {
			//check plugin type

			//start send
			/*var xhttp;
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					if (typeof(callback) != "undefined") {
						// console.log('------------------------------------------------');
						// console.log(this.response);
						if (this.responseURL.includes("proxy")) {
							var res = JSON.parse(this.response)
							if(res.errCode == 0){
								callback(res.data);
							}else{
								return false
							}
						}else{
							if(typeof(this.response) == 'string'){
								callback(JSON.parse(this.response));
							}else{
								callback(this.response);
							}
						}
						// console.log(JSON.parse(this.response));
						// console.log('------------------------------------------------');
					}
				}
				return true;
			};

			if (sourceList[i].access == "proxy") {
				var localhostUrl  = window.location.origin
				xhttp.open("POST", localhostUrl + proxyqueryType, true);
			}else {
				xhttp.open("POST", sourceList[i].url + queryType, true);
			}
			// xhttp.open("POST", sourceList[i].url + "/query", true);
			xhttp.timeout = 30000; 
            xhttp.ontimeout = function (e) {};

			if (sourceList[i].basic_auth) {
				xhttp.setRequestHeader("Authorization", "Basic " + btoa(sourceList[i].basic_auth_user + ":" + sourceList[i].basic_auth_password));
			}
			xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
			if (sourceList[i].with_credentials) {
				var token = commonUtil.getCookie("EIToken");
				xhttp.setRequestHeader("Authorization","Bearer "+token);
			}
			if (sourceList[i].with_credentials || sourceList[i].basic_auth) {
				xhttp.withCredentials = sourceList[i].with_credentials;
			}

			var curDate = new Date();
			var pastDate = new Date();
			var rangeObj = {};
			pastDate.setSeconds(curDate.getSeconds() - 300);

			// change variables
			for (var j = 0; j < reqTargets.length; j++){
				if(reqTargets[j]["target"]){
					reqTargets[j]["target"] = dataRefreshUtil.variableSrv.replaceWithText(reqTargets[j]["target"]);
				}
			}

			var jsonStr = {
					"range": {
							"from": pastDate,
							"to": curDate
					},
					"rangeRaw": {
							"from": "now-5m",
							"to": "now"
					},
					"maxDataPoints": 400,
					"interval": "1s",
					"intervalMs": 1000,
					"targets": reqTargets
			};
			if (dataRefreshUtil && dataRefreshUtil.timeRange) {
				rangeObj = dataRefreshUtil.timeRange.currentRange();
				if(rangeObj){
					jsonStr["range"] = rangeObj["range"];
					jsonStr["rangeRaw"] = rangeObj["rangeRaw"];
					jsonStr["interval"] = rangeObj["interval"];
					jsonStr["intervalMs"] = rangeObj["intervalMs"];
					jsonStr["maxDataPoints"] = rangeObj["maxDataPoints"];
				}
			}

			if (sourceList[i].access == "proxy"){
				jsonStr['sourceList'] = sourceList[i];
				jsonStr['org_id'] = parseInt(orgId);
				xhttp.send(JSON.stringify(jsonStr));
			}else if (sourceList[i].access == "direct"){
				jsonStr['org_id'] = parseInt(orgId);
				xhttp.send(JSON.stringify(jsonStr));
			} else if(sourceList[i].access == "websocket") {
				if (typeof(socketUtil) != 'undefined') {
					jsonStr['sourceList'] = sourceList[i];
					jsonStr['org_id'] = parseInt(orgId);

					var msg = {};
					msg.title = "socket_query";
					msg.from  = "front-end test";
					msg.data  = jsonStr;

					socketUtil.send('data', msg, callback);
				}
			}*/
			//end send

			var isProxy = sourceList[i].access == "proxy";
			var postUrl  = window.location.origin;
			if (sourceList[i].access == "proxy") {
				postUrl = postUrl + proxyqueryType;
			}else {
				postUrl = sourceList[i].url + queryType;
			}
			var header = {"Content-type":'application/json; charset=UTF-8'}
			if (sourceList[i].basicAuth) {
				header = Object.assign(header, {"Authorization": "Basic " + btoa(sourceList[i].basicAuthUser + ":" + sourceList[i].basicAuthPassword)});
			}
			var withCredentials = false;
			if (sourceList[i].with_credentials || sourceList[i].basic_auth) {
				withCredentials = sourceList[i].with_credentials;
			}
			if (sourceList[i].with_credentials) {
				var token = commonUtil.getCookie("EIToken");
				header = Object.assign(header, {"Authorization": "Bearer " + token});
			}

			var curDate = new Date();
			var pastDate = new Date();
			var rangeObj = {};
			pastDate.setSeconds(curDate.getSeconds() - 300);

			// change variables
			for (var j = 0; j < reqTargets.length; j++){
				if(reqTargets[j]["target"]){
					if (typeof fileName != 'undefined') {
						reqTargets[j]["target"] = dataRefreshUtil.variableSrv.replaceWithTextByFileName(fileName, reqTargets[j]["target"]);
					} else {
						reqTargets[j]["target"] = dataRefreshUtil.variableSrv.replaceWithText(reqTargets[j]["target"]);
					}
				}
			}

			var jsonStr = {
					"range": {
							"from": pastDate,
							"to": curDate
					},
					"rangeRaw": {
							"from": "now-5m",
							"to": "now"
					},
					"maxDataPoints": 400,
					"interval": "1s",
					"intervalMs": 1000,
					'jsondata': sourceList[i].json_data,
					"targets": reqTargets
			};
			if (dataRefreshUtil && dataRefreshUtil.timeRange) {
				if (typeof fileName != 'undefined') {
					rangeObj = dataRefreshUtil.timeRange.currentRangeByFileName(fileName);
				} else {
					rangeObj = dataRefreshUtil.timeRange.currentRange();
				}
				if(rangeObj){
					jsonStr["range"] = rangeObj["range"];
					jsonStr["rangeRaw"] = rangeObj["rangeRaw"];
					jsonStr["interval"] = rangeObj["interval"];
					jsonStr["intervalMs"] = rangeObj["intervalMs"];
					jsonStr["maxDataPoints"] = rangeObj["maxDataPoints"];
				}
			}
			if(sourceList[i].access == "websocket") {
				if (typeof(socketUtil) != 'undefined') {
					jsonStr['sourceList'] = sourceList[i];
					jsonStr['org_id'] = parseInt(orgId);

					var msg = {};
					msg.title = "socket_query";
					msg.from  = "front-end test";
					msg.data  = jsonStr;

					socketUtil.send('data', msg, callback);
				}
			} else {
				var body = '';
				if (isProxy){
					jsonStr['sourceList'] = sourceList[i];
					jsonStr['org_id'] = parseInt(orgId);
					body = JSON.stringify(jsonStr);
				}else if (sourceList[i].access == "direct"){
					jsonStr['org_id'] = parseInt(orgId);
					body = JSON.stringify(jsonStr);
				}
				workerUtil.postmessage({
					method:'httpPost',
					arguments:[postUrl,{
						header:header,
						withCredentials: withCredentials,
						body: body
					}]},
					function(response){
						if (typeof(callback) != "undefined") {
							if (isProxy) {
								var res = JSON.parse(response)
								if (res.errCode == 0) {
									callback(res.data);
								} else {
									return false
								}
							} else {
								if(typeof(response) == 'string'){
									callback(JSON.parse(response));
								}else{
									callback(response);
								}
							}
						}
						return true;
					}
				);
			}
			break;
		}
	}
	return true;
}

simpleJsonSource.setValue = function(sourceName, reqTargets, callback) {
    var sourceInfo = dataSourceUtil.getSourceInfo(sourceName);
	var EIToken = commonUtil.getCookie("EIToken");

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (typeof(callback) != "undefined") {
                if (typeof(this.response) == 'string' && this.response.length > 0) {
                    callback(JSON.parse(this.response));
                } else {
                    callback(this.response);
                }
            }
        }
        return true;
    };

    xhttp.open("POST", sourceInfo['url'] + '/setValue', true);
	xhttp.setRequestHeader("Authorization","Bearer "+EIToken);
	xhttp.timeout = 30000; 
    xhttp.ontimeout = function (e) {};
    if (sourceInfo["basicAuth"]) {
        xhttp.setRequestHeader("Authorization", "Basic " + btoa(sourceInfo['basicAuthUser'] + ":" + sourceInfo['basicAuthPassword']));
    }

    xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    if (sourceInfo["with_credentials"] || sourceInfo["basicAuth"]) {
        xhttp.withCredentials = sourceInfo["with_credentials"];
    }

    // xhttp.withCredentials = sourceInfo["with_credentials"];
    xhttp.send(JSON.stringify(reqTargets));
    return true;
    
};


simpleJsonSource.closeGraph = function (sourceName, sourceType, reqTargets, sourceObject) {
	console.log('simple json close graph')
}

  global.scPlugin.datasource["fake-simple-json-datasource"] = simpleJsonSource;
})(this);