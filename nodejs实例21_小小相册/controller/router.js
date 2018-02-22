var file = require('../models/file.js');
var formidable = require('formidable');
var fs = require('fs');
var sd = require('silly-datetime');
var path = require('path');

exports.showIndex = function(req, res){
    res.render('index', {
        "albums":file.findAllDir('./uploads/')
    });
}
exports.showAlbum = function(req, res){
    var images = file.getimages(req.params.albumname);
    res.render('album', {
        'albumname':req.params.albumname,
        'images':images
    })
}
exports.showUp = function (req, res) {
    res.render('up', {
        albums:file.findAllDir('./uploads/')
    });
}

exports.doPost = function (req, res) {
 
          var form = new formidable.IncomingForm();
            form.uploadDir = './tempup/';
          form.parse(req, function(err, fields, files, next) {
            console.log(fields);
            console.log(files);
            if (err) {
                next();
                return;
            }
            var tt = sd.format(new Date(), 'YYYYMMDDHHmmss');
            var ran =parseInt(Math.random()*89999+10000);
            var extname =path.extname(files.upload.name);
            var oldpath = files.upload.path;
            var newpath = './uploads/'+fields.wjj+'/' + tt + ran + extname;
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    res.send('改名失败！');
                }
               // fs.unlinkSync(oldpath);
            })
            res.send('good');

          });
          return;

}
