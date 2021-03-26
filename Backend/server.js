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
	var visitor_email=req.body.email;
    var visitor_password=req.body.password;

    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        var query = { email:visitor_email, password:visitor_password };
        dbo.collection("login_records").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("No of records found: ",result.length);
            if(result.length == 1) res.send("User Credentials exists");
            else res.send("user_not_found");
            db2.close();
    });
});

});

app.post('/api/register_user/:query', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    var source = req.params.query;
    var user_details = req.body;
    user_details["insertion_source"] = source;

    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("login_records").insertOne(user_details, function(err,result) {
        if (err) throw err;
        console.log("User details succesfully inserted into MongoDB Instance");
        res.send("User Successfully Created");
        db2.close();
    });

});
});


