const experienceModel = require('../model/experienceModel');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const { SentimentAnalyzer, PorterStemmer, WordTokenizer } = natural;
const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
spellCorrector.loadDictionary();



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
            experienceID: parseInt((Math.random() * 9 + 1) * Math.pow(10,10-1), 10),
            email: req.body.email,
            traineeName: req.body.traineeName,
            experience: req.body.experience,
            departmentName: req.body.departmentName,
            sentimentAnalysis: null,
            interviewDate:  req.body.interviewDate
        }   
        console.log(experienceObject)

        
        let experienceLex = aposToLexForm(experienceObject.experience);
        let experienceCase = experienceLex.toLowerCase();
        let experienceAlhpabet = experienceCase.replace(/[^a-zA-Z\s]+/g, '');
        let experienceTokenized = tokenizer.tokenize(experienceAlhpabet);
        experienceTokenized.forEach((word, index) => {
            experienceTokenized[index] = spellCorrector.correct(word);
        })
        let experienceFiltered = SW.removeStopwords(experienceTokenized);
        let experienceAnalysis = analyzer.getSentiment(experienceFiltered);
        experienceObject.sentimentAnalysis = experienceAnalysis
        console.log(req.body.email)
        experienceModel.findOne({ "email": req.body.email }, function (error, present) {
            
            if (error) {
                responseClass.errorResponse.error = error
                return res.status(200).send(responseClass.errorResponse)
            }
         
            else {
                experienceModel.create(experienceObject, function (error, result) {
                    if (error) {
                        console.log(error)
                        responseClass.errorResponse.error = error
                        return res.status(500).send(responseClass.errorResponse)
                    }
                    console.log(result)
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