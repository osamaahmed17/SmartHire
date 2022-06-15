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
            email: req.body.email,
            traineeName: req.body.traineeName,
            experience: req.body.experience,
            sentimentAnalysis: null,
            interviewDate: new Date()
        }

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

        experienceModel.findOne({ "email": req.body.email }, function (error, present) {
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