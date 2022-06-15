const departmentModel = require('../model/departmentModel');
const departmentFormModel = require('../model/departmentFormModel');

const objectID = require('mongoose').Types.ObjectId;

class departmentController {
    constructor() {
        this.createDepartment = this.createDepartment.bind(this);
        this.findDepartment = this.findDepartment.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
        this.createDepartmentForm = this.createDepartmentForm.bind(this);
        this.findDepartmentForm = this.findDepartmentForm.bind(this);



        this.response = {
            success: true,
            data: "",
        }
        this.errorResponse = {
            success: false,
            error: "",
        };

    };
    async createDepartment(req, res) {
        const responseClass = new departmentController();

        let departmentObject = {
            name: req.body.name,
            placement: req.body.placement,
            factory: req.body.factory,
            field: req.body.field,
            date: new Date()
        }

        departmentModel.create(departmentObject, function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = result
            return res.status(200).send(responseClass.response)
        })
    }
    async findDepartment(req, res) {
        const responseClass = new departmentController();
        departmentModel.find(function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = result
            return res.status(200).send(responseClass.response)
        })

    }
    async deleteDepartment(req, res) {
        const responseClass = new departmentController();
        if (!objectID.isValid(req.params.id)) {
            responseClass.errorResponse.error = "Data Not Found"
            return res.status(400).send(responseClass.errorResponse)
        }
        departmentModel.findByIdAndDelete(req.params.id,function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = result
            return res.status(200).send(responseClass.response)
        })


    }
    async createDepartmentForm(req, res) {
        const responseClass = new departmentController();

        let departFormObject = {
            departmentName: req.body.departmentName,
            departmentLink: req.body.departmentLink,
        }

        departmentFormModel.create(departFormObject, function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = result
            return res.status(200).send(responseClass.response)
        })
    }
    async findDepartmentForm (req, res) {
        const responseClass = new departmentController();
        departmentFormModel.find(function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = result
            return res.status(200).send(responseClass.response)
        })
    }
}



module.exports = new departmentController;