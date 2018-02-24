

var mongodb = require('mongodb');
var setting = require('../setting.js');
function _connectDB(callback) {
    var url = setting.dburl;
    mongodb.connect(url, function (err, db) {
        this.db = db;
        var dbase = db.db(setting.dbase);
        callback(err, dbase);
        console.log('数据库连接成功');
        
    })
}
//以下是插入数据的api
exports.insertOne = function (collectionname, json, callback) {
    _connectDB(function (err, dbase) {
        dbase.collection(collectionname).insertOne(json, function (err, result) {
            callback(err, result);
        })
    })  
}
//以下是查找数据的api
exports.find = function (collectionname, json, C, D) {
    if (arguments.length==4) {//核查参数数量
        var args = C;
        var callback = D;
        var pagecount = args.pagecount;
        var jumpcount = args.pagecount*(args.page-1);
    } else
    if (arguments.length == 3) {
       var callback = C;
       var pagecount = 0;
       var jumpcount = 0; 
    } else
    {
        throw new Error('参数只能是四个或三个');
        return;
    }
    var getdocs = [];
    _connectDB(function (err, dbase) {

        var cursor = dbase.collection(collectionname).find(json).limit(pagecount).skip(jumpcount);   
        cursor.each(function (err, doc) {
            if (err) {
                callback(err, null);
                db.close();
                return;   
            };
            if (doc!=null) {
                getdocs.push(doc);
            } else{
                callback(null, getdocs);
                db.close();
            }
        })
    })  
    
}
//以下是删除数据
exports.deletemany = function (collectionname, json, callback) {
    _connectDB(function (err, dbase) {
        dbase.collection(collectionname).deleteMany(json, function (err, result) {
            console.log(result);
            callback(err, result);
            db.close();
        })
    })
    
}
//以下是修改数据
exports.updateMany = function (collectionname, json1, json2, callback) {
    _connectDB(function (err, dbase) {
        dbase.collection(collectionname).updateMany(json1, json2, function (err, result) {
            console.log(result);
            callback(err, result);
            db.close();
        })
    })
    
}