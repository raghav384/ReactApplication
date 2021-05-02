var mongoose = require('mongoose');  

var Schema = mongoose.Schema;
var blog_record = new Schema({      
    status: String                
}); 

module.exports = mongoose.model('blog_records',blog_record);