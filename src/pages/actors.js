import '../../styles/style.css';
import '../../styles/actors.css';
import '../../styles/quizResult.css';

const actorsData = [
  {
    question: 'What is the name of this actor?',
    a: 'Tom Dillon',
    b: 'Willem Dafoe ',
    c: 'Arron Something',
    d: 'Brad Pitt',
    correct: 'b',
    imgSource: '../assets/images/actors/Willem_Dafoe.jpg',
  },
  {
    question: 'What is the name of this actress?',
    a: 'Zendaya',
    b: 'Eiza Gonzales',
    c: 'Scarlett Johansson ',
    d: 'Katherina Zeta-Jones',
    correct: 'c',
    imgSource: '../assets/images/actors/Scarlett_Johansson.jpg',
  },
  {
    question: 'What is the name of this actress?',
    a: 'Ashley Brooke',
    b: 'Tina Fare',
    c: 'Kelly Reilly ',
    d: 'Winona Ryder',
    correct: 'c',
    imgSource: '../assets/images/actors/Kelly_Reilly.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Andrew Garfield ',
    b: 'Tobey McGuire',
    c: 'Charlie Sheen',
    d: 'John Void',
    correct: 'a',
    imgSource: '../assets/images/actors/Andrew_Garfield.jpg',
  },
  {
    question: 'What is the name of this actress?',
    a: 'Angelina Jolie ',
    b: 'Gwyneth Pathrow',
    c: 'Zoe Saldana',
    d: 'Monica Belluca',
    correct: 'a',
    imgSource: '../assets/images/actors/Angelina_Jolie.jpg',
  },
  {
    question: 'What is the name of this actress?',
    a: 'Viola Davis',
    b: 'Meryl Streep',
    c: 'Carrie-Anne Moss  ',
    d: 'Charlize Theron',
    correct: 'c',
    imgSource: '../assets/images/actors/Carrie-Anne_Moss.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Denzel Washington',
    b: 'Tom Hanks',
    c: 'Tom Cruise',
    d: 'Tom Holland ',
    correct: 'd',
    imgSource: '../assets/images/actors/Tom_Holland.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Leonardo DiCaprio ',
    b: 'Robert De Niro',
    c: 'Christian Bale',
    d: 'Liam Neeson',
    correct: 'a',
    imgSource: '../assets/images/actors/Leonardo_DiCaprio.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Morgan Freeman',
    b: 'Al Pacino',
    c: 'Keanu Reeves ',
    d: 'Clint Eastwood',
    correct: 'c',
    imgSource: '../assets/images/actors/Keanu_Reeves.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Johnny Depp',
    b: 'Anthony Hopkins',
    c: 'Brad Pitt',
    d: 'Jason Statham ',
    correct: 'd',
    imgSource: '../assets/images/actors/Jason_Statham.jpg',
  },
  {
    question: 'What is the name of this actress?',
    a: 'Jennifer Landon ',
    b: 'Nicole Kidman',
    c: 'Cate Blanchett',
    d: 'Sandra Bullock',
    correct: 'a',
    imgSource: '../assets/images/actors/Jennifer_Landon.jpg',
  },
];

// QUIZ Logics & Grab all the elements

const quiz = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerElements = document.querySelectorAll('.answer');
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const submitBtn = document.getElementById('submit');

const actorImgContainer = document.querySelector('.actor-image');
const actorImg = document.createElement('img');
actorImgContainer.append(actorImg);

let shuffleQuiz = actorsData.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let score = 0;

// Loading quiz with a little delay, so the API with movie names can be fetched.
window.setTimeout(loadQuiz, 150);

function loadQuiz() {
  deselectInputs();

  const currentQuizData = actorsData[currentQuestion];

  actorImg.src = currentQuizData.imgSource;
  questionElement.innerHTML = currentQuizData.question;
  questionElement.innerHTML = currentQuizData.question;
  a_text.innerHTML = currentQuizData.a;
  b_text.innerHTML = currentQuizData.b;
  c_text.innerHTML = currentQuizData.c;
  d_text.innerHTML = currentQuizData.d;
}

function selectAnswer() {
  let answer = undefined;

  answerElements.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectInputs() {
  answerElements.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener('click', () => {
  const answer = selectAnswer();

  if (answer) {
    if (answer === actorsData[currentQuestion].correct) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < actorsData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2> Your final score is ${score}/${actorsData.length}</h2> <button onClick="location.reload()">Reload</button>`;
    }
  }
});