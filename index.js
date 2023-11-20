var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

app.use(bodyParser.json());

var timeserie = require('./series');
var countryTimeseries = require('./country-series');
var aiaaText = require('./aiaa_text');

var now = Date.now();

// for (var i = timeserie.length -1; i >= 0; i--) {
//   var series = timeserie[i];
//   var decreaser = 0;
//   for (var y = series.datapoints.length -1; y >= 0; y--) {
//     series.datapoints[y][1] = Math.round((now - decreaser) /1000) * 1000;
//     decreaser += 50000;
//   }
// }

var timeserie = []
var mapData = {"target": "map_01", "datapoints": [["0,20,13", 1450754160], [2.0, 1450754220], [1.0, 1450754280], [0.0, 1450754340], [1.0, 1450754400], [1.0, 1450754460], [1.0, 1450754520], [1.0, 1450754580], [1.0, 1450754640], [1.0, 1450754700], [2.0, 1450754760], [1.0, 1450754820], [165.0, 1450754880], [5.0, 1450754940], [1.0, 1450755000], [1.0, 1450755060], [5.0, 1450755120], [2.0, 1450755180], [2.0, 1450755240], [1.0, 1450755300], [1.0, 1450755360], [7.0, 1450755420], [4.0, 1450755480], [1.0, 1450755540], [7.0, 1450755600], [7.0, 1450755660], [1.0, 1450755720], [2.0, 1450755780], [1.0, 1450755840], [1.0, 1450755900], [2.0, 1450755960], [1.0, 1450756020], [1.0, 1450756080], [2.0, 1450756140], [1.0, 1450756200], [7.0, 1450756260], [2.0, 1450756320], [2.0, 1450756380], [1.0, 1450756440], [8.0, 1450756500], [7.0, 1450756560], [1.0, 1450756620], [2.0, 1450756680], [2.0, 1450756740], [2.0, 1450756800], [2.0, 1450756860], [18.0, 1450756920], [1.0, 1450756980], [1.0, 1450757040], [1.0, 1450757100], [1.0, 1450757160], [6.0, 1450757220], [2.0, 1450757280], [1.0, 1450757340], [2.0, 1450757400], [2.0, 1450757460], [1.0, 1450757520], [1.0, 1450757580], [1.0, 1450757640], [1.0, 1450757700], [1.0, 1450757760], [1.0, 1450757820], [15.0, 1450757880], [5.0, 1450757940], [2.0, 1450758000], [1.0, 1450758060], [1.0, 1450758120], [1.0, 1450758180], [1.0, 1450758240], [1.0, 1450758300], [1.0, 1450758360], [1.0, 1450758420], [1.0, 1450758480], [1.0, 1450758540], [1.0, 1450758600], [2.0, 1450758660], [1.0, 1450758720], [2.0, 1450758780], [1.0, 1450758840], [1.0, 1450758900], [1.0, 1450758960], [1.0, 1450759020], [1.0, 1450759080], [1.0, 1450759140], [8.0, 1450759200], [1.0, 1450759260], [2.0, 1450759320], [1.0, 1450759380], [1.0, 1450759440], [1.0, 1450759500], [2.0, 1450759560], [2.0, 1450759620], [1.0, 1450759680], [1.0, 1450759740], [2.0, 1450759800], [1.0, 1450759860], [1.0, 1450759920], [1.0, 1450759980], [1.0, 1450760040], [2.0, 1450760100], [9.0, 1450760160], [1.0, 1450760220], [2.0, 1450760280], [1.0, 1450760340], [0.0, 1450760400], [1.0, 1450760460], [1.0, 1450760520], [1.0, 1450760580], [2.0, 1450760640], [1.0, 1450760700], [2.0, 1450760760], [1.0, 1450760820], [3.0, 1450760880], [3.0, 1450760940], [1.0, 1450761000], [1.0, 1450761060], [1.0, 1450761120], [1.0, 1450761180], [1.0, 1450761240], [1.0, 1450761300], [1.0, 1450761360], [1.0, 1450761420], [1.0, 1450761480], [1.0, 1450761540], [2.0, 1450761600], [1.0, 1450761660], [1.0, 1450761720], [1.0, 1450761780], [1.0, 1450761840], [1.0, 1450761900], [1.0, 1450761960], [2.0, 1450762020], [2.0, 1450762080], [1.0, 1450762140], [2.0, 1450762200], [1.0, 1450762260], [1.0, 1450762320], [8.0, 1450762380], [1.0, 1450762440], [2.0, 1450762500], [1.0, 1450762560], [2.0, 1450762620], [1.0, 1450762680], [1.0, 1450762740], [1.0, 1450762800], [1.0, 1450762860], [1.0, 1450762920], [1.0, 1450762980], [1.0, 1450763040], [1.0, 1450763100], [1.0, 1450763160], [1.0, 1450763220], [1.0, 1450763280], [2.0, 1450763340], [1.0, 1450763400], [1.0, 1450763460], [1.0, 1450763520], [1.0, 1450763580], [2.0, 1450763640], [1.0, 1450763700], [1.0, 1450763760], [2.0, 1450763820], [1.0, 1450763880], [1.0, 1450763940], [1.0, 1450764000], [1.0, 1450764060], [2.0, 1450764120], [2.0, 1450764180], [5.0, 1450764240], [2.0, 1450764300], [1.0, 1450764360], [2.0, 1450764420], [1.0, 1450764480], [2.0, 1450764540], [1.0, 1450764600], [2.0, 1450764660], [1.0, 1450764720], [1.0, 1450764780], [1.0, 1450764840], [2.0, 1450764900], [1.0, 1450764960], [1.0, 1450765020], [1.0, 1450765080], [1.0, 1450765140], [1.0, 1450765200], [1.0, 1450765260], [2.0, 1450765320], [1.0, 1450765380], [1.0, 1450765440], [1.0, 1450765500], [1.0, 1450765560], [1.0, 1450765620], [1.0, 1450765680], [1.0, 1450765740], [1.0, 1450765800], [1.0, 1450765860], [1.0, 1450765920], [1.0, 1450765980], [1.0, 1450766040], [1.0, 1450766100], [3.0, 1450766160], [1.0, 1450766220], [1.0, 1450766280], [18.0, 1450766340], [1.0, 1450766400]]}
timeserie.push(mapData)
for (var i = 0; i < 50; i++) {
  var series = {"target": "upper_" + i, "datapoints":[]};
  var decreaser = 0;
  for (var y = 0; y < 50; y++) {
    series.datapoints[y] = [0, 0]
    series.datapoints[y][0] = Math.round(Math.random() * 100)
    series.datapoints[y][1] = Math.round((now - decreaser) /1000) * 1000
    decreaser += 50000;
  }
  timeserie.push(series)
}

