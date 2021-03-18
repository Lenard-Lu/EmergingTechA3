const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    coursecode: {
        type: Number,	
		unique: true,		
		required: 'Student number is required',	
		trim: true
    },
    coursename: String,       
    section:String,
    semester:String,
    courseOwner: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});
mongoose.model('Course', CourseSchema);
