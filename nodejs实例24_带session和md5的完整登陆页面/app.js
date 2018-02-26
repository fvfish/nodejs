var express = require('express');
var app = express();
var db = require('./model/db.js');
var md5 = require('./model/md5.js');
var session = require('express-session');
var bodyParser =require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
secret:'keyboard cat',
resave:false,
saveUninitialized:true
}));

//中间件
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', function (req, res) {
    if (req.session.login == "1") {
        res.send('欢迎'+req.session.name);
        
    } else
    {
        res.send('没有成功登陆');
    }
})
app.post('/reg', function (req, res) {
        //把数据存入到数据库
        var password = md5(req.body.password);
        db.insertOne('login',{
            "name":req.body.name,
            "password":password
        },function (err, result) {
            if (err) {
                res.send("-1");
                return;
            }
            res.send("1");
            return;
        });
})
app.get('/reg', function (req, res) {
    res.render('reg');
})
app.get('/login', function (req, res) {
    res.render('login');
})
app.post('/dologin', function (req, res) {
    //检索数据库，查看密码是否匹配
    var name = req.body.name;
    var password =req.body.password;
    db.find('login', {'name':name}, function (err, result) {
        if (result.length == 0) {
            res.send('-2');//-2指的是没有这个人
            return;
        } else{
            if (md5(password) == result[0].password) {//比对密码是否正确
                req.session.login="1";
                req.session.name=req.body.name;
                res.send('1');
            } else
            {
                res.send('-1')
            }
            return;
        }
    });
})
app.listen(3000);