function fackDataGen () {
  var timeserie = []
  var mapData = {"target": "map_01", "datapoints": [["0,20,13", 1450754160], [2.0, 1450754220], [1.0, 1450754280], [0.0, 1450754340], [1.0, 1450754400], [1.0, 1450754460], [1.0, 1450754520], [1.0, 1450754580], [1.0, 1450754640], [1.0, 1450754700], [2.0, 1450754760], [1.0, 1450754820], [165.0, 1450754880], [5.0, 1450754940], [1.0, 1450755000], [1.0, 1450755060], [5.0, 1450755120], [2.0, 1450755180], [2.0, 1450755240], [1.0, 1450755300], [1.0, 1450755360], [7.0, 1450755420], [4.0, 1450755480], [1.0, 1450755540], [7.0, 1450755600], [7.0, 1450755660], [1.0, 1450755720], [2.0, 1450755780], [1.0, 1450755840], [1.0, 1450755900], [2.0, 1450755960], [1.0, 1450756020], [1.0, 1450756080], [2.0, 1450756140], [1.0, 1450756200], [7.0, 1450756260], [2.0, 1450756320], [2.0, 1450756380], [1.0, 1450756440], [8.0, 1450756500], [7.0, 1450756560], [1.0, 1450756620], [2.0, 1450756680], [2.0, 1450756740], [2.0, 1450756800], [2.0, 1450756860], [18.0, 1450756920], [1.0, 1450756980], [1.0, 1450757040], [1.0, 1450757100], [1.0, 1450757160], [6.0, 1450757220], [2.0, 1450757280], [1.0, 1450757340], [2.0, 1450757400], [2.0, 1450757460], [1.0, 1450757520], [1.0, 1450757580], [1.0, 1450757640], [1.0, 1450757700], [1.0, 1450757760], [1.0, 1450757820], [15.0, 1450757880], [5.0, 1450757940], [2.0, 1450758000], [1.0, 1450758060], [1.0, 1450758120], [1.0, 1450758180], [1.0, 1450758240], [1.0, 1450758300], [1.0, 1450758360], [1.0, 1450758420], [1.0, 1450758480], [1.0, 1450758540], [1.0, 1450758600], [2.0, 1450758660], [1.0, 1450758720], [2.0, 1450758780], [1.0, 1450758840], [1.0, 1450758900], [1.0, 1450758960], [1.0, 1450759020], [1.0, 1450759080], [1.0, 1450759140], [8.0, 1450759200], [1.0, 1450759260], [2.0, 1450759320], [1.0, 1450759380], [1.0, 1450759440], [1.0, 1450759500], [2.0, 1450759560], [2.0, 1450759620], [1.0, 1450759680], [1.0, 1450759740], [2.0, 1450759800], [1.0, 1450759860], [1.0, 1450759920], [1.0, 1450759980], [1.0, 1450760040], [2.0, 1450760100], [9.0, 1450760160], [1.0, 1450760220], [2.0, 1450760280], [1.0, 1450760340], [0.0, 1450760400], [1.0, 1450760460], [1.0, 1450760520], [1.0, 1450760580], [2.0, 1450760640], [1.0, 1450760700], [2.0, 1450760760], [1.0, 1450760820], [3.0, 1450760880], [3.0, 1450760940], [1.0, 1450761000], [1.0, 1450761060], [1.0, 1450761120], [1.0, 1450761180], [1.0, 1450761240], [1.0, 1450761300], [1.0, 1450761360], [1.0, 1450761420], [1.0, 1450761480], [1.0, 1450761540], [2.0, 1450761600], [1.0, 1450761660], [1.0, 1450761720], [1.0, 1450761780], [1.0, 1450761840], [1.0, 1450761900], [1.0, 1450761960], [2.0, 1450762020], [2.0, 1450762080], [1.0, 1450762140], [2.0, 1450762200], [1.0, 1450762260], [1.0, 1450762320], [8.0, 1450762380], [1.0, 1450762440], [2.0, 1450762500], [1.0, 1450762560], [2.0, 1450762620], [1.0, 1450762680], [1.0, 1450762740], [1.0, 1450762800], [1.0, 1450762860], [1.0, 1450762920], [1.0, 1450762980], [1.0, 1450763040], [1.0, 1450763100], [1.0, 1450763160], [1.0, 1450763220], [1.0, 1450763280], [2.0, 1450763340], [1.0, 1450763400], [1.0, 1450763460], [1.0, 1450763520], [1.0, 1450763580], [2.0, 1450763640], [1.0, 1450763700], [1.0, 1450763760], [2.0, 1450763820], [1.0, 1450763880], [1.0, 1450763940], [1.0, 1450764000], [1.0, 1450764060], [2.0, 1450764120], [2.0, 1450764180], [5.0, 1450764240], [2.0, 1450764300], [1.0, 1450764360], [2.0, 1450764420], [1.0, 1450764480], [2.0, 1450764540], [1.0, 1450764600], [2.0, 1450764660], [1.0, 1450764720], [1.0, 1450764780], [1.0, 1450764840], [2.0, 1450764900], [1.0, 1450764960], [1.0, 1450765020], [1.0, 1450765080], [1.0, 1450765140], [1.0, 1450765200], [1.0, 1450765260], [2.0, 1450765320], [1.0, 1450765380], [1.0, 1450765440], [1.0, 1450765500], [1.0, 1450765560], [1.0, 1450765620], [1.0, 1450765680], [1.0, 1450765740], [1.0, 1450765800], [1.0, 1450765860], [1.0, 1450765920], [1.0, 1450765980], [1.0, 1450766040], [1.0, 1450766100], [3.0, 1450766160], [1.0, 1450766220], [1.0, 1450766280], [18.0, 1450766340], [1.0, 1450766400]]}
  timeserie.push(mapData)
  for (var i = 0; i < 50; i++) {
    var series = {"target": "upper_" + i, "datapoints":[]};
    var decreaser = 0;
    for (var y = 0; y < 50; y++) {
      series.datapoints[y] = [0, 0]
      series.datapoints[y][0] = Math.round(Math.random() * 100)
      series.datapoints[y][1] = Math.round((now - decreaser) /1000) * 1000
      decreaser += 50000;
    }
    timeserie.push(series)
  } 
  return timeserie
}

