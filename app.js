const display = document.querySelector(".display");
const quizText = document.querySelector(".question");
const resetBtn = document.querySelector(".reset");
const nextBtn = document.querySelector(".next");
const counter = document.querySelector(".questionN");

const quizzes = [
  { question: "If you cook it, it becomes food; if you don't, it becomes a bird.", word: "Egg" },
  { question: "It has nothing, but gives to everyone.", word: "Light" },
  { question: "It has wings but cannot fly.", word: "Hat" },
];

let currentQuizIndex = 0;
let currentWord = [];

function updateCounter() {
  counter.innerText = `Question ${currentQuizIndex + 1} of ${quizzes.length}`;
}

function loadQuiz(index) {
  // Reset the display
  display.innerHTML = "";
  quizText.innerText = quizzes[index].question;
  currentWord = quizzes[index].word.toUpperCase().split("");

  currentWord.forEach(() => {
    const box = document.createElement("div");
    box.classList.add("box");
    display.appendChild(box);
  });

  updateCounter();
}

function resetQuiz() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.textContent = "";
    box.style.animation = "none";
  });
}

document.addEventListener("keydown", (event) => {
  const guessedLetter = event.key.toUpperCase();
  const boxes = document.querySelectorAll(".box");

  currentWord.forEach((letter, i) => {
    if (letter === guessedLetter) {
      boxes[i].style.animation = "flip 700ms ease-out";
      setTimeout(() => {
        boxes[i].textContent = letter;
      }, 500);
    }
  });
});

resetBtn.addEventListener("click", () => {
  resetQuiz();
});

nextBtn.addEventListener("click", () => {
  currentQuizIndex = (currentQuizIndex + 1) % quizzes.length; // Loop back to the first quiz
  loadQuiz(currentQuizIndex);
});

// Initial load
loadQuiz(currentQuizIndex);
