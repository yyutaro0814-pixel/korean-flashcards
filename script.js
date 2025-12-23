let cards = [];
let current = 0;

fetch('words.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split('\n').slice(1);
    cards = rows.map(row => {
      const [korean, meaning, example] = row.split(',');
      return {korean, meaning, example};
    });
    showCard();
  });

function showCard() {
  if(cards.length === 0) return;
  document.getElementById('front').textContent = cards[current].korean;
  document.getElementById('back').textContent = cards[current].meaning;
  document.getElementById('back').style.display = 'none';
}

function flipCard() {
  const back = document.getElementById('back');
  back.style.display = back.style.display === 'none' ? 'block' : 'none';
}

function nextCard() {
  current = (current + 1) % cards.length;
  showCard();
}