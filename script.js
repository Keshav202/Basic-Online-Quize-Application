// Basic quiz logic (starter). You can expand questions or move them to questions.js
const questions = [
  {
    question: "Which of the following is NOT a programming language?",
    options: ["Java", "Python", "HTML", "C++"],
    answer: "HTML"
  },
  {
    question: "Time complexity of binary search in a sorted array is?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: "O(log n)"
  },
  {
    question: "Which keyword is used to define a class in Java?",
    options: ["function", "def", "class", "struct"],
    answer: "class"
  },
  {
    question: "Which data structure works on FIFO principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue"
  },
  {
    question: "Which SQL command is used to remove a table from database?",
    options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
    answer: "DROP"
  },
  {
    question: "Which tag is used to link an external CSS file in HTML?",
    options: ["<style>", "<script>", "<link>", "<css>"],
    answer: "<link>"
  },
  {
    question: "Which of the following is NOT a feature of OOP?",
    options: ["Encapsulation", "Polymorphism", "Inheritance", "Compilation"],
    answer: "Compilation"
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["React", "Django", "Spring", "Laravel"],
    answer: "React"
  },
  {
    question: "Which operator is used to allocate dynamic memory in C++?",
    options: ["alloc", "malloc", "new", "create"],
    answer: "new"
  },
  {
    question: "Which of these sorting algorithms has the best average case time complexity?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
    answer: "Merge Sort"
  }
];


const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const progressEl = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
const resultCard = document.getElementById('result');
const quizCard = document.getElementById('quiz');
const scoreText = document.getElementById('scoreText');
const retryBtn = document.getElementById('retryBtn');

let currentIndex = 0;
let score = 0;
let selectedOption = null;

function init() {
  currentIndex = 0;
  score = 0;
  selectedOption = null;
  resultCard.classList.add('hidden');
  quizCard.classList.remove('hidden');
  nextBtn.disabled = true;
  renderQuestion();
  updateProgress();
}

function renderQuestion(){
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.type = 'button';
    btn.textContent = opt;
    btn.setAttribute('data-value', opt);
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', onOptionClick);
    optionsEl.appendChild(btn);
  });
}

function onOptionClick(e){
  // clear previous selection styling
  Array.from(optionsEl.children).forEach(b=>{
    b.setAttribute('aria-pressed','false');
    b.style.borderColor = '#e6e9f8';
    b.style.background = 'transparent';
  });

  const btn = e.currentTarget;
  selectedOption = btn.getAttribute('data-value');
  btn.setAttribute('aria-pressed','true');
  btn.style.borderColor = '#c7b3ff';
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', ()=>{
  // Evaluate selected option
  if (selectedOption === null) return;
  const correct = questions[currentIndex].answer;
  if (selectedOption === correct) score++;

  // Move to next
  currentIndex++;
  selectedOption = null;
  nextBtn.disabled = true;

  if (currentIndex >= questions.length) {
    showResult();
  } else {
    renderQuestion();
    updateProgress();
  }
});

function updateProgress(){
  const pct = Math.round((currentIndex / questions.length) * 100);
  progressEl.style.width = pct + '%';
  progressText.textContent = `${currentIndex} / ${questions.length}`;
}

function showResult(){
  quizCard.classList.add('hidden');
  resultCard.classList.remove('hidden');
  scoreText.textContent = `${score} / ${questions.length} correct`;
  progressEl.style.width = '100%';
  progressText.textContent = `${questions.length} / ${questions.length}`;
}

retryBtn.addEventListener('click', init);

// start
init();
