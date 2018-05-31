var antibiotics = {
	penicillin : { 
		name : "Penicillin", 
		drugs : ["penicillin G"] 
	},
	penicillinaseResistantPenicillin : { 
		name : "Penicillinase Resistant Penicillin", 
		drugs : ["methicillin", "nafcillin", "oxacillin", "dicloxacillin"] 
	},
	antiPseudomonalPenicillins : { 
		name : "Anti-Pseudomonal Penicillin", 
		drugs : ["ticarcillin", "carbenicillin", "piperacillin", "mezlocillin"] 
	},
	firstGenerationCephalosporin : { 
		name: "First Generation Cephalosporin",
		drugs : ["cefazolin", "cephalexin"] 
	},
	secondGenerationCephalosporin : { 
		name : "Second Generation Cephalosporin",
		drugs : ["cefuroxime", "cefaclor", "cefprozil"]
	},
	cephamycins : {
		name : "Cephamycin",
		drugs : ["cefotetan", "cefoxitin"]
	},
	thirdGenerationCephalosporin : {
		name : "Third Generation Cephalosporin",
		drugs : ["cefotaxime", "cefixime", "cefdinir", "ceftibuten", "ceftazidime",
			"ceftriaxone", "cefpodoxime proxetil", "cefditoren pivoxil"]
	},
	fourthGenerationCephalosporin : {
		name : "Fourth Generation Cephalosporin",
		drugs : ["cefepime"]
	},
	fifthGenerationCephalosporin : {
		name : "Fifth Generation Cephalosporin",
		drugs : ["ceftaroline fasamil", "ceftolozane"]
	},
	carbapenem : {
		name : "Carbapenem",
		drugs : ["imipenem", "meropenem", "doripenem", "ertapenem"]
	},
	monobactam : {
		name : "Monobactam",
		drugs : ["aztreonam"]
	},
	glycopeptide : {
		name : "Glycopeptide",
		drugs : ["vancomycin"]
	},
	lipoglycopeptide : {
		name : "Lipoglycopeptide",
		drugs : ["telavancin", "dalbavancin", "oritavancin"]
	},
	betaLactamseInhibitor : {
		name : "Beta-lactamse Inhibitor",
		drugs : ["clavulanic acid", "sulbactam", "tazobactam"]
	},
	oxazolidinone : {
		name : "Oxazolidinone",
		drugs : ["linezolid", "tedizolid"]
	},
	macrolide : {
		name : "Macrolide",
		drugs : ["erythromycin", "clarithromycin", "azithromycin", "fidaxomicin"]
	},
	ketolide : {
		name : "Ketolide",
		drugs : ["telithromycin"]
	},
	streptogramin : {
		name : "Streptogramin",
		drugs : ["quinupristin", "dalfopristin"]
	},
	tetracycline : {
		name : "Tetracycline",
		drugs : ["doxycycline", "tetracycline", "minocycline", "demeclocycline"]
	},
	glycylcyclines : {
		name : "Glycylcycline",
		drugs : ["tigecycline"]
	},
	aminoglycoside : {
		name : "Aminoglycoside",
		drugs : ["streptomycin", "gentamicin", "tobramycin", "amikacin", "neomycin",
			"paromomycin", "kanamycin", "netilmicin"]
	},
	fluoroquinolone : {
		name : "Fluoroquinolone",
		drugs : ["moxifloxacin", "ciprofloxacin", "enoxacin", "ofloxacin", "pefloxacin",
			"gatifloxacin", "gemifloxacin", "levofloxacin"]
	},
	sulfonamide : {
		name : "Sulfonamide",
		drugs : ["sulfamethoxazole"]
	},
	benzylpyrimidine : {
		name : "Benzylpyrimidine",
		drugs : ["trimethoprim"]
	},
	polymyxin : {
		name : "Polymyxin",
		drugs : ["polymyxin B", "colistin"]
	}
};

//Global Variables
var correctAnswerInfo;
var correctAnswerDrugName;
var correctAnswerDrugClass;
var correctAnswer;

var numOfPossibleAnswers;
var incorrectAnswers;

var allAnswers;
var insertLocation;

var form;

var answerChecked;

var button = document.getElementById("checkAnswerButton");

var correctAnswerCounter = 0;
var incorrectAnswerCounter = 0;

var randomQuestionType;

var correctAnswerColor = "#6cd140";
var incorrectAnswerColor = "#f74f4f";
var highlightSelectedColor = "#07c9ff";


//initialize counter text
document.getElementById("correctAnswerCounter").innerHTML = "Correct: " 
	+ correctAnswerCounter;
