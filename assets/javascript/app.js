$(document).ready(function() {
    // Variable that holds timer for countdown. 
    var timer;

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
            },

            {
                question: "Where did Scott Lang fall into the San Francisco Bay?",
                answer: "Pier 39",
                incorrect: [
                    "Golden Gate Bridge", "San Francisco-Oakland Bay Bridge", "Embarcadero" 
                ],
                image: "assets/images/m20-antman-ferry.jpg"
            }
        ],

        sequence: [],

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

            console.log(quiz.sequence);

            // Resets the number of correct, incorrect, and unanswered responses.
            $("#correct").text(0);
            $("#incorrect").text(0);
            $("#unanswered").text(0);

            $("#timer").text(quiz.time);
        },

        // Starts the timer.
        start: function() {
            timer = setInterval(quiz.count, 1000);
        },

        // Sets up the question to be asked
        ask: function() {
            
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
        },

        // Generates a question from the trivia
        generate: function() {

        }
    };

    // When "Start" is clicked, the timer begins and the questions are revealed.
    $("#start .mode").on("click", function() {
        quiz.setup($(this).attr("data-mode"));
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