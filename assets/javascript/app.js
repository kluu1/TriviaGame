$( document ).ready(function() {

    // Get DOM elements
    var $questions = $('#questions-content');
    var $choices = $('#choices');
    var $correct = $('#correct');
    var $incorrect = $('#incorrect');
    var $numCorrect = $('#numCorrect');
    var $numIncorrect = $('#numIncorrect');
    var $done = $('#done');
    var $start = $('#start');
    var $restart = $('#restart');
    var $gameOver = $('#game-over');
    var $correctAnswer = $('#correctAnswer');
    var $timer = $('#timer');  

    // Declare variables
    var correct = 0;
    var incorrect = 0;
    var questionNum = 0;
    var seconds = 3;
    var qTimer;
   
    // Create an array of questions
    var questionsArr = [{
                question: "Who was the lead singer for Led Zeppelin?",
                choices: ["Phil Collins", "Bon Scott", "Robert Plant", "Terry Reid"],
                correctAnswer: "Robert Plant"
            }, {
                question: "Who was the guitarist for The Who?",
                choices: ["Jimmy Page", "Pete Townshend", "Angus Young", "Jimi Hendrix"],
                correctAnswer: "Pete Townshend"
            }, {
                question: "Who was NOT in Pink Floyd?",
                choices: ["Roger Waters", "Syd Barrett", "Roger Daltrey", "David Gilmour"],
                correctAnswer: "Roger Daltrey"
            }];

    // Hide elements at startup
    $correct.hide();
    $incorrect.hide();
    $done.hide();
    $restart.hide();
    $gameOver.hide();  

    // Start the game and start event listners
    function start() {
        $start.on('click', function() {
            $start.hide();
            $restart.hide();
            $gameOver.hide();
            $correct.show();
            $incorrect.show();
            $done.show();
            displayQuestions();
        });
        $done.on('click', function() {
            clearInterval(qTimer);
            game.check();
        });
        $restart.on('click', function(){
            restartGame();
        }); 
    }

    // Display the question
    function displayQuestions() {

        $questions.html(questionsArr[questionNum].question);

        // Loops through the array of choices and display it
        for (i = 0; i < questionsArr[questionNum].choices.length; i++) {
            $choices.append('<h3><input type="radio" name="question' + '-' + questionNum + '"value="' + questionsArr[questionNum].choices[i] + '">' + questionsArr[questionNum].choices[i] + '</h3>');
        }

        // Set and start timer
        seconds = 3;
        $timer.html(seconds);
        qTimer = setInterval(countDown, 1000);

    }

    function countDown() {
        seconds--;
        $timer.html(seconds);

        if (seconds <= 0) {
            $correctAnswer.append('<h3>Oops.. Times up! <br> The answer is "' + questionsArr[questionNum].correctAnswer + '"</h3>');
            clearInterval(qTimer);
            incorrect++;
            $numIncorrect.html(incorrect);
            launchNextQuestion();
        }
    }

    function launchNextQuestion() {
        setTimeout(function() {
            questionNum++;
            clear();
            nextQuestion();
        }, 3000);
    }

    function nextQuestion() {
        if (questionNum === questionsArr.length) {
            endGame();
        } else {
            displayQuestions();
        }
    }

    function clear() {
        $questions.empty();
        $choices.empty();
        $correctAnswer.empty();
    }

    function endGame() {
        $timer.hide();
        $done.hide();
        $gameOver.show();
        $restart.show();
    }

    function restartGame() {
        correct = 0;
        incorrect = 0;
        questionNum = 0;
        $numCorrect.html(correct);
        $numIncorrect.html(incorrect);
        $start.hide();
        $restart.hide();
        $gameOver.hide();
        $correct.show();
        $timer.show();
        $incorrect.show();
        $done.show();
        displayQuestions();
    }

    start();

});