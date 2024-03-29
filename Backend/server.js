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

var mongoDB = 'mongodb://127.0.0.1/HealthScrollDB';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.once('error', console.error.bind(console, 'MongoDB connection error:'));
var model = require('./models/medicine_record');
app.get("/api/getdata/:query",function(req,res){
model.aggregate([
    {'$match':    {'medicine_name' :  {'$regex': req.params.query , '$options' : 'i'} }},
    {'$sort' : {'time_of_insertion':-1}},
    {'$group' : { '_id' : {'medicine_name':'$medicine_name','vendor_name' : '$vendor_name'},
      'medicine_price' : {'$first': '$medicine_price'} ,
      'time_of_insertion' : {'$first': '$time_of_insertion'},
      'medicine_manufacturer' : {'$first': '$medicine_manufacturer'},
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

const mongoURI = 'mongodb://127.0.0.1:27017/HealthScrollDB';
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
	var visitor_email=req.body.user.email;
    var visitor_password=req.body.user.password;

    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        var query = { "user.email":visitor_email, "user.password":visitor_password };
        dbo.collection("login_records").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("No of records found: ",result.length);
            console.log(result[0]);
            if(result.length == 1) 
            res.send(result[0]);
            else res.send("user_not_found");
            db2.close();
    });
});

});

app.post('/api/register_user/:query', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    var source = req.params.query;
    console.log(req.body.profileObj);
    var user_details = req.body.profileObj;
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

app.post('/api/register_website_user', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    var user_details = req.body;
    console.log(user_details);

    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("login_records").insertOne(user_details, function(err,result) {
        if (err) throw err;
        console.log("User details succesfully inserted into MongoDB Instance");
        res.send(req.body);
        db2.close();
    });

});
});


app.post('/api/blog_insertion', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    var blog_details = req.body;
    blog_details["status"] = "pending_for_review";
    console.log(blog_details);

    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("blog_records").insertOne(blog_details, function(err,result) {
        if (err) throw err;
        console.log("Blog succesfully inserted into MongoDB Instance");
        res.send("Blog Successfully Submitted");
        db2.close();
    });

});
});



app.post('/api/blog_feedback_update', function(req, res) {
    var ObjectID =require('mongodb').ObjectID;
    if(req.session.loggedin)	req.session.destroy();

    var query ={ "_id" : ObjectID(req.body._id) };
    const update ={$set: {"status":"pending_for_review","blog_to_post":req.body.blog_to_post}};
    const options = { "upsert": false };
    
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
       dbo.collection("blog_records").updateOne(query, update, options)
        .then(result => {
          const { matchedCount, modifiedCount } = result;
          console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`);
          res.send(result);
        });
        db2.close();
    });

});


app.post('/api/blog_insert_feedback', function(req, res) {
    var ObjectID =require('mongodb').ObjectID;
    if(req.session.loggedin)	req.session.destroy();
    var query ={ "_id" : ObjectID(req.body._id) };
    const update ={$set: {"status":"feedback_received","blog_to_post":req.body.insert_data}};
    const options = { "upsert": false };
    
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
       dbo.collection("blog_records").updateOne(query, update, options)
        .then(result => {
          const { matchedCount, modifiedCount } = result;
          console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`);
          res.send(result);
        });
        db2.close();
    });

});


app.get('/api/blog_retrieval/:status', function(req, res) {
	
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        var status_received = req.params.status;
        var query ={ "status" : status_received };
        
        dbo.collection("blog_records").find(query).toArray(function(err, result) {
            console.log(result)
            if (err) throw err;
            else res.send(result)
            db2.close();
    });
});
});

app.get('/api/redirection',function(req,res){
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("redirection_data").find({'data':'total_count'}).toArray(function(err, result) {
            console.log(result)
            if (err) throw err;
            else res.send(result)
            db2.close();
    });
    });
});


app.post('/api/redirection_count_increase',function(req,res){
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        var query = {'data': 'total_count'}
        var update = {'$inc': {'redirection_count':1}}
        var options = {'upsert' : true};
        dbo.collection("redirection_data").updateOne(query,update,options,function(err, result) {
            console.log(result)
            if (err) throw err;
            else res.send(result)
            db2.close();
    });
    });
})

app.post('/api/subscribe', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    var email_details = req.body;
    
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("email_records").insertOne(email_details, function(err,result) {
        if (err) throw err;
        console.log("Email Address succesfully inserted into MongoDB Instance");
        res.send("Thankyou you for subscribing us !!!");
        db2.close();
    });
});
});

var ObjectID =require('mongodb').ObjectID;
app.post('/api/blog_status_update/:objectId/:action', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    var action_required = req.params.action;
    var objectId_received = req.params.objectId;
    var query ={ "_id" : ObjectID(objectId_received) };
    const update ={$set: {"status":action_required}};
    const options = { "upsert": false };
    
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
       dbo.collection("blog_records").updateOne(query, update, options)
        .then(result => {
          const { matchedCount, modifiedCount } = result;
          console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`);
          res.send(result);
        });
        db2.close();
    });

});

app.post('/api/blog_feedback_insertion/:objectId/:feedback_string', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    var feedback_received = req.params.feedback_string;
    var objectId_received = req.params.objectId;
    var query ={ "_id" : ObjectID(objectId_received) };
    const update ={$set: {"feedback_received":feedback_received,"status":"feedback_received"}};
    const options = { "upsert": false };
    
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
       dbo.collection("blog_records").updateOne(query, update, options)
        .then(result => {
          const { matchedCount, modifiedCount } = result;
          console.log(`Successfully matched ${matchedCount} and modified ${modifiedCount} items.`);
          res.send(result);
        });
        db2.close();
    });

});

app.get('/api/medicine_vendor_count', function(req, res) {

        connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("medicine_records").distinct('vendor_name', function(err, result) {
            if (err) throw err;
            else res.json(result.length); 
            db2.close();
        });
       
    });
});

app.get('/api/user_count', function(req, res) {
	
        connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("login_records").find({}).toArray(function(err, result) {
            if (err) throw err;
            else res.json(result.length); 
            db2.close();
        });
       
    });
});

app.get('/api/subscriber_count', function(req, res) {
	
        connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("email_records").distinct('email',function(err, result) {
            if (err) throw err;
            else res.json(result.length); 
            db2.close();
        });
       
    });
});

app.get('/api/blog_count/:status', function(req, res) {

        var status_received = req.params.status;
        connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("blog_records").find({"status":status_received}).toArray(function(err, result) {
            console.log(result.length);
            if (err) throw err;
            else res.json(result.length); 
            db2.close();
        });
       
    });
});

app.post('/api/vendor_details_insertion', function(req, res) {
	if(req.session.loggedin)	req.session.destroy();
    var vendor_details = req.body;
    vendor_details["status"]= "pending_for_insertion"
    console.log(vendor_details);    

    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        dbo.collection("vendor_api_details").insertOne(vendor_details, function(err,result) {
        if (err) throw err;
        console.log("Vendor API Details succesfully inserted into MongoDB Instance");
        res.send("Vendor API Deatails Successfully Submitted");
        db2.close();
    });

});
});


app.get('/api/blog_retrieval_by_email/:user_email/:status', function(req, res) {
	
    connection(function(err,db2){
        var dbo = db2.db("HealthScrollDB");
        var status_received = req.params.status;
        var user_email = req.params.user_email;
        var query ={ "blog_to_post.email": user_email,"status" : status_received };
        
        dbo.collection("blog_records").find(query).toArray(function(err, result) {
            console.log(result)
            if (err) throw err;
            else res.send(result)
            db2.close();
    });
});
});