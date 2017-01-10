"use strict";

// single state object declaration
var state = {
    currentQuestion: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questions: [{ 'question': 'In which year was the first World Cup played?', 'multipleChoice': [1926, 1966, 1930, 2002], 'answer': 'C' },
        { 'question': 'Which country won the World Cup the most times?', 'multipleChoice': ['Brazil', 'The Netherlands', 'Italy', 'Germany'], 'answer': 'A' },
        { 'question': 'Which player scored the goal of the century?', 'multipleChoice': ['Dennis Bergkamp (NL)', 'Zinedine Zidane (FR)', 'Ronaldo (BR)', 'Diego Maradona (ARG)'], 'answer': 'D' },
        { 'question': 'Most finishes in the top two without ever being champion?', 'multipleChoice': ['Italy', 'The Netherlands', 'Belgium', 'Iceland'], 'answer': 'B' },
        { 'question': 'Youngest player to ever play a World Cup game?', 'multipleChoice': ['Pelé (BR)', 'Theo Walcott (ENG)', 'Faryd Mondragón (COL)', 'Norman Whiteside (NIR)'], 'answer': 'D' },
        { 'question': 'Most finishes in the top three without ever being champion?', 'multipleChoice': ['Belgium', 'France', 'The Netherlands', 'Italy'], 'answer': 'C' },
        { 'question': 'Which goalie escaped a red card after a viscious attack on Patrick Battiston?', 'multipleChoice': ['Dino Zoff (ITA)', 'Peter Shilton (ENG)', 'Harald Schumacher (GER)', 'Waldir Peres (BR)'], 'answer': 'C' },
        { 'question': 'Which team were referred to as "The Clockwork Orange"?', 'multipleChoice': ['The Netherlands', 'Ivory Coast', 'England', 'Senegal'], 'answer': 'A' },
        { 'question': 'Which player participated in the most World Cups?', 'multipleChoice': ['Lothar Matthäus (GER)', 'Pelé (BR)', 'Landon Donovan (US)', 'Diego Maradona (ARG)'], 'answer': 'B' },
        { 'question': 'What is the name of the first World Cup trophy?', 'multipleChoice': ['Jules Rimet Trophy', 'Heisman Trophy', 'FIFA World Cup Trophy', 'FA Cup Trophy'], 'answer': 'A' }
    ]
};

// html element declaration
var mainQuestionElement = (

    '<div class = "js-question-box">' +
    '<h3></h3>' +
    '</div>'
);

var mcChoicesElement = (

    '<div class = "js-mc-box">' +
    '<p><input class="js-mc" type="radio" id="js-mc-one" name="js-mc" value="A">' +
    '<label for="js-mc-one" class="js-mc-one"></label></p>' +
    '<p><input class="js-mc" type="radio" id="js-mc-two" name="js-mc" value="B">' +
    '<label for="js-mc-two" class="js-mc-two"></label></p>' +
    '<p><input class="js-mc" type="radio" id="js-mc-three" name="js-mc" value="C">' +
    '<label for="js-mc-three" class="js-mc-three"></label></p>' +
    '<p><input class="js-mc" type="radio" id="js-mc-four" name="js-mc" value="D">' +
    '<label for="js-mc-four" class="js-mc-four"></label></p>' +
    '<div class="js-next-question-control">' +
    '<input id="js-next-question-control" type="button" class="js-buttons js-next-question-control" value="Next Question"/></div>' +
    '/div'
);

var sBoardElement = (

    '<div class = "js-score-board-box" id = "js-score-board-box">' +
    '<h3>Score Board</h3>' +
    '<span><h6>Progress of percentage of questions answered</h6>' +
    '<div class = "js-progress-bar" id="totalProgressBar">' +
    '<div class = "js-progress-bar" id="totalQuestionsProgress">' +
    '<div class = "js-progress-bar" id="questionLabel">0%</div></div></div>' +
    '<h6>Progress of percentage of questions answered correctly</h6>' +
    '<div class = "js-progress-bar" id="totalCorrectProgressBar">' +
    '<div class = "js-progress-bar" id="totalCorrectProgress">' +
    '<div class = "js-progress-bar" id="correctLabel">0%</div></div></div>' +
    '<span><h6>Progress of percentage of questions answered incorrectly</h6></span>' +
    '<div class = "js-progress-bar" id="totalIncorrectProgressBar">' +
    '<div class = "js-progress-bar" id="totalIncorrectProgress">' +
    '<div class = "js-progress-bar" id="incorrectLabel">0%</div></div></div>' +
    '/div'
);

var textAnswerElement = (

    '<div class = "js-text-box" id = "js-text-box">' +
    '<h5></h5>' +
    '</div>'
);

$(function() {

    var formElement = $('#js-start-quiz');
    var questionElement = $('.js-question');
    var choicesElement = $('.js-choices');
    var scoreBoardElement = $('.js-score-board');
    var textElement = $('.js-text');

    $('body').css('background-image', 'url(' + 'fifa_world_cup-bg.jpg' + ')');

    handleStartNewQuiz(formElement, questionElement, choicesElement, state);
    handleNextQuestion(questionElement, choicesElement, textElement, scoreBoardElement, state);
});

// event listeners
function handleStartNewQuiz(formElement, questionElement, choicesElement, state) {

    formElement.click(function(event) {

        var startQuizButton = document.getElementById('js-start-quiz');

        // initialize values
        state.currentQuestion = 0;
        state.questionsAnswered = 0;
        state.questionsCorrect = 0;
        state.questionsIncorrect = 0;
        $('div').remove('.js-score-board-box');
        $('body').css('background-image', 'url(' + 'grass_blue_sky_bg.jpg' + ')');
        $('#js-start-quiz').css('visibility', 'hidden');

        renderMultipleChoice(state, $(questionElement), $(choicesElement), 0); //render multiple choice options
    });
}

