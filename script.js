const WORDS_PER_CHAPTER = 10;

let chapters = [];
let currentChapter = 0;
let currentIndex = 0;
let showJapanese = false;

const chapterScreen = document.getElementById("chapterScreen");
const cardScreen = document.getElementById("cardScreen");
const chapterGrid = document.getElementById("chapterGrid");
const wordBox = document.getElementById("wordBox");

/* ===== CSV 読み込み ===== */
fetch("words.csv")
  .then(res => res.text())
  .then(text => {
    parseCSV(text);
    initChapters();
  });

function parseCSV(text) {
  const lines = text.trim().split("\n").slice(1);
  const words = lines.map(line => {
    const [ko, ja] = line.split(",");
    return { ko, ja };
  });

  for (let i = 0; i < words.length; i += WORDS_PER_CHAPTER) {
    chapters.push(words.slice(i, i + WORDS_PER_CHAPTER));
  }
}

/* ===== チャプター ===== */
function initChapters() {
  chapterGrid.innerHTML = "";
  chapters.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.onclick = () => startChapter(i);
    chapterGrid.appendChild(btn);
  });
}

function startChapter(index) {
  currentChapter = index;
  currentIndex = 0;
  showJapanese = false;
  chapterScreen.classList.remove("active");
  cardScreen.classList.add("active");
  renderWord();
}

/* ===== フラッシュカード ===== */
function renderWord() {
  const word = chapters[currentChapter][currentIndex];
  wordBox.textContent = showJapanese ? word.ja : word.ko;
}

document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % chapters[currentChapter].length;
  showJapanese = false;
  renderWord();
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex =
    (currentIndex - 1 + chapters[currentChapter].length) %
    chapters[currentChapter].length;
  showJapanese = false;
  renderWord();
};

document.getElementById("toggleBtn").onclick = () => {
  showJapanese = !showJapanese;
  renderWord();
};

document.getElementById("backChapterBtn").onclick = () => {
  cardScreen.classList.remove("active");
  chapterScreen.classList.add("active");
};