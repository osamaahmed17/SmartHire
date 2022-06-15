const departmentController = require('../controller/departmentController');

module.exports = (app) => {
    app.post(`/rest/api/v1/department` , departmentController.createDepartment);
    app.get(`/rest/api/v1/department` , departmentController.findDepartment);
    app.delete(`/rest/api/v1/department/:id` , departmentController.deleteDepartment);

    app.post(`/rest/api/v1/departmentform` , departmentController.createDepartmentForm);
    app.get(`/rest/api/v1/departmentform` , departmentController.findDepartmentForm);



};