var annotation = {
  name : "annotation name",
  enabled: true,
  datasource: "generic datasource",
  showLine: true,
}

var annotations = [
  { annotation: annotation, "title": "Donlad trump is kinda funny", "time": 1450754160000, text: "teeext", tags: "taaags" },
  { annotation: annotation, "title": "Wow he really won", "time": 1450754160000, text: "teeext", tags: "taaags" },
  { annotation: annotation, "title": "When is the next ", "time": 1450754160000, text: "teeext", tags: "taaags" }
];

var tagKeys = [
  {"type":"string","text":"Country"}
];

var countryTagValues = [
  {'text': 'SE'},
  {'text': 'DE'},
  {'text': 'US'}
];

var now = Date.now();
var decreaser = 0;
for (var i = 0;i < annotations.length; i++) {
  var anon = annotations[i];

  anon.time = (now - decreaser);
  decreaser += 1000000
}

var table =
  {
	target: 'string',
	type: 'table',
    columns: [{text: 'Time', type: 'time'}, {text: 'Country', type: 'string'}, {text: 'Number', type: 'number'}],
    rows: [
      [ 1234567, 'SE', 123 ],
      [ 1234567, 'DE', 231 ],
      [ 1234567, 'US', 321 ],
    ]
  };
  
function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "*");  
  // res.setHeader("Access-Control-Allow-Headers", "accept, content-type");  
}


