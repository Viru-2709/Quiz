var express = require('express');
var router = express.Router();
const QuestionController = require("../Controller/question")

//Add questions
router.post('/add', QuestionController.Secure, QuestionController.Addquestion);

//All Question
router.get('/all', QuestionController.Allquestion);

//Update Question
router.patch('/edit/:id',QuestionController.Secure , QuestionController.updatequestion );

//Delete Question
router.delete('/delete/:id', QuestionController.Secure , QuestionController.deletequestion)

module.exports = router;
