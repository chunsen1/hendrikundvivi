(function(){
    function buildQuiz(){
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // add this question and its answers to the output
                output.push(
                    `<div class="form-group answers row">
                    <div class="col-md-12">
                    <label for="Frage${questionNumber}" class="question"> ${currentQuestion.question} </label>
                    <input type="text" class="form-control" id="Frage${questionNumber}" name="Frage${questionNumber}" required><div class="invalid-feedback">
          
        </div>  </div></div>`
                );

            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults(){

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach( (currentQuestion, questionNumber) => {

            let inputField = answerContainers[questionNumber].querySelector("input");
            let divFeedback = answerContainers[questionNumber].querySelector("div.invalid-feedback");
            divFeedback.innerHTML = "";

            //reset validation status
            inputField.classList.remove('is-valid');
            inputField.classList.remove('is-invalid');

            // find selected answer
            const answerInput = inputField.value;
            inputField.value = answerInput;

            // if answer is correct
            if(answerInput === currentQuestion.correctAnswer){
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                inputField.classList.add('is-valid');
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                inputField.classList.add('is-invalid');
                divFeedback.innerHTML = currentQuestion.feedback;
            }
        });

        if (numCorrect === myQuestions.length){
            window.location.href = "glueckwunsch.html";
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = `<div class="col-md-12"> ${numCorrect} von ${myQuestions.length} </div>`;
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {   question: "Die Post wüsste es.",
            correctAnswer: "38723",
            feedback: "Leider nicht richtig."
        },
        {
            question: "Was ist euer Ergebnis bei den M&Ms?",
            correctAnswer: "42",
            feedback: "Leider nicht richtig."
        },
        {
            question: "Welche Botschaft sagt euch der Arduino?",
            correctAnswer: "NEUN",
            feedback: "Leider nicht richtig."
        },
        {
            question: "Der Apfel fällt nicht weit vom Stamm.",
            correctAnswer: "Das Edelste an der Liebe ist das Vertrauen zueinander",
            feedback: "Leider nicht richtig."
        },
        {
            question: "Lutherbibel 1984",
            correctAnswer: "Liebe",
            feedback: "Leider nicht richtig."
        },
        {
            question: "Winke winke",
            correctAnswer: "Fibonacci",
            feedback: "Seht genau hin."
        }
    ];

    // Kick things off
    buildQuiz();

    // Event listeners
    submitButton.addEventListener('click', showResults);
})();