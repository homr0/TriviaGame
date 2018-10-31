$(document).ready(function() {
    // Variable that holds timer for countdown. 
    var timer;
    var timerRunning = false;

    // Trivia object for holding trivia game properties
    var quiz = {
        questions: 4,
        time: 0,

        // Game modes
        mode: {
            easy: {
                q: 2,
                t: 60
            },

            normal: {
                q: 3,
                t: 30
            },

            hard: {
                q: 4,
                t: 15
            }
        },

        trivia: [
            {
                question: "During the credits of Guardians of the Galaxy Vol. 2, which character did not show up during the film?",
                answer: "Grandmaster",
                choices: [
                    "Grandmaster", "David Hasselhoff", "Ayesha", "Harold the Duck"
                ],
                image: "assets/images/m15-grandmaster.png",
                hint: "Performing at peak Jeff Goldblum"
            },

            {
                question: "In 2016, how many of the students on the Midtown School of Science and Technology's Academic Decathalon team went to Washington D.C.?",
                answer: "9",
                choices: [
                    "9", "8", "10", "11"
                ],
                image: "assets/images/m16-decathalon-team.gif",
                hint: "Roughly equal gender parity with Michelle leaning on the bus"
            },

            {
                question: "Which song can be heard in the background when Thor is shown a holographic history of Sakaar?",
                answer: "Pure Imagination",
                choices: [
                    "Pure Imagination", "Immigrant Song", "Highway to Hell", "Mr. Blue Sky"
                ],
                image: "assets/images/m17-sakaar-grandmaster.jpg",
                hint: "One can't help but see the resemblance between the Grandmaster and Willy Wonka"
            },

            {
                question: "Which one of the following countries surround Wakanda?",
                answer: "Uganda",
                choices: [
                    "Uganda", "Egypt", "Somalia", "Ghana"
                ],
                image: "assets/images/m18-Wakanda-map.png",
                hint: "Tired Memes for Wakandan Teens: 'Do you know da way?'"
            },

            {
                question: "How many of Thanos' children survived his quest for the Infinity Gauntlet?",
                answer: "1",
                choices: [
                    "1", "3", "2", "0"
                ],
                image: "assets/images/m19-nebula.png",
                hint: "If you kill all your darlings, then does the unfavorite(s) survive?"
            },

            {
                question: "Where did Scott Lang fall into the San Francisco Bay?",
                answer: "Pier 39",
                choices: [
                    "Pier 39", "Golden Gate Bridge", "San Francisco-Oakland Bay Bridge", "Embarcadero" 
                ],
                image: "assets/images/m20-antman-ferry.jpg",
                hint: "Scott says hello to all of these tourists"
            }
        ],

        sequence: [],
        answer: "",
        timeLeft: 0,

        // Random number generator
        random: function(max) {
            return Math.floor(Math.random() * max);
        },

        // Checks values to make sure they are unique within the array.
        check: function(index, arr) {
            for(let i = 0; i < arr.length; i++) {
                if((index !== i) && (arr[index] == arr[i])) {
                    return false;
                }
            }
            return true;
        },

        // Sets up the quiz.
        setup: function(level) {
            // Sets the number of questions and the time limit depending on the mode.
            quiz.questions = quiz.mode[level].q;
            quiz.time = quiz.mode[level].t;
            
            // Sets up the sequence of questions.
            quiz.sequence = [];

            for(let i = 0; i < quiz.questions; i++) {
                // Picks a random question and makes sure it's different from the other ones picked.
                quiz.sequence.push(-1);
                do {
                    quiz.sequence[i] = quiz.random(quiz.trivia.length);
                } while(!(quiz.check(i, quiz.sequence)))
            }

            // Resets the number of correct, incorrect, and unanswered responses.
            $("#correct").text(0);
            $("#incorrect").text(0);
            $("#unanswered").text(0);

            $("#timer").text(quiz.time);
        },

        // Starts the timer.
        start: function(value) {
            if(!timerRunning) {
                quiz.timeLeft = quiz.time;
                timer = setInterval(quiz.count, 1000);
                timerRunning = true;

                let trivia = quiz.trivia[value];

                // Fills in the question
                $("#question").html(trivia.question);
                console.log(trivia.question);

                // Picks a random spot for the correct answer
                let choices = trivia.choices;

                for(let i = choices.length - 1; i > 0; i--) {
                    let j = quiz.random((i + 1));
                    let temp = choices[j];
                    choices[j] = choices[i];
                    choices[i] = temp;
                }

                // Outputs the reordered responses
                $("#trivia .choice").each(function(key, value) {
                    let response = choices[key];
                    $(this).children("input").attr("value", response);
                    $(this).children("label").html(response);
                });

                // Updates the image on the response area
                $("#response img").attr({
                    "src": trivia.image,
                    "alt": trivia.hint
                });

                quiz.answer = trivia.answer;

                // Shows the item
                $("#trivia").show();
            }
        },

        // Displays the results from a response.
        results: function(response) {
            // Updates the response type.
            $("#" + response).text(parseInt($("#" + response).text()) + 1);

            // Updates the response
            if(response == "correct") {
                $("#response h2").text("Correct!");
            } else {
                $("#response h2").text("Nope!");
            }

            // Hides the question area.
            $("#trivia").hide();

            // Updates the correct answer
            $("#correctAnswer").text(quiz.answer);

            // Shows the response.
            $("#response").show();

            // Pauses the timer
            quiz.stop();

            console.log($("[name=trivia]").val());
                
            // Shows the response for a few seconds.
            setTimeout(function() {
                $("#response").hide();
                $("#trivia").show();
            }, 5000);
        },

        // Stops the timer and gets the results.
        stop: function() {
            // Stops the timer
            clearInterval(timer);
            timerRunning = false;
        },

        // Counts down 1 second and updates the timer.
        count: function() {
            // If the time is 0, then the question has been unanswered.
            if(quiz.timeLeft == 0) {
                quiz.results("unanswered");
            } else {
                quiz.timeLeft--;
                $("#timer").text(quiz.timeLeft);
            }
        }
    };

    // When "Start" is clicked, the timer begins and the questions are revealed.
    $("#start .mode").on("click", function() {
        quiz.setup($(this).attr("data-mode"));
        $("#clock, #trivia").show();
        $("#start, #result").hide();
        //quiz.generate();
        $(quiz.sequence).each(function(key, value) {
            // Starts the timer.       
            quiz.start(value);

            
        });
    });

    // When an option is clicked, it updates the results section.
    $("[name=trivia]").on("click", function() {
        // Check to see if response is the correct
        if($(this).val() == quiz.answer) {
            quiz.results("correct");
        } else {
            quiz.results("incorrect");
        }
    });
});