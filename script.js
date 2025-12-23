let allCards = [];
let currentCards = [];
let current = 0;

// CSV読み込み
fetch('words.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split('\n').slice(1);
    allCards = rows.map(row => {
      const [korean, meaning] = row.split(',');
      return {korean, meaning};
    });
    createChapters();
  });

// チャプター作成（10単語ずつ）
function createChapters() {
  const chaptersDiv = document.getElementById('chapters');
  const chapterCount = Math.ceil(allCards.length / 10);
  for(let i=0; i<chapterCount; i++){
    const btn = document.createElement('button');
    btn.textContent = `チャプター ${i+1}`;
    btn.onclick = () => startChapter(i);
    chaptersDiv.appendChild(btn);
  }
}

// チャプター開始
function startChapter(index){
  const start = index*10;
  const end = Math.min(start+10, allCards.length);
  currentCards = allCards.slice(start, end);
  current = 0;

  document.getElementById('chapter-selection').style.display = 'none';
  document.getElementById('flashcard-container').style.display = 'block';
  showCard();
}

// カード表示
function showCard(){
  const card = currentCards[current];
  const front = document.getElementById('front');
  const back = document.getElementById('back');

  front.textContent = card.korean;
  back.textContent = card.meaning;
  back.style.display = 'none';
}

// 韓国語タップで読み上げ
document.getElementById('front').addEventListener('click', () => {
  const card = currentCards[current];
  const utterance = new SpeechSynthesisUtterance(card.korean);
  utterance.lang = 'ko-KR';
  speechSynthesis.speak(utterance);
});

// 次のカード（日本語表示）
function nextCard(){
  const back = document.getElementById('back');
  if(back.style.display === 'none'){
    back.style.display = 'block';
  } else {
    current = (current + 1) % currentCards.length;
    showCard();
  }
}