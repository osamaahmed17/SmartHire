const departmentController = require('../controller/departmentController');
const experienceController = require('../controller/experienceController');
const loginController = require('../controller/loginController')
const traineeController = require('../controller/traineeController')
const authenticationController = require('../controller/authenticationController')

module.exports = (app) => {
    app.post(`/rest/api/v1/department`, departmentController.createDepartment);
    app.get(`/rest/api/v1/department`, departmentController.findDepartment);
    app.delete(`/rest/api/v1/department/:id`, departmentController.deleteDepartment);

    app.post(`/rest/api/v1/experience`, experienceController.createExperience);
    app.get(`/rest/api/v1/experience`, experienceController.findExperience);

    app.post(`/rest/api/v1/createadmin`, loginController.createAdmin);
    app.post(`/rest/api/v1/login`, loginController.loginUser);
    app.get(`/rest/api/v1/getuser`, loginController.getUser)
    app.get(`/rest/api/v1/logout`, loginController.logoutUser)
    app.put(`/rest/api/v1/changepassword`, loginController.changePassword)
    app.get(`/rest/api/v1/traineedetail`, loginController.getTrainee)


    app.post(`/rest/api/v1/traineesignup`, traineeController.traineeSignUp)
    app.post(`/rest/api/v1/traineelogin`, traineeController.traineeLogin)
    app.put(`/rest/api/v1/traineeforgetpassword`, traineeController.traineeForgetPassword)
    app.put(`/rest/api/v1/updateprofile`, traineeController.updateProfile)

    app.post(`/rest/api/v1/verifyemail`, authenticationController.verifyEmail)

    app.get(`/rest/api/v1/alumni/:val`, traineeController.alumniData)

};