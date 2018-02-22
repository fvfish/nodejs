var fs = require('fs');

exports.findAllDir = function(patch){
    var dirarr = [];
    var temparr = fs.readdirSync(patch);
    
    
    for (let index = 0; index < temparr.length; index++) {
         var stat = fs.statSync(patch+temparr[index]);
         if (stat.isDirectory()) {
            dirarr.push(temparr[index]); 
         }      
    }
    return dirarr;
}

exports.getimages = function (albumname) {
    var imagearr = [];
    var allarr= fs.readdirSync('./uploads/'+albumname);
    for (let i = 0; i < allarr.length; i++) {
        var stat = fs.statSync('./uploads/'+albumname+'/'+allarr[i]);
        if (!stat.isDirectory()) {
            imagearr.push(allarr[i]);
        } 
    }
    return imagearr;
}