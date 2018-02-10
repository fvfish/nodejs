///////////////////////////////////////////////////////
//一、路由是由上到下匹配，如果匹配到了，就不会再往下了，除非用next；
//二、所谓的中间件，其实就是陆由等get,post
///////////////////////////////////////////////////////
var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.end('good');
})
app.get('/haha', function(req, res){
    res.end('this is haha web');
})
/////////////变量型的网址可以用两种方法获得，一种是正则表达式，一种是冒号////////////////////////////////
app.get('/teacher/:gonghao', function(req, res){
    res.end('this teacher gonghao is:'+req.params.gonghao);//带变量
});
app.get(/^\/student\/([\d]{10})$/, function(req, res){
    res.end('this student num is:'+req.params[0]);//带正则表达式
});
//////////////////////////////////////////////////////////////////////////
app.use(express.static('static'))//使用静态文件，注意不用在localhost中标static，指的是static里面的变成静态
app.set('view engine', 'ejs');//这里是模板引擎的调用
app.get('/dudu', function(req, res){
    res.render('index',{
        'news':['模板引擎1', '哈哈哈哈', '还真的行']
    })
})
app.all('/', function(req, res){
    res.end('dudududududuudududu');//无论get或是post都可以
});
app.listen(3000);