const traineeModel = require('../model/traineeModel');


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
        const string = "abcdefghijklmnopqrstuvwxyz";

        let traineeObject = {
            name: req.body.name,
            email: req.body.email,
            traineeID: string[Math.floor(Math.random() * string.length)],
            department: req.body.department,
            contactNumber: req.body.contactNumber,
            year_of_passing: req.body.year_of_passing,
            password: hashpassword,
        }

        traineeModel.create(traineeObject, function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = result
            return res.status(200).send(responseClass.response)
        })
    }

    async traineeLogin(req, res) {
        const responseClass = new traineeController();

        traineeModel.findOne({ 'email': req.body.email }, function (error, trainee) {
            if (!trainee) {
                responseClass.errorResponse.error = "No Email Found, Kindly SignUp"
                return res.status(500).send(responseClass.errorResponse)
            }
            else if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            else {
                bcryptjs.compare(req.body.password, student.trainee, function (error, isMatch) {
                    if (error) {
                        responseClass.errorResponse.error = error
                        return res.status(500).send(responseClass.errorResponse)
                    }

                    if (isMatch === false) {
                        responseClass.errorResponse.error = "Invalid Password"
                        return res.status(500).send(responseClass.errorResponse)

                    } else {
                        responseClass.response.data = "Login Successfully"
                        return res.status(200).send(responseClass.response)
                    }
                });
            }
        })
    }

    async traineeForgetPassword(req, res) {
        const responseClass = new traineeController();

    }

    async updateProfile(req, res) {
        const responseClass = new traineeController();

    }
}



module.exports = new traineeController;