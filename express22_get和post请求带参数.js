取参方法一////////////get请求带参可以用req.query直接取得参数，就是得到对象///////////
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

取参方法二///////// 通过body-parser取得参数的方法req.body////////////////////////////////////////
//下面是app.js写法
var express = require('express');
var app = express();
var bodyParser =require('body-parser');
app.use(bodyParser.json());//这两句要写在中间件之前
app.use(bodyParser.urlencoded({ extended: false }));//这两句要写在中间件之前
//中间件
app.post('/reg', function (req, res) {
    console.log(JSON.stringify(req.body)+'ffff');//取得的body是一个json
    res.json('好好好'); 
})
app.listen(3000);

取参方法三//////////////////////////////////////////////////
//formidable，这是一个用于处理表单的npm工具。
    //1、var formidable = require('formidable');//安装后引有它
    //2、在html中应该有如下的表单，注意form里的属性，还有每一个表单项要有name属性。
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
    //3、js引用时
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log(fields);
        });