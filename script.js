let triviaData = null;

function fetchTrivia() {
  const apiUrl = `https://opentdb.com/api.php?amount=1&type=multiple`;

  document.getElementById('loadingMessage').style.display = 'block';
  document.getElementById('nextButton').style.display = 'none';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      triviaData = data.results[0];
      const question = triviaData.question;
      const options = triviaData.incorrect_answers.concat(triviaData.correct_answer);
      const correctAnswer = triviaData.correct_answer;

      const shuffledOptions = shuffleArray(options);

      document.getElementById('questionBox').innerHTML = question;
      const optionsHtml = shuffledOptions.map(option => ` 
        <div class="option" onclick="checkAnswer('${option}', '${correctAnswer}')">${option}</div>
      `).join('');
      document.getElementById('options').innerHTML = optionsHtml;

      document.getElementById('nextButton').innerText = 'Next Question';
      document.getElementById('nextButton').setAttribute('onclick', 'nextQuestion()');
      document.getElementById('nextButton').style.display = 'inline-block';

      document.getElementById('loadingMessage').style.display = 'none';
    })
    .catch(error => {
      console.error('Error fetching trivia:', error);
      document.getElementById('questionBox').innerHTML = 'Sorry, there was an error fetching trivia. Please try again.';
      document.getElementById('options').innerHTML = '';
      document.getElementById('loadingMessage').style.display = 'none';
      document.getElementById('nextButton').style.display = 'inline-block';
    });
}

function checkAnswer(selectedOption, correctAnswer) {
  const options = document.querySelectorAll('.option');
  
  options.forEach(option => {
    option.style.pointerEvents = 'none';
  });

  if (selectedOption === correctAnswer) {
    document.querySelectorAll('.option').forEach(option => {
      if (option.innerText === correctAnswer) {
        option.classList.add('correct');
      }
    });
  } else {
    document.querySelectorAll('.option').forEach(option => {
      if (option.innerText === correctAnswer) {
        option.classList.add('correct');
      }
      if (option.innerText === selectedOption) {
        option.classList.add('incorrect');
      }
    });
  }
}

function nextQuestion() {
  document.getElementById('nextButton').innerText = 'Get Trivia';
  document.getElementById('nextButton').setAttribute('onclick', 'fetchTrivia()');

  document.getElementById('questionBox').innerHTML = 'Click "Get Trivia" to start!';
  document.getElementById('options').innerHTML = '';
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}