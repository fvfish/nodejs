var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
//每刷新一次网页根目当就插入一条新的记录
app.get('/', function (req, res) {
    var url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, function (err, db) {//这里是连接语句
        if (err) {
            console.log('连接数据库失败！');
            return;
        }
        console.log('数据库连接成功');
        var dbbase = db.db("mydb");
        dbbase.collection("student").insertOne({
            "name":"dudu",
            "age":parseInt(Math.random()*100)+10
        },function (err, result) {

            console.log(result);
            res.send('插入数据成功');
            db.close();   
        })  
    })
});
app.listen(3000);