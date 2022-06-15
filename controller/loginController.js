const adminLoginModel = require('../model/adminLoginModel');
const bcryptjs = require('bcryptjs');


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
        var sessStore;
        adminLoginModel.findOne({ 'email': req.body.email }, (error, admin) => {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            else if (!admin){
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


    }


    async logoutUser(req, res) {
        const responseClass = new adminLoginController();


    }

    async changePassword(req, res) {
        const responseClass = new adminLoginController();


    }

    async getTrainee(req, res) {
        const responseClass = new adminLoginController();


    }

}



module.exports = new adminLoginController;