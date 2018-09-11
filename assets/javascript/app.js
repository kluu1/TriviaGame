$( document ).ready(function() {

    // get DOM elements
    $questions = $('#questions');
    $choices = $('#choices');
    $panel = $('#play-area');
    $correct = $('#correct');
    $incorrect = $('#incorrect');
    $numCorrect = $('#numCorrect');
    $numIncorrect = $('#numIncorrect');
    $done = $('#done');
    $start = $('#start');
    $restart = $('#restart');
    $gameOver = $('#game-over');
    $correctAnswer = $('#correctAnswer');
    $timer = $('#timer');  

    // declare variables
    var correct = 0;
    var incorrect = 0;
    var questionNum = 0;
    var seconds = 3;
    var qTimer = 3;
    var timesUpTimer = 3;
   
    // create an array of questions
    var questions = [{
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

    // hide elements at startup
    $correct.hide();
    $incorrect.hide();
    $done.hide();
    $restart.hide();
    $gameOver.hide();  

    // start the game
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
    }

    // display questions

    function displayQuestions() {

        $questions.append('<h2>' + questions[questionNum].question + '</h2>');

        // loops through the array of choices and display it with radio button
        for (i = 0; i < questions[questionNum].choices.length; i++) {
            $choices.append('<h3><input type="radio" name="question' + '-' + questionNum + '"value="' + questions[questionNum].choices[i] + '">' + questions[questionNum].choices[i] + '</h3>');
        }

        // reset and display timer
        seconds = 3;
        $timer.html(seconds);
        qTimer = setInterval(countDown, 1000);

        // // setup event listener for done button
        // $done.on('click', function() {
        //     clearInterval(qTimer);
        //     game.check();
        // });

    }

    // decrement timer
    function countDown() {
        seconds--;
        $timer.html(seconds);

        if (seconds <=0) {
            clearInterval(qTimer);
            endOfTime();
        }
    }

    function endOfTime() {
        $correctAnswer.append('<h3>Oops.. Times up! <br> The answer is "' + questions[questionNum].correctAnswer + '"</h3>');
        incorrect++
        $numIncorrect.html(incorrect);
        setTimeout(function() {
            clear();
            nextQuestion();
        }, 3000);
    }

    function nextQuestion() {
        questionNum++

        if (questionNum != questions.length) {
            displayQuestions();
        } else {
            endGame();
        }
    }

    function clear() {
        $questions.empty();
        $correctAnswer.empty();
        $choices.empty();
    }

    function endGame() {
        $timer.hide();
        $done.hide();
        $gameOver.show();
        $restart.show();
        $restart.on('click', function(){
            restartGame();
        });
    }

    function restartGame() {
        correct = 0;
        incorrect = 0;
        questionNum = 0;
        seconds = 3;
        qTimer = 3;
        timesUpTimer = 3;

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