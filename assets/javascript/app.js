$(document).ready(function() {
    // Variable that holds timer for countdown. 
    var timer;

    // Game modes
    const easy = { q: 5, t: 60};
    const normal = { q: 10, t: 30};
    const hard = { q: 15, t: 15};

    // Trivia object for holding trivia game properties
    var quiz = {
        questions: 4,
        time: 0,

        trivia: [
            {
                question: "In 2016, how many of the students on the Midtown School of Science and Technology's Academic Decathalon team went to Washington D.C.?",
                answer: "9",
                incorrect: [
                    "8", "10", "11"
                ],
                image: "assets/images/m16-decathalon-team.gif"
            },

            {
                question: "Which song can be heard in the background when Thor is shown a holographic history of Sakaar?",
                answer: "Pure Imagination",
                incorrect: [
                    "Immigrant Song", "Highway to Hell", "Mr. Blue Sky"
                ],
                image: "assets/images/m17-sakaar-grandmaster.jpg"
            },

            {
                question: "Which one of the following countries surround Wakanda?",
                answer: "Uganda",
                incorrect: [
                    "Egypt", "Somalia", "Ghana"
                ],
                image: "assets/images/m18-Wakanda-map.png"
            },

            {
                question: "How many of Thanos' children survived his quest for the Infinity Gauntlet?",
                answer: "1",
                incorrect: [
                    "3", "2", "0"
                ],
                image: "assets/images/m19-nebula.png"
            }
        ],

        // Resets the number of questions, answers, and the time.
        reset: function() {
            quiz.questions = 4;
            quiz.time = 30;

            $("#correct").text(0);
            $("#incorrect").text(0);
            $("#unanswered").text(0);

            $("#timer").text(quiz.time);
        },

        // Starts the timer
        start: function() {
            timer = setInterval(quiz.count, 1000);
        },

        // Stops the timer and gets the results.
        stop: function() {
            // Stops the timer
            clearInterval(timer);

            // Goes through all the questions and checks if they are correct
            let correct = 0;
            let incorrect = 0;

            // Goes through all of the inputs and checks if it was selected
            $("input").each(function(key, value) {
                // Checks if the selected option is the correct one
                if($(this).prop("checked")) {
                    if($(this).attr("data-correct") !== undefined) {
                        correct++;
                    } else {
                        incorrect++;
                    }
                }
            });

            // Updates the results
            $("#correct").text(correct);
            $("#incorrect").text(incorrect);
            $("#unanswered").text(quiz.questions - correct - incorrect);

        },

        // Counts down 1 second and updates the timer.
        count: function() {
            quiz.time--;
            $("#timer").text(quiz.time);

            // If the time is 0, then immediately show the Results.
            if(quiz.time == 0) {
               $("#done").trigger("click");
            }
        }
    };

    // When "Start" is clicked, the timer begins and the questions are revealed.
    $("#start").on("click", function() {
        quiz.reset();
        $("#clock, #trivia, #done").show();
        $("#start, #result").hide();
        quiz.start();
    });

    // When "Done" is clicked, the results are shown and the timer is stopped.
    $("#done").on("click", function() {
        quiz.stop();
        $("#clock, #trivia, #done").hide();
        $("#results").show();
    });
});