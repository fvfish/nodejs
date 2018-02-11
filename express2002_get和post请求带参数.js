////////////get请求带参可以用req.query直接取得参数，就是得到对象///////////
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
//post的带参请求可以用第三方的body-parser,再通过req.body取得参数。不能处理上传文件。表单中有上传文件只能用formidabe