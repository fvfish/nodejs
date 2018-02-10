var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.end('good');
})
app.get('/haha', function(req, res){
    res.end('this is haha web');
})
app.get('/teacher/:gonghao', function(req, res){
    res.end('this teacher gonghao is:'+req.params.gonghao);//带变量
});
app.get(/^\/student\/([\d]{10})$/, function(req, res){
    res.end('this student num is:'+req.params[0]);//带正则表达式
});
app.use(express.static('static'))//使用静态文件，注意不用在localhost中标static，指的是static里面的变成静态
app.set('view engine', 'ejs');//这里是模板引擎的调用
app.get('/dudu', function(req, res){
    res.render('index',{
        'news':['模板引擎1', '哈哈哈哈', '还真的行']
    })
})
app.listen(3000);