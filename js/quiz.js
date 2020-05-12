(function(){
    function buildQuiz(){
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // add this question and its answers to the output
                output.push(
                    `<div class="form-group row answers">
                    <div class="col-12">
                    <label for="Frage${questionNumber}" class="question"> ${currentQuestion.question} </label>
                    <input type="text" class="form-control" id="Frage${questionNumber}" name="Frage${questionNumber}" required>  </div></div>`
                );

            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults(){

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers > input');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach( (currentQuestion, questionNumber) => {

            // find selected answer
            const answerInput = answerContainers[questionNumber].value;

            // if answer is correct
            if(answerInput === currentQuestion.correctAnswer){
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
                answerContainers[questionNumber].style = ':valid';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "Was ist euer Ergebnis bei den M&Ms?",
            correctAnswer: "42"
        },
        {
            question: "Welche Botschaft sagt euch der Arduino?",
            correctAnswer: "NEUN"
        },
        {
            question: "Der Apfel fällt nicht weit vom Stamm...",
            correctAnswer: "42"
        }
    ];

    // Kick things off
    buildQuiz();

    // Event listeners
    submitButton.addEventListener('click', showResults);
})();