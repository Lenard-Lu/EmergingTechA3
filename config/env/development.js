//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
    db: 'mongodb://localhost/student_db',
    sessionSecret: 'developmentSessionSecret',
    secretKey: 'real_secret'
};
