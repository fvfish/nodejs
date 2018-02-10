////////////直接取得参数，就是得到对象///////////
var express = require('express');
var app = express();
app.get('/', function(req, res){
    console.log(req.query);
    res.end();
})
app.listen(3000);
//**************************************
http://localhost:3000/?xx=yu&dudu=50
////////////////////////////////////////////////