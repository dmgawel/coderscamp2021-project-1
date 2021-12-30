import '../../styles/style.css';
import '../../styles/actors.css';
import '../../styles/quizResult.css';

const actorsData = [
  {
    question: 'What is the name of this actor?',
    a: '',
    b: 'Willem Dafoe ',
    c: '',
    d: '',
    correct: 'b',
    imgSource: '../assets/images/actors/Willem_Dafoe.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: '',
    b: '',
    c: 'Scarlett Johansson ',
    d: '',
    correct: 'c',
    imgSource: '../assets/images/actors/Scarlett_Johansson.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: '',
    b: '',
    c: 'Kelly Reilly ',
    d: '',
    correct: 'c',
    imgSource: '../assets/images/actors/Kelly_Reilly.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Andrew Garfield ',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    imgSource: '../assets/images/actors/Andrew_Garfield.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Angelina Jolie ',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    imgSource: '../assets/images/actors/Angelina_Jolie.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: '',
    b: '',
    c: 'Carrie-Anne Moss  ',
    d: '',
    correct: 'c',
    imgSource: '../assets/images/actors/Carrie-Anne_Moss.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: '',
    b: '',
    c: '',
    d: 'Tom Holland ',
    correct: 'd',
    imgSource: '../assets/images/actors/Tom_Holland.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Leonardo DiCaprio ',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    imgSource: '../assets/images/actors/Leonardo_DiCaprio.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: '',
    b: '',
    c: 'Keanu Reeves ',
    d: '',
    correct: 'c',
    imgSource: '../assets/images/actors/Keanu_Reeves.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: '',
    b: '',
    c: '',
    d: 'Jason Statham ',
    correct: 'd',
    imgSource: '../assets/images/actors/Jason_Statham.jpg',
  },
  {
    question: 'What is the name of this actor?',
    a: 'Jennifer Landon ',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    imgSource: '../assets/images/actors/Jennifer_Landon.jpg',
  },
];

// Fetch data from movieDB
let wrongAnswers = [];

async function getDataFromDb(pageNumber) {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=e0add4835a4a4c34f08aeb4c32425f01&language=en-US&page=${pageNumber}`
  );
  const data = await response.json();
  return data;
}

// Getting info from API for movie names
async function loadWrongActorNames() {
  // Making 8 different calls to API because single one contains only 20 movie names
  for (let i = 1; i <= 8; i++) {
    // Making sure that every API call returns data, otherwise showing error image and message
    const data = await getDataFromDb(i).catch((e) => {
      questionElement.innerHTML = 'Sorry, our database could not be reached, refresh the page and try another quiz :)';
      frameImg.src = './src/Actors/error.jpeg';
      answerElements.forEach((element) => {
        console.log(element);
        element.style.display = 'none';
      });
      return e;
    });
    // Filtering array to have movies only in English
    let wrongAnswersFromThisLoop = data.results.map((arr) => {
      return arr.name;
    });

    // Getting rid of all non-English deleted movies turned to "undefined"
    wrongAnswersFromThisLoop = wrongAnswersFromThisLoop.filter((x) => x !== undefined);

    // Adding current API call to overall wrongAnswers array
    wrongAnswers = wrongAnswers.concat(wrongAnswersFromThisLoop);
  }

  // Randomizing wrong answers order
  wrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5);

  // Function returns array with invalid movie names
  return wrongAnswers;
}
loadWrongActorNames().catch((e) => {
  `We were not able to load this quiz for You because of error: ${e}`;
  throw new Error('Error outside of the function!' + e);
});
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
  // Making a, b, c, d options display as the correct answer or random wrong answer + making sure that displayed names are not repeating
  a_text.innerHTML = currentQuizData.a || wrongAnswers[Math.floor(Math.random() * 91)];
  do {
    b_text.innerHTML = currentQuizData.b || wrongAnswers[Math.floor(Math.random() * 91)];
  } while (b_text.innerHTML === a_text.innerHTML);
  do {
    c_text.innerHTML = currentQuizData.c || wrongAnswers[Math.floor(Math.random() * 91)];
  } while (c_text.innerHTML === a_text.innerHTML || c_text.innerHTML === b_text.innerHTML);
  do {
    d_text.innerHTML = currentQuizData.d || wrongAnswers[Math.floor(Math.random() * 91)];
  } while (
    d_text.innerHTML === a_text.innerHTML ||
    d_text.innerHTML === b_text.innerHTML ||
    d_text.innerHTML === c_text.innerHTML
  );
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
      quiz.innerHTML = `<div class="container-end">
      <div class="table-score">
      <div>
      <h1>Your final score is: ${score} / ${actorsData.length}</h1>
          <div class="buttons-container-end">
          <button onClick="location.reload()">Reload</button>;
              <h2>Share your score:</h2>
              <div class="share-btn-container">
                <a href="#" target="_blank" class="facebook-btn">
                  <i class="fab fa-facebook"></i>
                </a>
                <a href="#" target="_blank" class="twitter-btn">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
          </div>
      </div>
   </div>`;

      function init() {
        const facebookBtn = document.querySelector('.facebook-btn');
        const twitterBtn = document.querySelector('.twitter-btn');

        const postUrl = encodeURI(document.location.href);
        const postTitle = encodeURI(
          `Hello everyone! I have scored ${score}/${actorsData.length} points! Check out this quiz: `
        );

        facebookBtn.setAttribute('href', `https://www.facebook.com/sharer.php?u=${postUrl}`);

        twitterBtn.setAttribute('href', `https://twitter.com/share?url=${postUrl}&text=${postTitle}`);
      }

      init();
    }
  }
});
