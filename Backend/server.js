var bodyParser = require('body-parser');   
var morgan = require("morgan");  
var mongoose = require('mongoose');
var cors = require('cors');
var request = require('request');
const axios = require('axios');
const express = require('express')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const app = express()
var session = require('express-session');
var connection = require('./connection.js');
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.use(cors());
var port = 8000;  
app.use(express.static('public'));  
app.use(express.json());
var mongoDB = 'mongodb://127.0.0.1/vendor_medicine_data';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.once('error', console.error.bind(console, 'MongoDB connection error:'));
var model = require('./models/medicine_record')
app.get("/api/getdata/:query",function(req,res){
  model.aggregate([
  {'$match':    {'medicine_name' :  {'$regex': req.params.query , '$options' : 'i'} }},
  {'$sort' : {'time_of_insertion':-1}},
  {'$group' : { '_id' : {'medicine_name':'$medicine_name','vendor_name' : '$Vendor_Name'},
    'medicine_price' : {'$first': '$medicine_price'} ,
    'time_of_insertion' : {'$first': '$time_of_insertion'},
    'medicine_manufacturer' : {'$first': '$medicine_producer'},
    'medicine_composition' : {'$first': '$medicine_composition'},
    'medicine_number_of_strips' : {'$first': '$medicine_number_of_strips'},
    'medicine_url' : {'$first': '$medicine_url'}
  }}

  ]
  ,function(err,out){

      if(err){
          console.log(err);
          res.send(err);
      }
      else{
          console.log(out);
          res.send(out);
      }
  })
 });

app.post("/api/login_fb",function(req,res){

console.log(req.body);
res.send('this is server');
});
app.post("/api/login_google",function(req,res){
console.log(req.body);
res.send("workinf fine");
    
});


app.get("/api/healthcheck",function(req,res){
    res.send("The backend server is working fine");
});

app.get("/api/getNewsData/:query",function(req,res){
    if(req.params.query == 'saurav_tech'){
        var url = 'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json';}
    axios.get(url)
    .then(response => {
        if(req.params.query == 'saurav_tech'){
            res.send(response.data.articles);} 
            // returning array of json objects, Each Object is a news
        else {res.send("Not defined News API");}
    })
    .catch(error => {
        console.log(error);
    });
});



const mongoURI = 'mongodb://127.0.0.1:27017/vendor_medicine_data';
let conn2 = mongoose.connection;
let gfs;
let gridFSBucket;
conn2.once('open', () => {
    gfs = Grid(conn2.db, mongoose.mongo)
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn2.db, {
        bucketName: 'imageUpload'
    });
    gfs.collection('imageUpload');
});

let storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise(
            (resolve, reject) => {
                       const fileInfo = {
                    filename: file.originalname,
                    bucketName: "imageUpload"
                }
                resolve(fileInfo)

            }
        )
    }
});
const upload = multer({ storage })
app.post("/api/upload_image",upload.single("fileToUpload"),(req,res)=>{
    res.json({file:req.file})
});

app.get('/api/image_retriever/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        //check if files exist
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        //file exist
        const readStream = gridFSBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    })
});
app.get('/api/list_image_files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        // files exist
        return res.json(files)
    })
});
app.listen(port,function(){   
    console.log("server start on port "+ port);  
}); 


app.post('/api/authenticate_user', function(req, res) {

	if(req.session.loggedin)	req.session.destroy();
	//var username=req.body.username;
    //var password=req.body.password;
    console.log(req.body);
    /*connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        var query = { address: "Park Lane 38" };
        dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db2.close();
  });
});*/

});

app.post('/api/register_user', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    
    /*
    //object construction from React exposed values
    var myobj = { name: "Company Inc", address: "Park Lane 38" };
    
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db2.close();
    });
});*/
});


