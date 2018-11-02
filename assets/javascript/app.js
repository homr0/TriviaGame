$(document).ready(function() {
    // Variable that holds timer for countdown. 
    var timer;
    var timerRunning = false;

    // Trivia object for holding trivia game properties
    var quiz = {
        questions: 0,
        time: 0,

        // Game modes
        mode: {
            easy: {
                q: 2,
                t: 30
            },

            normal: {
                q: 3,
                t: 15
            },

            hard: {
                q: 5,
                t: 5
            }
        },

        trivia: [
            {
                question: "Which Extremis user died from an explosion in Rose Hill, Tennessee?",
                answer: "Chad Davis",
                choices: [
                    "Chad Davis", "Ellen Brandt", "Jack Taggart", "Michael Peterson"
                ],
                image: "assets/images/m7-explosion-alley.jpg",
                hint: "It was at this site that five other people died in that alley"
            },

            {
                question: "What realm does Thor save from the Marauders?",
                answer: "Vanaheim",
                choices: [
                    "Vanaheim", "Nidavellir", "Alfheim", "Nornheim"
                ],
                image: "assets/images/m8-hogun-home.png",
                hint: "Thankfully Thor saved Hogun's home from getting destroyed by the Marauders"
            },

            {
                question: "Which one of the identified targets of Zola's algorithm was not yet known to the Avengers?",
                answer: "Dr. Stephen Strange",
                choices: [
                    "Dr. Stephen Strange", "Dr. Bruce Banner", "Captain Steve Rogers", "Anthony Stark"
                ],
                image: "assets/images/m9-strange-banner.jpg",
                hint: "Sometimes your biggest threats happen to be out of town while your helicarriers are flying out"
            },

            {
                question: "How many times has Rocket Racoon been charged with escaping incarceration?",
                answer: "14",
                choices: [
                    "14", "13", "7", "15"
                ],
                image: "assets/images/m10-rocket-lineup.jpg",
                hint: "If you count the escape from the Kyln, the number of times he's escaped surely entitles him to a driver's permit at least."
            },

            {
                question: "Which one of the following natural user language interfaces were not considered as a replacement after J.A.R.V.I.S. became Vision?",
                answer: "Karen",
                choices: [
                    "Karen", "F.R.I.D.A.Y.", "T.A.D.A.S.H.I.", "J.O.C.A.S.T.A."
                ],
                image: "assets/m11-suit-lady.jpg",
                hint: "Obviously, J.A.R.V.I.S.'s widow wasn't considered to be a replacement"
            },

            {
                question: "What kind of art did Luis mention he preferred when he was with his cousin Ignacio?",
                answer: "Neo-Cubism",
                choices: [
                    "Neo-Cubism", "Abstract Expressionism", "Neo-Expressionism", "Abstract Illusionism"
                ],
                image: "assets/images/m12-luis-art.PNG",
                hint: "The Rothko was sublime enough to get Luis excited about (though it's a bit flat compared to what he prefers)"
            },

            {
                question: "Where did Spider Man first meet Captain America?",
                answer: "Schkeuditz, Germany",
                choices: [
                    "Berlin, Germany", "Leipzig, Germany", "Queens, New York", "Schkeuditz, Germany"
                ],
                image: "assets/m13-captain-america-airport.png",
                hint: "He's definitely far from home and it's only his first movie"
            },

            {
                question: "While Stephen Strange was stealing books from the library in his astral form, what song was Wong listening to?",
                answer: "Single Ladies (Put a Ring on It)",
                choices: [
                    "Single Ladies (Put a Ring on It)", "Interstellar Overdrive", "Shining Star", "Feels So Good"
                ],
                image: "assets/images/m14-wong-library.PNG",
                hint: "Dr. Strange sure likes putting his Sling Ring to use"
            },

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
                question: "Which one of the following countries neighbor Wakanda?",
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
        current: 0,

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
        start: function() {
            if(!timerRunning) {
                quiz.timeLeft = quiz.time;
                timer = setInterval(quiz.count, 1000);
                timerRunning = true;
            }
        },

        ask: function(index) {
            // Start the timer
            quiz.start();
            $("#timer").text(quiz.timeLeft);

            let trivia = quiz.trivia[quiz.sequence[index]];
            $("#question").html(trivia.question);

            // Picks a random spot for the correct answer.
            let choices = trivia. choices;

            for(let i = choices.length - 1; i > 0; i--) {
                let j = quiz.random(i + 1);
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

            // Updates the answer
            quiz.answer = trivia.answer;

            // Clears the current checked response
            $("[name=trivia]:checked").prop("checked", false);

            // Shows the item
            $("#trivia").show();
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

            // Shows the response for a few seconds.
            setTimeout(function() {
                $("#response").hide();

                quiz.current++;
                if(quiz.current < quiz.questions) {
                    // Render next question
                    quiz.ask(quiz.current);
                    $("#trivia").show();
                } else {
                    // Shows the results
                    $("#clock").hide();
                    $("#results, #restart").show();
                }
            }, 3000);
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
        quiz.current = 0;
        quiz.ask(0);
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

    $("#restart").on("click", function() {
        // Restarts the game;
        $("#results").hide();
        $("#start").show();
    });
});