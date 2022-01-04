/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */

import '../styles/style.css';
import '../styles/actors.css';
import '../styles/quizResult.css';
import '../styles/movieFrameStyling.css';

import { actorsData } from './pages/actors';
import { movieFramesData } from './pages/frames';

// Hamburger navigation
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navigation-list');
  const navLinks = document.querySelectorAll('.navigation-list li');

  burger.addEventListener('click', () => {
    //Toggle Nav
    nav.classList.toggle('navigation-list-active');

    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });
    //Burger Animation
    burger.classList.toggle('toggle');
  });
};

navSlide();

const root = document.getElementById('root');
const currentQuiz = {
  result: 0,
  type: '',
};

// document.querySelectorAll('.js-quiz-target').forEach((el) => {
//   el.addEventListener('click', () => {
//     console.log(el.dataset.target);

//     const template = document.getElementById('quizTemplate');
//     const quiz = template.content.cloneNode(true);

//     quiz.getElementById('title').textContent = el.dataset.target;

//     // root.innerHTML = '';
//     // root.appendChild(quiz);
//   });
// });

let currentQuestion = 0;
let score = 0;

const actorsClick = document.querySelector('.actors-click');
let currentQuestionsList;
actorsClick.addEventListener('click', () => {
  console.log('clicked on button');
  currentQuestionsList = actorsData;
  loadQuiz();
});

const framesClick = document.querySelector('.frames-click');
framesClick.addEventListener('click', () => {
  console.log('clicked on button');
  currentQuestionsList = movieFramesData;
  loadQuiz();
});

// Array that will store invalid movie frame answers
let wrongAnswers = [];

async function getDataFromDb(pageNumber) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=e0add4835a4a4c34f08aeb4c32425f01&language=en-US&page=${pageNumber}`
  );
  const data = await response.json();
  return data;
}

const quiz = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerElements = document.querySelectorAll('.answer');
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const submitBtn = document.getElementById('submit');

const ul = document.querySelector('.answers');

// Choosing movie frame box and appending the photo to it
const movieFrameBox = document.querySelector('.movieFrameBox');
const frameImg = document.createElement('img');
movieFrameBox.append(frameImg);

// Randomizing order of questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(currentQuestionsList);

// Getting info from API for movie names
async function loadWrongMovieNames() {
  // Making 8 different calls to API because single one contains only 20 movie names
  for (let i = 1; i <= 8; i++) {
    // Making sure that every API call returns data, otherwise showing error image and message
    // eslint-disable-next-line no-await-in-loop
    const data = await getDataFromDb(i).catch((e) => {
      questionElement.innerHTML = 'Sorry, our database could not be reached, refresh the page and try another quiz :)';
      frameImg.src = './src/movieFrames/error.jpeg';
      answerElements.forEach((answerElement) => {
        // eslint-disable-next-line no-param-reassign
        answerElement.style.display = 'none';
      });
      return e;
    });
    // Filtering array so it contains only movies in English
    let wrongAnswersFromThisLoop = data.results.map((arr) => {
      if (arr.original_language === 'en') {
        return arr.original_title;
      }
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
loadWrongMovieNames().catch((e) => {
  // eslint-disable-next-line no-unused-expressions
  `We were not able to load this quiz for You because of error: ${e}`;
  throw new Error(`Error outside of the function! ${e}`);
});

function deselectInputs() {
  answerElements.forEach((answerEl) => {
    // eslint-disable-next-line no-param-reassign
    answerEl.checked = false;
  });
}

function loadQuiz() {
  // timer();
  deselectInputs();

  const currentQuizData = currentQuestionsList[currentQuestion];

  // Adding source to image on the page
  frameImg.src = currentQuizData.imgSource;
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
  // Randomizing order of ABCD answers
  for (let i = ul.children.length; i >= 0; i--) {
    // eslint-disable-next-line no-bitwise
    ul.appendChild(ul.children[(Math.random() * i) | 0]);
  }
}

// Loading quiz with a little delay, so the API with movie names can be fetched. <-- we can later berak this js file to smaller pieces and load the array at startup of the whole web app
window.setTimeout(loadQuiz, 150);

function selectAnswer() {
  let answer;

  answerElements.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function nextQuestionHandler() {
  const answer = selectAnswer();

  if (answer === currentQuestionsList[currentQuestion].correct) {
    // eslint-disable-next-line no-plusplus
    score++;
  }

  // eslint-disable-next-line no-plusplus
  currentQuestion++;

  if (currentQuestion < currentQuestionsList.length) {
    loadQuiz();
  } else {
    clearInterval(interval);
    quiz.innerHTML = `<div class="container-end">
      <div class="table-score">
      <div>
      <h1>Your final score is: ${score} / ${currentQuestionsList.length}</h1> 
          <div class="buttons-container-end">
              <button><a href="../index.html" class="btn">Go Home</a></button>
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

      let postUrl = encodeURI(document.location.href);
      let postTitle = encodeURI(
        `Hello everyone! I have scored ${score}/${currentQuestionsList.length} points! Check out this quiz: `
      );

      facebookBtn.setAttribute('href', `https://www.facebook.com/sharer.php?u=${postUrl}`);

      twitterBtn.setAttribute('href', `https://twitter.com/share?url=${postUrl}&text=${postTitle}`);
    }

    init();
  }
}

submitBtn.addEventListener('click', nextQuestionHandler);

/*
  TIMER
*/
// 7 images of film plates
const TIMER_START_VALUE = 10;
let counter = TIMER_START_VALUE;

// variable for clearing setInterval()
let interval;

// function timer() {
//   if (interval) {
//     counter = TIMER_START_VALUE;
//     clearInterval(interval);
//     changeTimerImage();
//     interval = setInterval(changeTimerImage, 1000);
//   } else {
//     changeTimerImage();
//     interval = setInterval(changeTimerImage, 1000);
//   }
// }

// function changeTimerImage() {
//   let imageSrc = document.getElementById('timer-image').src;
//   // const index = imageSrc.lastIndexOf('.png');
//   const index = imageSrc.lastIndexOf('.png');

//   if (counter >= 0) {
//     // replacing the number in the image "src" string
//     let imageSrcText = window.location.origin + '/assets/timer/' + counter + '.png';

//     // replacing image "src" attribute with a new value
//     document.getElementById('timer-image').src = imageSrcText;

//     counter--;

//     if (counter) {
//       submitBtn.removeAttribute('disabled');
//     } else {
//       submitBtn.setAttribute('disabled', 'disabled');
//     }
//   } else {
//     clearInterval(interval);
//     nextQuestionHandler();
//   }
// }
