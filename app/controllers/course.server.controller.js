const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.createCourse = function (req, res) {
    const course = new Course(req.body);
    // course.title = req.body.title;
    // course.content = req.body.content;
    //course.creator = req.body.studentname;
    console.log(req.body)
    //
    //
    Student.findOne({studentnumber: req.student.studentnumber}, (err,student) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = student._id;
        console.log('student._id',req.id);
        student.course=course._id;

	
    }).then( function () 
    {
        course.courseOwner= req.id
        console.log('req.student._id',req.id);        
        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    
    });
};
//
exports.listCourse = function (req, res) {
    Course.find({}, function (err, courses){
        if (err) {
            return res.status(400).send({
            message: getErrorMessage(err)
        });
        } else {
            res.status(200).json(courses);
        }
    });
};

exports.listCourseByStudent = function (req, res) {
    Course.find({courseOwner:req.student.studentnumber}, function (err, courses){
        if (err) {
            return res.status(400).send({
            message: getErrorMessage(err)
        });
        } else {
            res.status(200).json(courses);
        }
    });
};
//
exports.findCourseByID = function (req, res, next, id) {
    Course.findById(id,(err, course) => {
        if (err) return next(err);
        if (!course) return next(new Error('Failed to load course '+ id));
        req.course = course;
        console.log('in courseById:', req.course)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.course)
    const course = req.course;
    // course.title = req.body.title;
    // course.content = req.body.content;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.course and req.student objects
//to verify that the current student is the creator of the current course
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - courseOwner: ',req.course.courseOwner)
    console.log('in hasAuthorization - student: ',req.id)
    //console.log('in hasAuthorization - student: ',req.student._id)


    if (req.course.courseOwner.id !== req.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};
