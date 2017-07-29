$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); 
    $('.tooltipped').tooltip({ 
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() {
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 25;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }
            if(i === 5) {
                $('#timer').effect("pulsate", {
                    times: 15
                }, 1000 * 5);
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                i = 25;
                postQuestion(currentQuestionIndex);
            } 
            else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "During the pilot episode, who starts their first day at Dunder Mifflin?",
            "c": ["Erin Hannon", "Ryan Howard", "Dwight Schrute", "Pam Beesly"],
            "answer": 1
        },
        // question 2
        {
            "q": "What is Andy's Nickname for Jim?",
            "c": ["Jimbo", "Fat Halpert", "New Guy", "Big Tuna"],
            "answer": 3
        },
        // question 3
        {
            "q": "In Season 3, What gift does Jim give Dwight after dwight saves him from being attacked by Roy?",
            "c": ["bobblehead", "glass case for bobblehead", "pitchfork", "crossbow"],
            "answer": 1
        },
        // question 4
        {
            "q": "what is Michael's favorite thing to say?",
            "c": ["That's what she said", "Conference room five minutes", "damnit Toby", "Mo' Money, mo' problems"],
            "answer": 0
        },
        // question 5
        {
            "q": "Who isn't in the accounting Department?",
            "c": ["Kevin", "Angela", "Creed", "Oscar"],
            "answer": 2
        },
        // question 6
        {
            "q": "'I delcare _________', what did Michael declare that Oscar later informed Michael 'you can't just say the word '______' and expect anything to happen'",
            "c": ["war", "bankruptcy", "cake"],
            "answer": 1
        },
        // question 7
        {
            "q": "In season 6 for earth day, Dwight dresses up as which character for Earth Day?",
            "c": ["Recyclops", "Energy Man", "The Solar Sun"],
            "answer": 0
        },
        // question 8
        {
            "q": "What season does Michael leave the office?",
            "c": ["6","7", "8", "9"],
            "answer": 1
        },
        // question 9
        {
            "q": "What office tool of Dwights did Jim put into jello?",
            "c": ["Ruler", "Calculator", "Tape Dispensor", "Stapler"],
            "answer": 3
        },
        // question 10
        {
            "q": "in Season 4 during the launch party, what is the preferred pizza place amongst the office staff?",
            "c": ["Pizza by Alfredo", "Scranton Pizza", "Alfredo's Pizza Cafe", "Pizza Hut"],
            "answer": 2
        }
    ];

    var winMessages = ['You are the Winner of the Office Olympics', 'Your branch wont have to close down', 'You win a one night stay at Schrute Farms Bed and Breakfast'];

    function randomNum(x) {
        var y = Math.floor(Math.random() * x);
        return y;
    }

    function randomCongrats() {
        $('#questionContainer').hide();
        $('#choices').hide();
        $("#messageSection").show();
        var message = randomNum(winMessages.length);
        $('#gameMessage').append("<h2>Correct! " + winMessages[message] + "</h2>");
        //setTimeout(postQuestion(i), 1000 * 10);
    }

    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#questionContainer').show();
            $('#choices').show();
            $('#gameMessage').remove();
            $("#messageSection").hide();
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");

            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }

        } 
        else {
            resetGame();
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); 
            userChoice = parseInt(userChoice);

            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();
                setTimeout(postQuestion(currentQuestionIndex), 1000 * 10);
            } 
            else {
                incorrectCounter++;
                currentQuestionIndex++;
                postQuestion(currentQuestionIndex);

            }
            //postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");
        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});