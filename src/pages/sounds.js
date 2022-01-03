import '../../styles/style.css';
import '../../styles/soundtracksStyling.css';
import '../../styles/quizResult.css';

const counter = (() =>{
  let timerId;
  const counterContainer = document.getElementById("counter-container");
  const counterImgData = [
    '../assets/images/soundtracks/7.png',
    '../assets/images/soundtracks/6.png',
    '../assets/images/soundtracks/5.png',
    '../assets/images/soundtracks/4.png',
    '../assets/images/soundtracks/3.png',
    '../assets/images/soundtracks/2.png',
    '../assets/images/soundtracks/1.png',
  ];
  let startCount = 0;
  const next = () => {
    if(startCount < counterImgData.length - 1){
      startCount ++;
    } else {
      nextQuestion();
      startCount = 0;
      clearInterval(timerId);
    }
    counterContainer.src=counterImgData[startCount];
  }
  const start = () => {
    timerId = setInterval(next, 1000);
  }
  const stop = () => {
    startCount = 0;
    clearInterval(timerId);
    counterContainer.src=counterImgData[startCount];
  }
  return {
  start, stop
  }
})();
  
const soundsData = [
  {
    question: 'Do You know what movie is this music from?',
    a: 'Frozen',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    soundSource: '../assets/sounds/frozen.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: '',
    b: '',
    c: 'Batman',
    d: '',
    correct: 'c',
    soundSource: '../assets/sounds/batman1989.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: '',
    b: 'Turning Forty',
    c: '',
    d: '',
    correct: 'b',
    soundSource: '../assets/sounds/czterdziestolatek.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: '',
    b: 'Edward Scissorhands',
    c: '',
    d: '',
    correct: 'b',
    soundSource: '../assets/sounds/edwardScissorhands.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: '',
    b: '',
    c: '',
    d: 'Hannibal',
    correct: 'd',
    soundSource: '../assets/sounds/hannibal.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: 'Home Alone',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    soundSource: '../assets/sounds/homeAlone.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: "The Queen's Gambit",
    b: '',
    c: '',
    d: '',
    correct: 'a',
    soundSource: '../assets/sounds/queensGambit.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: '',
    b: '',
    c: '',
    d: 'The Mission',
    correct: 'd',
    soundSource: '../assets/sounds/mission.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: '',
    b: '',
    c: '',
    d: 'Master Thaddeus: The Last Foray in Lithuania',
    correct: 'd',
    soundSource: '../assets/sounds/panTadeusz.mp3',
  },
  {
    question: 'Do You know what movie is this music from?',
    a: '',
    b: '',
    c: 'Our Folks',
    d: '',
    correct: 'c',
    soundSource: '../assets/sounds/samiSwoi.mp3',
  },
];
  
// Array that will store invalid soundtrack answers
let wrongAnswers = [];

async function getDataFromDb(pageNumber) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=e0add4835a4a4c34f08aeb4c32425f01&language=en-US&page=${pageNumber}`
  );
  const data = await response.json();
  return data;
};
  
const quiz = document.getElementById('quiz');
const soundItem = document.getElementById('sound');
const questionElement = document.getElementById('question');
const answerElements = document.querySelectorAll('.answer');
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const playBtn = document.getElementById("soundtrackplay");
const submitBtn = document.getElementById('submit');
const ul = document.querySelector('.answers');

// Randomizing order of questions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(soundsData);

let currentQuestion = 0;
let score = 0;

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

  // Function returns array with invalid movie titles
  return wrongAnswers;
};

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
};

let delayId;
  
playBtn.addEventListener("click", function() {
  soundItem.play();
  delayId = setTimeout(counter.start, 10000);
});

function loadQuiz() {
  deselectInputs();
 
  const currentQuizData = soundsData[currentQuestion];

  // Adding source to paste on the page
  soundItem.src = currentQuizData.soundSource;
  questionElement.innerHTML = currentQuizData.question;

  // Making a, b, c, d options display as the correct answer or random wrong answer + making sure that displayed names are not repeating
  a_text.innerHTML = currentQuizData.a || wrongAnswers[Math.floor(Math.random() * 91)];
  do {
    b_text.innerHTML = currentQuizData.b || wrongAnswers[Math.floor(Math.random() * 91)];
  } while (b_text.innerHTML === a_text.innerHTML);
  do {
    c_text.innerHTML = currentQuizData.c || wrongAnswers[Math.floor(Math.random() * 91)];
  } while (c_text.innerHTML === a_text.innerHTML ||
      c_text.innerHTML === b_text.innerHTML);
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
};
  
window.setTimeout(loadQuiz, 150);

  function selectAnswer() {
    let answer = undefined;
  
    answerElements.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });
    return answer;
  };
  
function deselectInputs() {
  answerElements.forEach((answerEl) => {
    answerEl.checked = false;
  });
};
  
const submitFunction = () => {
  const answer = selectAnswer();
  if (answer) {
    if (answer === soundsData[currentQuestion].correct) {
      score++;
    }
  nextQuestion();
  }
}
  
function nextQuestion(){
  currentQuestion++;
 
  soundItem.pause();
  counter.stop();
  clearTimeout(delayId);
  
  if (currentQuestion < soundsData.length) {
    loadQuiz();
  } else {
    quiz.innerHTML = `<h2>Your final score is: ${score} / ${soundsData.length}</h2><button onClick="location.reload()">Reload</button>`;
  }
}
  
submitBtn.addEventListener('click', submitFunction);