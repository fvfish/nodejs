var express = require('express');
var app = express();
var db = require('./model/db.js')

app.get('/', function (req, res) {
    db.insertOne('teacher', {"name":"小红","age":parseInt(Math.random()*100)+10}, function (err, result) {
        if (err) {
            console.log('插入失败');
            return;
        }
        res.send('插入成功');
    })
});
app.get('/du',function (req, res) {
    var page = parseInt(req.query.page);//这里指，这个页面接受一个page参数
    db.find('teacher', {"age":{$gt:20}}, {'pagecount':10,'page':page},function (err, result) {
        console.log(result);
        res.send(result);
    });
})
app.get('/del', function (req, res) {
    var age = parseInt(req.query.age);
    db.deletemany('teacher', {"age":age}, function (err, result) {
        res.send(result);
    })
});
app.get('/update', function (req, res) {
    db.updateMany('teacher', {"age":44},{$set:{"name":"dudu"}},function (err, result) {
        res.send(result);
    })
});
app.listen(3000);