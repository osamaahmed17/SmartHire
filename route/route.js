const departmentController = require('../controller/departmentController');
const experienceController =  require('../controller/experienceController');
const loginController = require('../controller/loginController')

module.exports = (app) => {
    app.post(`/rest/api/v1/department` , departmentController.createDepartment);
    app.get(`/rest/api/v1/department` , departmentController.findDepartment);
    app.delete(`/rest/api/v1/department/:id` , departmentController.deleteDepartment);

    app.post(`/rest/api/v1/departmentform` , departmentController.createDepartmentForm);
    app.get(`/rest/api/v1/departmentform` , departmentController.findDepartmentForm);

    app.post(`/rest/api/v1/experience` , experienceController.createExperience);
    app.get(`/rest/api/v1/experience` , experienceController.findExperience);

    app.post(`/rest/api/v1/createadmin` , loginController.createAmin);
    app.post(`/rest/api/v1/login` , loginController.loginUser);
    app.get(`/rest/api/v1/getuser`,loginController.getUser)
    app.get(`/rest/api/v1/logout`,loginController.logoutUser)
    app.put(`/rest/api/v1/changepassword`,loginController.changePassword)
    app.get(`/rest/api/v1/traineedetail`,loginController.getTrainee)




};