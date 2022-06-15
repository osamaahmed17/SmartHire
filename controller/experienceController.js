const experienceModel = require('../model/experienceModel');

class experienceController {
    constructor() {
        this.createExperience = this.createExperience.bind(this);
        this.findExperience = this.findExperience.bind(this);
        this.response = {
            success: true,
            data: "",
        }
        this.errorResponse = {
            success: false,
            error: "",
        };

    };
    async createExperience(req, res) {
        const responseClass = new experienceController();

        let experienceObject = {
            email: req.body.email,
            traineeName: req.body.traineeName,
            experience: req.body.experience,
            interviewDate: new Date()
        }
        experienceModel.findOne({"email":req.body.email}, function (error, present) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            if (present) {
                responseClass.errorResponse.error = "Your Exprience is already Added"
                return res.status(500).send(responseClass.errorResponse)
            }
            else {
                experienceModel.create(experienceObject, function (error, result) {
                    if (error) {
                        responseClass.errorResponse.error = error
                        return res.status(500).send(responseClass.errorResponse)
                    }
                    responseClass.response.data = result
                    return res.status(200).send(responseClass.response)
                })
            }
        })

    }



    async findExperience(req, res) {
        const responseClass = new experienceController();

        experienceModel.find(function (error, result) {
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(500).send(responseClass.errorResponse)
            }
            responseClass.response.data = result
            return res.status(200).send(responseClass.response)
        })

    }
}



module.exports = new experienceController;