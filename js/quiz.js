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
                    <label for="Frage${questionNumber}" class="question"> ${currentQuestion.question}`);
                if(questionNumber === 2){output.push(`<a href='mp-5ebc2d9cd2c89.mp3'>piep</a>`)};
                if(questionNumber === 3){output.push(`<a href='images/baum.png'>Stamm</a>`)};
                if(questionNumber === 5){output.push(`<a href='winkewinke.m4v'>winke</a>`)};
                output.push(`</label>
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
            question: "Habt ihr die Nuss geknackt?",
            correctAnswer: "16.05.2020",
            feedback: "Leider nicht richtig."
        },
        {
            question: "Piep piep ",
            correctAnswer: "ACI",
            feedback: "Leider nicht richtig. Gesucht wird eine Abkürzung."
        },
        {
            question: "Der Apfel fällt nicht weit vom ",
            correctAnswer: "Das Edelste an der Liebe ist das Vertrauen zueinander",
            feedback: "Leider nicht richtig."
        },
        {
            question: "Lutherbibel 1984",
            correctAnswer: "Liebe",
            feedback: "Leider nicht richtig."
        },
        {
            question: "Winke ",
            correctAnswer: "Fibonacci",
            feedback: "Leider nicht richtig."
        }
    ];

    // Kick things off
    buildQuiz();

    // Event listeners
    submitButton.addEventListener('click', showResults);
})();
