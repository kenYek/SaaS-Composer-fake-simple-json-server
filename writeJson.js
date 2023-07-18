var fs = require('fs');
var points = []
for (var i = 0 ; i < 500; i++) {
  var x = (i % 20) * 100
  var y = Math.floor(i / 20) * 50
  var point = {
    "c": "ht.Text",
    "i": 3474 + i,
    "p": {
      "dataBindings": {
        "s": {
          "text": {
            "id": "1632471083348_" + i,
            "animatedOptions": {
              "advancedAnimate": false,
              "func": "__ht__function(value, oldValue, option){\nreturn value;\n}",
              "details": {
                "directFeed": true,
                "matchList": []
              },
              "animateCondition": "setMatch",
              "directFeed": true
            },
            "targets": [
              {
                "sourceType": "simpleJson",
                "formatType": "timeseries",
                "scDataType": "value",
                "target": "upper_" + i
              }
            ]
          }
        }
      },
      "position": {
        "x": x,
        "y": y
      }
    },
    "s": {
      "text": "文本"
    }
  }
  points.push(point)
}

var all = {
  "v": "7.2.3",
  "p": {
    "autoAdjustIndex": true,
    "hierarchicalRendering": true
  },
  "a": {},
  "d": points,
  "modified": "Fri Sep 24 2021 16:11:33 GMT+0800 (台北標準時間)",
  "contentRect": {
    "x": 1,
    "y": 2,
    "width": 100,
    "height": 50
  }
}


 
fs.writeFile('tagJsonFile.txt', JSON.stringify(all),function (err, data) {
    if (err) throw err;
 
    // console.log(data.toString());
});


var cubes = []
for (var j = 0 ; j < 500; j++) {
  var x = (j % 20) * 100
  var y = Math.floor(j / 20) * 100
  var cube = {
    "c": "ht.Node",
    "i": 23868 + j * 4,
    "p": {
      "dataBindings": {
        "p": {
          "width": {
            "id": "1632472550720_" + j,
            "animatedOptions": {
              "advancedAnimate": false,
              "func": "__ht__function(value, oldValue, option){\nreturn value;\n}",
              "details": {
                "directFeed": true,
                "matchList": []
              },
              "animateCondition": "setMatch",
              "directFeed": true
            },
            "targets": [
              {
                "sourceType": "simpleJson",
                "formatType": "timeseries",
                "scDataType": "value",
                "target": "upper_" + j
              }
            ]
          }
        }
      },
      "position": {
        "x": x,
        "y": 0
      },
      "anchorElevation": 0,
      "width": 50,
      "height": 50,
      "tall": 50,
      "elevation": y
    },
    "s": {
      "all.color": "rgb(48,242,120)",
      "wf.color": "rgb(19,207,169)"
    }
  }
  cubes.push(cube)
}


var json3D = {
  "v": "7.2.3",
  "p": {
    "autoAdjustIndex": true,
    "hierarchicalRendering": true
  },
  "a": {
    "sceneOrthographic": false
  },
  "d": cubes
}

 
fs.writeFile('tagJsonFile3D.txt', JSON.stringify(json3D),function (err, data) {
  if (err) throw err;

  // console.log(data.toString());
});