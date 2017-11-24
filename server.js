
var port=8090,
    express=require('express'),
    app=express();
    var path = require('path');

    var fs = require('fs');
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    var upload = require('multer')({ dest: 'uploads/' });
    app.use('/',express.static(__dirname));

    app.listen(port);

    app.post('/upload/image',upload.single('file'),function(req,res){
      // 重命名文件

			console.log(req.body);

     let oldPath = path.join(__dirname, req.file.path);
     let newPath = path.join(__dirname, 'uploads/' + req.file.filename+'.jpg');
     fs.rename(oldPath, newPath, (err) => {
     if (err) {
      res.json({ ok: false });
      console.log(err);
     } else {
      res.json({ url: '/uploads/' + req.file.filename+'.jpg' });
     }
     });
    })
console.log('Now Serving http://localhost:'+port+'/index.html');
