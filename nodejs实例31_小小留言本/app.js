var express = require('express');
var app = express();
var db = require('./model/db.js')
var formidable = require('formidable');
var objid = require('mongodb').ObjectID;

//设置模板引擎
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', function (req, res, next) {
    db.getcounts("liuyan", function (count) {
        console.log(Math.ceil(count/4));
        res.render('index',{
            "yemacount":Math.ceil(count/4) 
        });
    })

});
app.get('/a',function (req, res) {
    db.getcounts("liuyan", function (count) {
        console.log(count);
        res.send(count+"");
    });
})
app.post('/du', function (req, res, next) {
    db.find('liuyan', {},{"sort":{"shijian":-1}}, function (err, result) {
        res.json(result);      
    })
});
app.get('/du', function (req, res, next) {
    var page = parseInt(req.query.page);
    db.find('liuyan', {},{"pagecount":4, "page":page, "sort":{"shijian":-1}}, function (err, result) {
        res.json(result);      
    })
});
app.get('/del', function (req, res, next) {
    var id = req.query.id;
    db.deletemany('liuyan', {"_id":objid(id)}, function (err, result) {
        //res.send('删除成功，请自己返回');
        res.redirect('/')//重定向
    })
})
app.post('/tijiao', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //收到数据就插入数据库
        db.insertOne("liuyan", {
            "name":fields.name,
            "liuyan":fields.liuyan,
            "shijian":new Date()
        }, function (err, result) {
            if (err) {
               res.json('-1');//返回结果给ajax看的
               return; 
            }
            res.json('1');
        })
        console.log("收到请求了 "+fields.name+fields.liuyan);
        
    });
});
app.listen(3000);