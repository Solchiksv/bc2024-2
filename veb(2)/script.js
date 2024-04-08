const testData = {
  testName: "Тест з WEB дизайну",
  questions: [
    {
      question: "Яке ключове слово використовується в JavaScript для визначення змінних, які не можуть змінюватися?",
      answers: [
        {
          answer: "let",
          isCorrect: false
        },
        {
          answer: "const",
          isCorrect: true
        },
        {
          answer: "var",
          isCorrect: false
        },
        {
          answer: "static",
          isCorrect: false
        }
      ]
    },
    {
      question: "Який CSS властивість використовується для задання коліру тексту?",
      answers: [
        {
          answer: "background-color",
          isCorrect: false
        },
        {
          answer: "color",
          isCorrect: true
        },
        {
          answer: "font-color",
          isCorrect: false
        },
        {
          answer: "text-color",
          isCorrect: false
        }
      ]
    },
    {
      question: "Що робить команда git checkout -b?",
      answers: [
        {
          answer: "Створює нову гілку і переходить на неї",
          isCorrect: true
        },
        {
          answer: "Переходить на існуючу гілку",
          isCorrect: false
        },
        {
          answer: "Перевіряє статус репозиторію",
          isCorrect: false
        },
        {
          answer: "Змінює гілку і створює нову",
          isCorrect: false
        }
      ]
    },
    {
      question: "Що таке HTML?",
      answers: [
        {
          answer: "Hypertext Markup Language",
          isCorrect: true
        },
        {
          answer: "Hyper Tool Multi Language",
          isCorrect: false
        },
        {
          answer: "High Text Multi Language",
          isCorrect: false
        },
        {
          answer: "Hypertext Multi Language",
          isCorrect: false
        }
      ]
    },
    {
      question: "Що таке CSS?",
      answers: [
        {
          answer: "Cascading Style Sheets",
          isCorrect: true
        },
        {
          answer: "Computer Style Sheets",
          isCorrect: false
        },
        {
          answer: "Creative Style Sheets",
          isCorrect: false
        },
        {
          answer: "Cascading Script Sheets",
          isCorrect: false
        }
      ]
    }
  ]
};

const testContainer = document.getElementById('test-container');
const resultContainer = document.getElementById('result-container');
const scoreContainer = document.getElementById('score-container');
let score = 0;

// Функція для відображення питань та варіантів відповідей
function displayQuestions() {
  testData.questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

    question.answers.forEach((answer, answerIndex) => {
      const answerElement = document.createElement('div');
      answerElement.classList.add('answer');
      answerElement.innerHTML = `<input type="radio" id="answer${index}${answerIndex}" name="question${index}" value="${answer.isCorrect}">
                                  <label for="answer${index}${answerIndex}">${answer.answer}</label>`;
      questionElement.appendChild(answerElement);
    });

    testContainer.appendChild(questionElement);
  });
}

// Функція для перевірки результатів
function submitTest() {
  const answerElements = document.querySelectorAll('.answer input:checked');

  answerElements.forEach(element => {
    const questionIndex = parseInt(element.name.replace('question', ''));
    const answerIndex = parseInt(element.id.replace(`answer${questionIndex}`, ''));
    const question = testData.questions[questionIndex];
    const correctAnswer = question.answers.findIndex(answer => answer.isCorrect);

    if (element.value === 'true') {
      score++;
    } else {
      const correctAnswerLabel = document.createElement('span');
      correctAnswerLabel.classList.add('correct-answer');
      correctAnswerLabel.textContent = ` Правильна відповідь: ${question.answers[correctAnswer].answer}`;
      element.parentNode.parentNode.appendChild(correctAnswerLabel);
    }
  });

  // Показ результату
  const totalQuestions = testData.questions.length;
  const message = `Ваш результат: ${score} / ${totalQuestions}`;
  resultContainer.textContent = message;

  // Показ загального результату
  if (score === totalQuestions) {
    scoreContainer.textContent = "Ви відповіли правильно на всі питання!";
  } else {
    scoreContainer.textContent = ""; 
  }

  // Сховати кнопку після перевірки
  document.getElementById('submit-button').style.display = 'none';
}
displayQuestions();
document.getElementById('submit-button').addEventListener('click', submitTest);
