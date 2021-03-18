const student = require('../controllers/student.server.controller');
const course = require('../controllers/course.server.controller');
//
module.exports = function (app) {
        app.route('/api/listAllCourses').get(course.listCourse)
        app.route('/api/addCrourse').post(student.requiresLogin, course.createCourse);
        //
        app.route('/api/courses/:courseId')
            .get(course.read)
            .put(student.requiresLogin, course.hasAuthorization, course.update)
            .delete(student.requiresLogin, course.hasAuthorization, course.delete);
        app.route('/api/listCousesByStudent').get(student.requiresLogin,course.hasAuthorization,course.listCourseByStudent)
        //
        app.param('courseId', course.findCourseByID);
};
