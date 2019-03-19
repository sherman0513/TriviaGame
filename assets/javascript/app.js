var question = [
    {
        q: "Who was the first European Captain to hoist the Stanley Cup?",
        answers: ['A: Nicklas Lidstrom', 'B: Steve Yzerman', 'C: Wayne Gretzky', 'D: Sydney Crosby'],
        correctAnswer: 0
    },

    {
        q: "Who is known as the Magic Man!?",
        answers: ['A: Sergei Federov', 'B: Evegni Malkin', 'C: Pavel Datsyuk', 'D: Nikita Kucherov'],
        correctAnswer: 2
    },

    {
        q: "What number is unofficialed retired with the Detroit Red Wings?",
        answers: ['A: 12', 'B: 49', 'C: 16', 'D: 4'],
        correctAnswer: 2
    },

    {
        q: "Which group of players was known as the Russian Five in the early 90's?",
        answers: ['A: Federov, Datsyuk, Larionov, Malkin, Kucherov', 'B: Datsyuk, Markov, Kovalchuk, Sergachev, Fetisov', 'C: Malkin, Kovalchuk, Konstantinov, Kucherov, Kozlov', 'D: Larionov, Federov, Konstantinov, Kozlov, Fetisov'],
        correctAnswer: 3
    },

    {
        q: "Which player wore the jersey number 9 for the Detroit Red Wings",
        answers: ['A: Ted Lindsey', 'B: Gordie Howe', 'C: Mickey Redmond', 'D: Darren McCarty'],
        correctAnswer: 1
    },
];
var guess;

var correctAnswer = 0;
var incorrectAnswer = 0;
var currentQuestion = 0;
// var i;

var counter = 16;
// var intervalId;

$(document).ready(function () {

    $('.seconds h2').hide();

    //clicking on the start quiz button hides the start page and shows the quiz page while firing the showQuestion() function
    $(".start a").on("click", function (e) {
        e.preventDefault();
        $(".start").hide();
        $(".quiz").show();
        showQuestion();
        $('.results').hide();
    });

    //when you click the li in the quiz answers it adds a class that highlights the answer and removes the class from whatever has the .selected class
    $(".quiz ul").on('click', 'li', function () {
        $('.selected').removeClass('selected')
        $(this).addClass('selected');
    });

    //gives a click function to the submit button on the quiz. and makes sure an answer is being selected
    $('.quiz a').click(function (e) {
        e.preventDefault();
        var guess = parseInt($('li.selected').attr('id'));
        checkAnswer(guess);
        stop();
    });

    //
    $(".results a").click(function (e) {
        e.preventDefault();
        restartQuiz();
    });
});

// have my function timer
// having trouble getting timer to reset
function timer() {
    intervalId = setInterval(decrement, 1000)
}

function stop() {
    clearInterval(intervalId);
    counter = 16;
}


function decrement() {
    counter--;
    $(".seconds").html("<h2>" + "Remaining Seconds: " + counter);
    if (counter <= 0) {
        stop();
    }
}

function endGame() {
    clearInterval(intervalId)
}





//This function changes the header to the current question's title, gets rid of the html in the <ul> and replaces it with the 
//answers in the question array with what is in the variable
function showQuestion() {
    timer();
    current = question[currentQuestion];
    $(".quiz h2").text(current.q);
    $(".quiz ul").html("");
    for (i = 0; i < current.answers.length; i++) {
        var pick = current.answers[i];
        $(".quiz ul").append("<li id='" + i + "'>" + pick + "</li>");
    };
};

//checks if the answer is correct if it is correct it will add an increment to the score variable, if it is not, nothing happens.
// tried adding when the code is correct-or-wrong is displayed after questions is answered
function checkAnswer(guess) {

    if (current.correctAnswer === guess) {
        correctAnswer++;
        // stop();
        $('.answer').text('Correct!');
        // $('.answer').fadeOut(3000);
    } else {
        incorrectAnswer++;
        // stop();
        $('.answer1').text('Wrong!');
        // $('.answer1').fadeOut(3000);
    }

    currentQuestion++;
    // $('.quiz').show(currentQuestion);

    if (currentQuestion >= question.length) {
        showSummary();
    } else {
        showQuestion();
    };
};

//hides the quiz page and shows the summary page of how many questions were guessed right
function showSummary() {
    $(".seconds").hide();
    stop();
    $(".quiz").hide();
    $(".results").show();
    $(".results p1").text('Correct: ' + correctAnswer + ' out of ' + question.length + '! :)')
    $(".results p2").text('Incorrect ' + incorrectAnswer + ' out of ' + question.length + '! :(')
}

function restartQuiz() {
    correctAnswer = 0;
    currentQuestion = 0;
    $(".results").hide();
    $(".quiz").show();
    showQuestion();
    correctAnswer = 0;
    incorrectAnswer = 0;

}