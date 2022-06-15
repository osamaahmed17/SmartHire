const adminLoginModel = require('../model/adminLoginModel');
const traineeModel = require('../model/traineeModel')
const bcryptjs = require('bcryptjs');

var sessStore;

class adminLoginController {
    constructor() {
        this.createAmin = this.createAmin.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.getTrainee = this.getTrainee.bind(this);
        this.response = {
            success: true,
            data: "",
        }
        this.errorResponse = {
            success: false,
            error: "",
        };

    };

    
    async createAmin(req, res) {
        const responseClass = new adminLoginController();
        const hashpassword = bcryptjs.hashSync(req.body.password, 10);

        let adminObject = {
            name: req.body.name,
            email: req.body.email,
            password: hashpassword
        }

        adminLoginModel.create(adminObject, function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = result
            return res.status(200).send(responseClass.response)
        })
    }


    async loginUser(req, res) {
        const responseClass = new adminLoginController();
        adminLoginModel.findOne({ 'email': req.body.email }, (error, admin) => {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            else if (!admin) {
                responseClass.errorResponse.error = "No Admin Exists"
                return res.status(404).send(responseClass.errorResponse)
            }
            else {
                bcryptjs.compare(req.body.password, admin.password, (err, isMatch) => {
                    if (error) {
                        responseClass.errorResponse.error = error
                        return res.status(500).send(responseClass.errorResponse)
                    }

                    if (isMatch === false) {
                        responseClass.errorResponse.error = "Invalid Credentials"
                        return res.status(500).send(responseClass.errorResponse)
                    } else {
                        sessStore = req.session;
                        sessStore.email = req.body.email;
                        responseClass.response.data = "Login Successful"
                        return res.status(200).send(responseClass.response)
                    }
                });
            }


        });

    }


    async getUser(req, res) {
        const responseClass = new adminLoginController();
        if (sessStore != undefined) {
            adminLoginModel.findOne({ "email": sessStore.email }, function (error, result) {
                if (error) {
                    responseClass.errorResponse.error = error
                    return res.status(500).send(responseClass.errorResponse)
                }
                delete result.password
                responseClass.response.data = result
                return res.status(200).send(responseClass.response)
            }).lean()
        }
        else {
            responseClass.errorResponse.data = "User has been logged out"
            return res.status(500).send(responseClass.response)
        }

    }


    async logoutUser(req, res) {
        const responseClass = new adminLoginController();
        req.session.destroy();
        responseClass.response.data = "Session Destroyed"
        return res.status(200).send(responseClass.response)
    }


    async changePassword(req, res) {
        const responseClass = new adminLoginController();
        const hashpassword = bcryptjs.hashSync(req.body.newPassword, 10);
        if (sessStore != undefined) {
            adminLoginModel.findOneAndUpdate({ 'email': sessStore.email }, { 'password': hashpassword }, (error, result) => {
                if (error) {
                    responseClass.errorResponse.error = error
                    return res.status(500).send(responseClass.errorResponse)
                }
                responseClass.response.data = "Password has been changed"
                return res.status(200).send(responseClass.response)
            });
        }
        else {
            responseClass.errorResponse.data = "User has been logged out"
            return res.status(500).send(responseClass.response)
        }
    }


    async getTrainee(req, res) {
        const responseClass = new adminLoginController();
        traineeModel.find((error, data) => {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = data
            return res.status(200).send(responseClass.response)

        });
    }
}



module.exports = new adminLoginController;