function handleNextQuestion(questionElement, choicesElement, textElement, scoreBoardElement, state) {

    choicesElement.on('click', '.js-mc', function() {

        state.questions[state.currentQuestion].selected = $('.js-mc:checked').val(); //capture selected multiple choice option

    });

    choicesElement.on('click', 'input#js-next-question-control.js-buttons', function(event) {

        if (checkQuestionAnswered($(textElement)) === true) {

            var index = state.currentQuestion; //current question
            state.currentQuestion++; // next question

            $('div').remove('.js-text-box');
            renderMultipleChoice(state, $(questionElement), $(choicesElement), state.currentQuestion); //render multiple choice options
            setCorrectAnswer($(textElement), index); //set correct answer for prior question
            renderScoreBoard($(scoreBoardElement)); //render score board
            setProgressPercentage(state);
            setProgressBars(state);


        }
    });
}

function checkQuestionAnswered(textElement) {

    if ($('.js-mc:checked').val() === undefined) {

        var text = 'Question has not been answered. Please take a shot at it before continuing...';
        // render text box with message
        renderText(textElement, text);
        $('#js-text-box').css('color', 'red');
        return false;

    } else {

        return true;
    }
};

function setCorrectAnswer(textElement, index) {

    var i = 0;

    if (index <= 8) {

        if (state.questions[index].answer === state.questions[index].selected) {

            if (state.questions[index].answer == 'A') { i = 0 };
            if (state.questions[index].answer == 'B') { i = 1 };
            if (state.questions[index].answer == 'C') { i = 2 };
            if (state.questions[index].answer == 'D') { i = 3 };

            // render text box with the correct answer
            var text = 'Goal! - answer is ' + state.questions[index].multipleChoice[i];
            renderText($(textElement), text);
            $('#js-text-box').css('color', 'green');

        } else {

            if (state.questions[index].answer == 'A') { i = 0 };
            if (state.questions[index].answer == 'B') { i = 1 };
            if (state.questions[index].answer == 'C') { i = 2 };
            if (state.questions[index].answer == 'D') { i = 3 };

            // render text box with the correct answer
            var text = 'Ah shucks, you missed - the correct answer is ' + state.questions[index].multipleChoice[i] + '.' + ' Better luck next time!';
            renderText($(textElement), text);
            $('#js-text-box').css('color', 'red');
        };
    };
};

function setProgressPercentage(state) {

    var index = state.currentQuestion;
    index--; //must deduct one from current question since it was already incremented
    state.questionsAnswered = state.questionsAnswered + 10;

    if (state.questions[index].selected === (state.questions[index].answer)) {

        state.questionsCorrect = state.questionsCorrect + 10;

    } else {

        state.questionsIncorrect = state.questionsIncorrect + 10;

    }

};

function setProgressBars(state) {

    setProgress('totalQuestionsProgress', state.questionsAnswered, 'Question');
    setProgress('totalCorrectProgress', state.questionsCorrect, 'Correct');
    setProgress('totalIncorrectProgress', state.questionsIncorrect, 'Incorrect');

};

function setProgress(element, width, bar) {

    var elem = document.getElementById(element);

    frame(width);

    function frame() {

        elem.style.width = width + '%';

        if (bar === 'Question') {

            document.getElementById('questionLabel').innerHTML = width * 1 + '%';

        } else if (bar === 'Correct') {

            document.getElementById('correctLabel').innerHTML = width * 1 + '%';

        } else {

            document.getElementById('incorrectLabel').innerHTML = width * 1 + '%';
        }
    }
};

// render functions
var renderMultipleChoice = function(state, questionElement, choicesElement, index) {

    var questionHTML = $(mainQuestionElement); //element with h3
    var choicesHTML = $(mcChoicesElement); //element with multiple choice options and submit button

    if (index <= 9) {

        questionHTML.find('h3').text(state.questions[index].question);
        choicesHTML.find('.js-mc-one').text(state.questions[index].multipleChoice[0]);
        choicesHTML.find('.js-mc-two').text(state.questions[index].multipleChoice[1]);
        choicesHTML.find('.js-mc-three').text(state.questions[index].multipleChoice[2]);
        choicesHTML.find('.js-mc-four').text(state.questions[index].multipleChoice[3]);

        questionElement.html(questionHTML);
        choicesElement.html(choicesHTML);

    } else {

        // chage text on button
        var startQuizButton = document.getElementById("js-start-quiz");
        startQuizButton.defaultValue = 'Have another crack at it!';
        // initialize 
        $('div').remove('.js-question-box');
        $('div').remove('.js-mc-box');
        $('#js-text-box').remove( );
        // change background image        
        $('body').css('background-image', 'url(' + 'fifa_world_cup-bg.jpg' + ')');
        // set start quiz button to visible
        $('#js-start-quiz').css('visibility', 'visible');
    }
};

var renderScoreBoard = function(scoreBoardElement) {

    var scoreBoardHTML = $(sBoardElement); //element with progress bars
    scoreBoardElement.html(scoreBoardHTML);
};

var renderText = function(textElement, text) {

    var textHTML = $(textAnswerElement); //element with H4
    textHTML.find('h5').text(text);
    textElement.html(textHTML);
};
