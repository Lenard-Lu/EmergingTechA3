// Load the 'students' controller
var student = require('../controllers/student.server.controller');
var express = require('express');
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /students path
    // and list students when /students link is selected
    //app.get('/studentlist',student.requiresLogin,student.displayStudents); 
    app.get('/studentlist',student.displayStudents);//go to http://localhost:3000/students to see the list
    //handle a post request made to root path
    app.post('/', student.register);
    //
    // Set up the 'students' parameterized routes 
	app.route('/student/:studentnumber')
    .get(student.read)
    .put(student.update)
    .delete(student.delete)
    // Set up the 'studentId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('studentId', student.findStudentByID);
    //authenticate student
    app.post('/signin', student.authenticate);
    app.get('/getStudentsByCourse',student.findStudentsByCourse);
    app.get('/signout', student.signout);
    app.get('/read_cookie', student.isSignedIn);


    //path to a protected page
	app.get('/welcome',student.welcome);
    
};