document.getElementById("incorrectAnswerCounter").innerHTML = "Incorrect: " 
	+ incorrectAnswerCounter;



newQuestion();

function newQuestion() {
	answerChecked = false;
	button.innerText = "Check Answer";

	//Generate 1 or 0 to randomly select question type
	randomQuestionType = Math.floor(Math.random() * 2);
	numOfPossibleAnswers = 4;

	//Generate correct answer information
	correctAnswerInfo = generateCorrectAnswer();
	correctAnswerDrugName = correctAnswerInfo[0];
	correctAnswerDrugClass = correctAnswerInfo[1];
	if(randomQuestionType) {
		correctAnswer = correctAnswerDrugName;
	} else {
		correctAnswer = correctAnswerDrugClass.name;
	}
	console.log(correctAnswerDrugName);
	console.log(correctAnswerDrugClass);

	incorrectAnswers = generateIncorrectAnswers();
	console.log(incorrectAnswers);

	//Create clone of incorrect answers array, and insert the correct answer into a 
	//random location in that array
	allAnswers = incorrectAnswers.slice();
	insertLocation = Math.floor(Math.random() * (incorrectAnswers.length + 1));
	console.log(insertLocation);
	allAnswers.splice(insertLocation, 0, correctAnswer);
	console.log(allAnswers);

	//Insert appropriate text for question and add to html
	if(randomQuestionType) {
		document.getElementById("question").innerHTML = "Which of these falls within the " 
			+ correctAnswerDrugClass.name + " class?";
	} else {
		document.getElementById("question").innerHTML = correctAnswerDrugName 
			+ " falls within which class?";
	}

	//Create radio buttons for all possible answers
	form = document.getElementById("form");

	for(var i = 0; i < allAnswers.length; i++) {
		form.appendChild(makeRadioButtons("answers", allAnswers[i], allAnswers[i], i));
	}
}

function clearOldQuestion() {
	button.style.visibility = "hidden";
	var divToRemove = document.getElementsByClassName("answerButtons");
	//Delete first element in list while there is at least 1 element in list
	while(divToRemove[0]) {
		divToRemove[0].parentNode.removeChild(divToRemove[0]);
	}
}

function makeRadioButtons(name, value, text, i) {
	var radioHtml = '<input type="radio" onclick="showButton();highlightSelected();" value="' 
		+ value + '" name="' + name + '"/><span id="span' + i + '">' + text + '</span>';

	var idString = "answer" + i;	

	var label = document.createElement("label");
	label.className = "answerButtons";
	label.id = idString;
	label.innerHTML = radioHtml;

	return label;
}

function showButton() {
	button.style.visibility = "visible";
}

function clickButton() {
	if(!answerChecked) {
		checkAnswer();
	} else {
		clearOldQuestion();
		newQuestion();
	}
}

function checkAnswer() {
	var radbut = document.getElementsByName("answers");
	var userAnswer;

	var userAnswerIndex;
	var correctAnswerIndex;

	//Loop through each radio button to find user chosen answer
	for(var i = 0; i < radbut.length; i++) {
		if (radbut[i].checked) {
			userAnswer = radbut[i].value;
			userAnswerIndex = i;
		}
		if (radbut[i].value === correctAnswer) {
			correctAnswerIndex = i;
		}
	}
	console.log(userAnswerIndex);

	//Disable radio buttons
	for(var i = 0; i < radbut.length; i++) {
		radbut[i].disabled = true;
	}
	
	var correctAnswerLabel = document.getElementById("span" + correctAnswerIndex);
	var userAnswerLabel = document.getElementById("span" + userAnswerIndex);

	correctAnswerLabel.style.backgroundColor = correctAnswerColor;

	if(userAnswer === correctAnswer) {
		correctAnswerCounter++;
	} else {
		userAnswerLabel.style.backgroundColor = incorrectAnswerColor;

		incorrectAnswerCounter++;
	}

	//update counter text
	document.getElementById("correctAnswerCounter").innerHTML = "Correct: " 
		+ correctAnswerCounter;
	document.getElementById("incorrectAnswerCounter").innerHTML = "Incorrect: " 
		+ incorrectAnswerCounter;

	answerChecked = true;

	button.innerText = "Next Question";
}

function highlightSelected() {
	var radbut = document.getElementsByName("answers");
	for(var i = 0; i < radbut.length; i++) {
		var spanId = "span" + i;
		var span = document.getElementById(spanId);
		if (radbut[i].checked) {
			span.style.backgroundColor = highlightSelectedColor;
		} else {
			span.style.backgroundColor = "lightgray";
		}
	}
}
