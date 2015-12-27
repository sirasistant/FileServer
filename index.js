var fs = require('fs'),
	express= require('express'),
	multer = require('multer'),
	methodOverride = require('method-override'),
	app = express();
var config = JSON.parse(fs.readFileSync('./config.cnf','utf8').toString());
config.directory_path+="/";
var upload = multer({dest:config.directory_path});

app.use(methodOverride('_method'));

app.get('/files/:fileName', function (req, res) {
    res.sendFile(config.directory_path +req.params.fileName);
});

app.post('/files',upload.single('file'),function(req,res){
	if(req.file!==undefined){
		res.json({filename:req.file.filename})
	}else{
		res.status(404)        // HTTP status 404: NotFound
   			.send('Not found');
	}
});

app.listen(config.port||80,function(){
	console.log("listening");
});