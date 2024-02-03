const quizData = [
    {
        question: "5+5*5=? Javobi nechchi?",
        options: ["A. 50", "B. 40", "C. 30", "D. 55"],
        correctAnswer: "C. 30"
    },
    {
        question: "Nimani uchuni va boshini topib bolmaydi?",
        options: ["A. Boyezni", "B. Ilonni", "C. Aylanani", "D. Kesmani"],
        correctAnswer: "C. Aylanani"
    },
    {
        question: "Uzbekistan poytaxti qayer?",
        options: ["A. Toshkent", "B. Spanish", "C. French", "D. German"],
        correctAnswer: "A. Toshkent"
    },
    {
        question: "Ot va Filni Kotara oladigan odam kim?",
        options: ["A. Superman","B. Shahmatchi", "C. Batman", "D. Aquaman"],
        correctAnswer: "B. Shahmatchi"
    },
    {
        question: "Uzbek alifbosida nechta Harf bor?",
        options: ["A. 20", "B. 22", "C. 19", "D. 29"],
        correctAnswer: "D. 29"
    },
    {
        question: "Onangdi o'g'lini Otasi senga kim boladi?",
        options: ["A. Ota", "B. Tog'a", "C. Hechkim", "D. Amaki"],
        correctAnswer: "A. Ota"
    },
    {
        question: "It Ingliz tilida qanday aytiladi?",
        options: ["A. Cat", "B. Zebra", "C. Monkay", "D. Dog"],
        correctAnswer: "D. Dog"
    },
    // Add more questions as needed
];



const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const darkModeToggle = document.getElementById("dark-mode-toggle");

let currentQuestion = 0;
let score = 0;
let timeRemaining = 10;
let timer;

function loadQuestion() {
    timeRemaining = 10;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    const currentQuizData = quizData[currentQuestion];

    questionElement.innerText = currentQuizData.question;
    optionsContainer.innerHTML = "";

    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.innerText = option;
        optionElement.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(optionElement);
    });
}

function updateTimer() {
    timeRemaining--;
    document.getElementById("timeRemaining").innerText = timeRemaining; // Update the displayed time
    if (timeRemaining < 0) {
        clearInterval(timer);
        checkAnswer();
    }
}

function checkAnswer(answer) {
    const currentQuizData = quizData[currentQuestion];

    const selectedOption = optionsContainer.querySelector(".selected");
    if (selectedOption) {
        selectedOption.classList.remove("selected");
    }

    if (answer === currentQuizData.correctAnswer) {
        score++;
        optionsContainer.innerHTML = '<p class="correct-answer">Correct!</p>';
    } else {
        optionsContainer.innerHTML = '<p class="wrong-answer">Wrong! Correct Answer: ' + currentQuizData.correctAnswer + '</p>';
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        setTimeout(() => {
            loadQuestion();
        }, 2000);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    resultContainer.style.display = "block";
    scoreElement.innerText = score + " out of " + quizData.length;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("quiz-container").classList.toggle("dark-mode");
}

loadQuestion();

submitButton.addEventListener("click", loadQuestion);

darkModeToggle.addEventListener("click", toggleDarkMode);

// Additional code to highlight selected option
optionsContainer.addEventListener("click", (event) => {
    const selectedOption = event.target;
    if (selectedOption.classList.contains("option") && !selectedOption.classList.contains("selected")) {
        selectedOption.classList.add("selected");
    }
});
