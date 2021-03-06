const traineeModel = require('../model/traineeModel');
const bcryptjs = require('bcryptjs');

var sessStore;

class traineeController {
    constructor() {
        this.traineeSignUp = this.traineeSignUp.bind(this);
        this.traineeLogin = this.traineeLogin.bind(this);
        this.traineeForgetPassword = this.traineeForgetPassword.bind(this);
        this.updateProfile = this.updateProfile.bind(this);

        this.response = {
            success: true,
            data: "",
        }
        this.errorResponse = {
            success: false,
            error: "",
        };

    };
    async traineeSignUp(req, res) {
        const responseClass = new traineeController();

        const hashpassword = bcryptjs.hashSync(req.body.password, 10);

        let traineeObject = {
            name: req.body.name,
            email: req.body.email,
            traineeID: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
            department: req.body.department,
            contactNumber: req.body.contactNumber,
            password: hashpassword,
        }

        traineeModel.create(traineeObject, function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            delete traineeObject.password
            delete responseClass.response.data
            responseClass.response.res = traineeObject
            responseClass.response.msg= 'Signup Successful.Please Login'
            return res.status(200).send(responseClass.response)
        })
    }

    async traineeLogin(req, res) {
        const responseClass = new traineeController();
        traineeModel.findOne({ 'email': req.body.email }, function (error, trainee) {
            if (!trainee) {
                responseClass.errorResponse.error = "No Email Found, Kindly SignUp"
                return res.status(200).send(responseClass.errorResponse)
            }
            else if (error) {
                responseClass.errorResponse.error = error
                return res.status(200).send(responseClass.errorResponse)
            }
            else {
                bcryptjs.compare(req.body.password, trainee.password, function (error, isMatch) {
                    if (error) {
                        responseClass.errorResponse.error = error
                        return res.status(200).send(responseClass.errorResponse)
                    }

                    if (isMatch === false) {
                        responseClass.errorResponse.error = "Invalid Password"
                        return res.status(200).send(responseClass.errorResponse)

                    } else {
                        sessStore = req.session;
                        sessStore.email = req.body.email;
                        responseClass.response.data = trainee
                        return res.status(200).send(responseClass.response)
                    }
                });
            }
        })
    }

    async traineeForgetPassword(req, res) {
        const responseClass = new traineeController();
        const hashpassword = bcryptjs.hashSync(req.body.password, 10);

        traineeModel.findOneAndUpdate({ 'email': req.body.email }, { 'password': hashpassword }, function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(200).send(responseClass.errorResponse)
            }

            if (result === null) {
                responseClass.errorResponse.error = "Email Not Found!"
                return res.status(200).send(responseClass.errorResponse)

            } else {
                responseClass.response.data = "Password Changed Successfully"
                return res.status(200).send(responseClass.response)
            }
        });
    }

    async alumniData(req, res) {
        const responseClass = new traineeController();
        let val = req.params.val
        // This data would be coming from Excel file later once it's available
        let alumni = [{
            "name":"Osama",
            "email":"osamaahmedtahir17@gmail.com",
            "factory":"Aeronautical Rebuild Factory",
            "department":"IT"
        },
        {
            "name":"Fatima",
            "email":"Fatima@gmail.com",
            "factory":"Aeronautical Rebuild Factory",
            "department":"IT"
        },
        {
            "name":"Khan",
            "email":"Khan@gmail.com",
            "factory":"Aeronautical Manufacturing Factory",
            "department":"MANUFACTURING"
        },
        {
            "name":"Ammar",
            "email":"Ammar@gmail.com",
            "factory":"Mirage Rebuild Factory",
            "department":"MACHINERIES"
        },
        {
            "name":"Haider",
            "email":"Haider@gmail.com",
            "factory":"Aircraft Production Factory",
            "department":"HR"
        }]
        let filteredVal = alumni.filter(x => x.department === val)

        responseClass.response.data = filteredVal
        return res.status(200).send(responseClass.response)
    }

    async updateProfile(req, res) {
        const responseClass = new traineeController();
        let traineeUpdatedObject = {
            name: req.body.name,
            email: req.body.email,
            traineeID: req.body.traineeID,
            department: req.body.department,
            contactNumber: req.body.contactNumber,
        }
        if (sessStore != undefined) {
            console.log(traineeUpdatedObject)
            traineeModel.findOneAndUpdate({ 'email': sessStore.email }, traineeUpdatedObject, function (error, result) {
                if (error) {
                    responseClass.errorResponse.error = error
                    return res.status(200).send(responseClass.errorResponse)
                }
                if (result) {
                    traineeModel.findOne({ 'email': req.body.email }, function (error, trainee) {
                        if (error) {
                            responseClass.errorResponse.error = error
                            return res.status(200).send(responseClass.errorResponse)
                        }
    
                        if (trainee) {
                            responseClass.response.data =trainee
                            return res.status(200).send(responseClass.response)
                        }
                    })
                }
            })
        }
        else {
            responseClass.errorResponse.error = "User has been logged out"
            return res.status(200).send(responseClass.errorResponse)
        }

    }
}



module.exports = new traineeController;