var now = Date.now();
var decreaser = 0;
for (var i = 0;i < table.rows.length; i++) {
  var anon = table.rows[i];

  anon[0] = (now - decreaser);
  decreaser += 1000000
}

app.all('/', function(req, res) {
  setCORSHeaders(res);
  res.send('I have a quest for you!');
  res.end();
});

app.all('/search', function(req, res){
  setCORSHeaders(res);
  var result = [];
  _.each(timeserie, function(ts) {
    result.push(ts.target);
  });

  res.json(result);
  res.end();
});

app.all('/annotations', function(req, res) {
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);

  res.json(annotations);
  res.end();
});

app.all('/log', function(req, res) {
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);

  res.json(annotations);
  res.end();
});

app.all('/star', function(req, res){
  console.log('****-----------------------');
  // console.log(req);
  console.log(req.headers);
  // console.log(req.body);
  res.json({'aaa': 123});
  res.end();
})

// var sourceInfo = dataSourceUtil.getSourceInfo(sourceName);
// 			var A = {
// 				"jsonData": jsonStr,
// 				"sourceInfo": sourceInfo,
// 				"reallyUrl": sourceInfo['url'] + '/star',
// 				"org_id": parseInt(orgId),
// 				"header": {
// 						'ABC': "123",
// 						'cde': 'aaaaa',
// 						'Authorization': 'ggggg_bossKKss'
// 				}
// 			}
// 			var xhttp;
//       xhttp = new XMLHttpRequest();
// 			xhttp.onreadystatechange = function() {
// 				console.log(this.response)
// 			}
// 			var localhostUrl  = window.location.origin
//       xhttp.open("POST", localhostUrl + '/api/datasource/proxy/pluginPost', true);
// 			xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 			xhttp.send(JSON.stringify(A));


app.all('/query', function(req, res){
  console.log('-----------------------');
  console.log(req.headers);
  setCORSHeaders(res);
  // console.log(req.url);
  // console.log(req.body);

  var tsResult = [];
  // let fakeData = timeserie;
  let fakeData = fackDataGen()

  if (req.body.adhocFilters && req.body.adhocFilters.length > 0) {
    fakeData = countryTimeseries;
  }

  _.each(req.body.targets, function(target) {
    if (target.type === 'table') {
		table.target = target.target;
      tsResult.push(table);
    } else {
      if(target.target === 'map_01'){
        var mapData = {
          target : 'map_01',
          datapoints : []
        }
        var d = new Date();
        var t = d.getTime();
        var sec = d.getSeconds();
        var degree = d.getMinutes() * 6 % 360;
        var seg = 5;
        for(var i = 0 ; i < seg; i++){
          var theta = 2*Math.PI/seg * ((i + sec)%seg);
          mapData.datapoints.push([ 30*Math.sin(theta) + "," + 30*Math.cos(theta) + "," + degree + "," + 30*Math.random() ,Number(t + i * 1000)])
        }
        tsResult.push(mapData)
      } else {
        var k = _.filter(fakeData, function(t) {
          return t.target === target.target;
        });
  
        _.each(k, function(kk) {
          tsResult.push(kk)
        });
      }
    }
  });
 
  res.json(tsResult);
  res.end();
});

app.all('/tag[\-]keys', function(req, res) {
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);

  res.json(tagKeys);
  res.end();
});

app.all('/tag[\-]values', function(req, res) {
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);

  if (req.body.key == 'City') {
    res.json(cityTagValues);
  } else if (req.body.key == 'Country') {
    res.json(countryTagValues);
  }
  res.end();
});

app.all('/aiaa', function(req, res) {
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);

  res.json(aiaaText);
  res.end();
});

function genDeviceTree (layer, maxLayer, idx, count, parent) {
  var result = []
  if (!count) { count = 3; }
  if (!maxLayer) { maxLayer = layer + 3; }
  let type = 'folder';
  if (layer > maxLayer) {
    return [];
  } else if (layer === maxLayer) {
    type = 'device';
  }
  const prefix = parent ? parent.id : 'd';
  for (var i = idx; i < idx + count; i++) {
    const node = {
      name: prefix + '_'+layer+'_'+i,
      id: prefix + '_'+layer+'_'+i,
      type: type,
      children: []
    }
    node.children = genDeviceTree (layer + 1, maxLayer, 0, count, node)
    result.push(node)
  }
  return result;
}

app.all('/assetsTopology', function(req, res) {
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);
  var body = req.body;
  var result = {
    assetsTree: genDeviceTree(body.layer, body.maxLayer, body.idx, body.count),
    errorMessage: ''
  }
  res.json(result);
  res.end();
});


app.all('/setLocationInfo', function(req, res) {
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);

  res.json(aiaaText);
  res.end();
});

app.listen(3333);

console.log("Server is listening to port 3333");
