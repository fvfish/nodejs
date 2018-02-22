var express = require('express');
var router = require('./controller')
var app = express();

//设置模板引擎
app.set('view engine', 'ejs');
//中间件
app.get('/up', router.showUp);
app.post('/up', router.doPost)
app.use(express.static('public'));//静态文件app.use('/static', express.static('public'));
app.use(express.static('uploads'));//静态文件app.use('/static', express.static('public'));
app.get('/', router.showIndex)//首页
app.get('/:albumname', router.showAlbum)//
app.use(function(req, res){
    res.render('err');
})
app.listen(3000);
