function generateIncorrectAnswers() {
	var keys = Object.keys(antibiotics);

	var incorrectDrugArray2d = [];
	var incorrectDrugArray = [];

	//Fill 2d array of all drugs not in correct answer class
	keys.forEach(function(key) {
		if(antibiotics[key].name != correctAnswerDrugClass.name) {
			if(randomQuestionType) {
				incorrectDrugArray2d.push(antibiotics[key].drugs);
			} else {
				incorrectDrugArray2d.push(antibiotics[key].name);
			}
		}
	});

	//Convert 2d array of incorrect drugs to 1d array
	for(var i = 0; i < incorrectDrugArray2d.length; i++) {
		incorrectDrugArray = incorrectDrugArray.concat(incorrectDrugArray2d[i]);
	}

	//Copy array
	var incorrectDrugArrayClone = incorrectDrugArray.slice();

	var incorrectAnswers = chooseRandomIncorrect(incorrectDrugArrayClone);

	return incorrectAnswers;
}

function chooseRandomIncorrect(incorrectDrugArrayClone) {
	var incorrectAnswers = [];

	if(incorrectDrugArrayClone.length < numOfPossibleAnswers) {
		numOfPossibleAnswers = incorrectDrugArrayClone.length;
	}
	for(var i = 0; i < numOfPossibleAnswers; i++) {
		var incorrectAnswersIndex = Math.floor(incorrectDrugArrayClone.length * Math.random());
		incorrectAnswers.push(incorrectDrugArrayClone[incorrectAnswersIndex]);
		incorrectDrugArrayClone.splice(incorrectAnswersIndex, 1);
	}

	return incorrectAnswers;
}