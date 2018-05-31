function generateCorrectAnswer() {
	var keys = Object.keys(antibiotics);

	var correctAnswerDrugClass = antibiotics[keys[Math.floor(keys.length * Math.random())]];
	var correctAnswerDrug = correctAnswerDrugClass.drugs[Math.floor(correctAnswerDrugClass.drugs.length * Math.random())];

	var correctAnswers = [correctAnswerDrug, correctAnswerDrugClass];

	return correctAnswers;
};