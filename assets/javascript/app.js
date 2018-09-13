$( document ).ready(function() {

    // Declare global variables
    var correct = 0;
    var incorrect = 0;
    var questionNum = 0;
    var seconds;
    var qTimer;
    var clickSound = new Audio('./assets/sounds/click.ogg');
    var soundCorrect = new Audio('./assets/sounds/correct.wav');
    var soundIncorrect = new Audio('./assets/sounds/incorrect.wav');

    // Get DOM elements
    var $questions = $('#questions-content');
    var $choices = $('#choices');
    var $correct = $('#correct');
    var $incorrect = $('#incorrect');
    var $numCorrect = $('#numCorrect');
    var $numIncorrect = $('#numIncorrect');
    var $start = $('#start');
    var $restart = $('#restart');
    var $gameOver = $('#game-over');
    var $timesUp = $('#timesUp');
    var $scoreDiv = $('#score-div');
    var $correctAnswer = $('#correctAnswer');
    var $incorrectAnswer = $('#incorrectAnswer');
    var $displayAnswer = $('#displayAnswer');
    var $displayTheAnswer = $('#displayTheAnswer');
    var $timer = $('#timer');  
    var $choiceA = $('#choice-A');
    var $choiceB = $('#choice-B');
    var $choiceC = $('#choice-C');
    var $choiceD = $('#choice-D');
    var $choice = $('.choices');

    // Create an array of questions
    var questionsArr = [{
                question: 'Who created JavaScript?',
                choices: ['Microsoft', 'Sun Microsystems', 'Oracle', 'Netscape'],
                correctAnswer: 'Netscape'
            }, {
                question: 'How long did Brendan Eich take to write the JavaScript programming language?',
                choices: ['10 days', '2 weeks', '2 months', '6 months'],
                correctAnswer: '10 days'
            }, {
                question: 'Which of following is not a reserved word in JavaScript?',
                choices: ['default', 'finally', 'throw', 'undefined'],
                correctAnswer: 'undefined'
            }, {
                question: 'What is the function for creating a prompt box?',
                choices: ['alert();', 'prompt();', 'document.prompt();', 'document.ask();'],
                correctAnswer: 'prompt();'
            }, {
                question: 'Which of the following events is not a valid event?',
                choices: ['onLoad', 'onClick', 'onLinkClick', 'onMouseover'],
                correctAnswer: 'onLinkClick'
            }, {
                question: 'Which of the following function adds and/or removes elements from an array?',
                choices: ['toSource()', 'sort()', 'splice()', 'unshift()'],
                correctAnswer: 'splice()'
            }, {
                question: 'Which of the following function returns the number\'s value?',
                choices: ['toString()', 'valueOf()', 'toLocaleString()', 'toPrecision()'],
                correctAnswer: 'valueOf()'
            }, {
                question: 'Which built-in method calls a function for each element in the array?',
                choices: ['while()', 'loop()', 'forEach()', 'None of the above'],
                correctAnswer: 'forEach()'
            }, {
                question: 'How do you create a function in JavaScript?',
                choices: ['function myFunction()', 'loop()', 'function:myFunction()', 'func myFunction()'],
                correctAnswer: 'function myFunction()'
            }, {
                question: 'How does a FOR loop start?',
                choices: ['for i = 1 to 5', 'for (i = 0; i <= 5; i++)', 'for (i <= 5; i++)', 'for (i = 0; i <= 5)'],
                correctAnswer: 'for (i = 0; i <= 5; i++)'
            }
        ];

    var displayCorrectArr = []

    // Hides elements at startup
    function startUp (){
        $correct.hide();
        $incorrect.hide();
        $choices.hide();
        $timesUp.hide();
        $scoreDiv.hide();
        $correctAnswer.hide();
        $incorrectAnswer.hide();
        $displayAnswer.hide();
        $restart.hide();
        $gameOver.hide();
        startGame(); 
    }
    
    // Start the game by starting event listners
    function startGame() {
        $start.on('click', function() {
            clickSound.play();
            $start.hide();
            $restart.hide();
            $gameOver.hide();
            $scoreDiv.show();
            $choices.show();
            $correct.show();
            $incorrect.show();
            displayQuestions();
        });
        $restart.on('click', function() {
            clickSound.play();
            restartGame();
        });
        $choice.on('click', choiceEvent); 
    }

    // Logic for selected answer choice
    function choiceEvent() {
        clearInterval(qTimer);
        choice = $(this); 
        checkSelected();
    }

    // Display the question along with choices
    function displayQuestions() {
        $scoreDiv.show();
        $questions.html(questionsArr[questionNum].question);
        $choiceA.append(questionsArr[questionNum].choices[0]);
        $choiceB.append(questionsArr[questionNum].choices[1]);
        $choiceC.append(questionsArr[questionNum].choices[2]);
        $choiceD.append(questionsArr[questionNum].choices[3]);

        // Start the timer for current question
        seconds = 15;
        $timer.html(seconds);
        qTimer = setInterval(countDown, 1000);
    }

    // Decrement seconds
    function countDown() {
        seconds--;
        $timer.html(seconds);

        // Logic for when time runs out
        if (seconds <= 0) {
            $choice.off('click', choiceEvent); 
            soundIncorrect.play();
            $timesUp.show();
            $displayAnswer.show();
            $displayTheAnswer.html(questionsArr[questionNum].correctAnswer);
            clearInterval(qTimer);
            incorrect++;
            $numIncorrect.html(incorrect);
            launchNextQuestion();
        }
    }

    // Prepare for next question
    function launchNextQuestion() {
        setTimeout(function() {
            questionNum++;
            clear();
            nextQuestion();
        }, 3000);
    }

    // Function to reset the DOM for next question
    function clear() {
        $questions.empty();
        $choiceA.empty();
        $choiceB.empty();
        $choiceC.empty();
        $choiceD.empty();
        $timesUp.hide();
        $correctAnswer.hide();
        $incorrectAnswer.hide();
        $displayAnswer.hide();
    }

    // Logic to see if there are more questions or end game
    function nextQuestion() {
        if (questionNum === questionsArr.length) {
            endGame();
        } else {
            displayQuestions();
            $choice.on('click', choiceEvent); 
        }
    }

    // Check if selected answer is correct
    function checkSelected() {
        $choice.off('click', choiceEvent); 
        if (choice.text() === questionsArr[questionNum].correctAnswer) {
            soundCorrect.play();
            isCorrect();
        } else {
            soundIncorrect.play();
            isIncorrect();
        }
    }

    // If selected answer is correct
    function isCorrect() {
        correct++;
        $numCorrect.html(correct);
        $correctAnswer.show();
        launchNextQuestion();
    }

    // If selected anwer is incorrect
    function isIncorrect() {
        incorrect++;
        $numIncorrect.html(incorrect);
        $incorrectAnswer.show();
        $displayAnswer.show();
        $displayTheAnswer.html(questionsArr[questionNum].correctAnswer);
        launchNextQuestion();
    }

    // Function to end the game
    function endGame() {
        $timer.hide();
        $choices.hide();
        $gameOver.show();
        $restart.show();
    }

    // Function to restart the game
    function restartGame() {
        correct = 0;
        incorrect = 0;
        questionNum = 0;
        $numCorrect.html(correct);
        $numIncorrect.html(incorrect);
        $start.hide();
        $restart.hide();
        $gameOver.hide();
        $scoreDiv.show();
        $choices.show();
        $correct.show();
        $timer.show();
        $incorrect.show();
        $choice.on('click', choiceEvent); 
        displayQuestions();
    }

    // Starts the game
    startUp();

});