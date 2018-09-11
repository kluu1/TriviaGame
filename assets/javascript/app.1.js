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

    // hide elements at startup
    $correct.hide();
    $incorrect.hide();
    $done.hide();
    $restart.hide();
    $gameOver.hide();    
   
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

    var qTimer;
    var timesUpCountDown;
    
    // create a game object to store all game functions and variables
    var game = {

        correct: 0,
        incorrect: 0,
        seconds: 3,
        questionCt: 0,

        // function to start the game
        start: function() {
            $start.on('click', function() {
                $start.hide();
                $restart.hide();
                $gameOver.hide();
                $correct.show();
                $incorrect.show();
                $done.show();
                game.displayQuestions();
            });  
        },

        // function to display the questions
        displayQuestions: function() {

            $questions.append('<h2>' + questions[game.questionCt].question + '</h2>');
            // loops through the array of choices and display it with radio button
            for (i = 0; i < questions[game.questionCt].choices.length; i++) {
                $choices.append('<h3><input type="radio" name="question' + '-' + game.questionCt + '"value="' + questions[game.questionCt].choices[i] + '">' + questions[game.questionCt].choices[i] + '</h3>');
            }
            // display timer
            game.seconds = 3;
            $timer.html(game.seconds);
            qTimer = setInterval(game.countDown, 1000);
            // setup event listener for done button
            $done.on('click', function() {
                game.check();
                clearInterval(qTimer);
            });
        },

        // decrement seconds
        countDown: function() {
            game.seconds--;
            $timer.html(game.seconds);

            if (game.seconds <= 0) {
                clearInterval(qTimer);
                game.timesUp();
            }
        },

        // When time runs out for a question
        timesUp: function() {
            $correctAnswer.append('<h3>Times up! <br> The answer is "' + questions[game.questionCt].correctAnswer + '"</h3>');
            game.incorrect++;
            $numIncorrect.html(game.incorrect);
            game.questionCt++;
            timesUpCountDown = setInterval(game.next, 1000);
        },
        
        // function to display next question
        // if all questions have been answered, end game
        next: function() {
            clearInterval(timesUpCountDown);

            if (game.questionCt != questions.length) {
                game.clear();
                game.displayQuestions();
            } else {
                game.endGame();
            } 
        },

        // check if selected answer is correct or incorrect
        // setup timer to call the "next" function after 5 seconds
        check: function() {
            $.each($("input[name='question-" +  game.questionCt + "']:checked"), function() {
                if($(this).val() === questions[game.questionCt].correctAnswer) {
                    game.correct++;
                    game.questionCt++;
                    $numCorrect.html(game.correct);
                    $correctAnswer.append('<h3>You are correct!</h3>');
                    setTimeout(game.next, 1000 * 3);
                } else {
                    game.incorrect++;
                    game.questionCt++;
                    $numIncorrect.html(game.incorrect);
                    $correctAnswer.append('<h3>Sorry, wrong answer!</h3>');
                    setTimeout(game.next, 1000 * 3);
                }
            });
        },

        // function to clear questions and choices
        clear: function() {
            $questions.empty();
            $correctAnswer.empty();
            $choices.empty(); 
        },

        // function to end the game
        endGame: function() {
            $timer.hide();
            $done.hide();
            $gameOver.show();
            $restart.show();
            game.restartGame();
        },

        restartGame: function() {
            game.clear();
            game.correct = 0;
            game.incorrect = 0;
            game.seconds = 3;
            game.questionCt = 0;
            $restart.on('click', function() {
                $gameOver.hide();
                $timer.show();
                $numCorrect.html(game.correct);
                $numIncorrect.html(game.incorrect);
                game.displayQuestions();
            });   
        }
    }

    game.start();

});