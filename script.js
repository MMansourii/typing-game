const settingBtn = document.getElementById('settings-btn'),
        settings = document.getElementById('settings'),
        settingForm = document.getElementById('setting-form'),
        difficultySelect = document.getElementById('difficulty'),
        word = document.getElementById('word'),
        text = document.getElementById('text'),
        timeEl = document.getElementById('time'),
        scoreEl = document.getElementById('score'),
        endGameEl = document.getElementById('end-game-container');

        // List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];
  //init random
  let randomWord ;
  
  //init score
  let score = 0;

  //init time 
  let time = 10 ;

  //focus the pointer at the text
  text.focus();

  //init difficulty 
  let difficulty =localStorage.getItem('difficulty') !== null ?
  localStorage.getItem('difficulty') : 
  'medium' ;

  //set difficulty to dom 
  difficultySelect.value = difficulty;

  //set the time fortime element
  const timeInterval = setInterval(updateTime , 1000);

  //get word from array
  function getRandomWord(){
      return words[Math.floor(Math.random() * words.length)];
  }
//add word to dom
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

//func for updating the score element
function updateScore(){
    score++;
    scoreEl.innerHTML= score;
}
//start to countdown time 
function updateTime(){
    time--;
    timeEl.innerHTML= time +'s';
    if(time <= 0){
        clearInterval(timeInterval);
        endGame();
    }
}
//display th emassage for losing
function endGame(){
    endGameEl.innerHTML = `<h1> Time Ran Out</h1>
    <p>You Final Score ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endGameEl.style.display = 'flex';
}
addWordToDOM();

//get the inserted word
text.addEventListener('input' , event =>{
    const insertedWord = event.target.value ;
     if(insertedWord === randomWord){
         addWordToDOM();
         updateScore();

         //clear the input
         event.target.value = '';

         if(difficulty === 'hard'){
             time+=2;
         }else if(difficulty === 'easy'){
             time+=5;
         }else{
             time+=3;
         }
         updateTime();
     }
});

//settings button click
settingBtn.addEventListener('click',()=>{
    settings.classList.toggle('hide');
});

//event listebr on select and store data to local storage
difficultySelect.addEventListener('change', event =>{
    difficulty = event.target.value ;
   localStorage.setItem('difficulty' , difficulty);
});