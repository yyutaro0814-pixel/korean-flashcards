let words = [];
let chapters = [];
let currentChapter = [];
let index = 0;
let showJP = false;

const wordDiv = document.getElementById("word");
const chaptersDiv = document.getElementById("chapters");
const chapterSelect = document.getElementById("chapterSelect");
const card = document.getElementById("card");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toggleBtn = document.getElementById("toggleBtn");
const backBtn = document.getElementById("backBtn");

fetch("words.csv")
  .then(r => r.text())
  .then(text => {
    words = text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line)
      .map(line => line.split(","));

    chapters = [];
    for (let i = 0; i < words.length; i += 10) {
      chapters.push(words.slice(i, i + 10));
    }
    renderChapters();
  });

function renderChapters() {
  chaptersDiv.innerHTML = "";
  chapters.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = "chapter-btn";
    btn.onclick = () => startChapter(i);
    chaptersDiv.appendChild(btn);
  });
}

function startChapter(i) {
  currentChapter = chapters[i];
  index = 0;
  showJP = false;
  chapterSelect.style.display = "none";
  card.style.display = "block";
  renderWord();
}

function renderWord() {
  if (!currentChapter.length) return;
  wordDiv.textContent = showJP
    ? currentChapter[index][1]
    : currentChapter[index][0];
}

prevBtn.onclick = () => {
  index = (index - 1 + currentChapter.length) % currentChapter.length;
  showJP = false;
  renderWord();
};

nextBtn.onclick = () => {
  index = (index + 1) % currentChapter.length;
  showJP = false;
  renderWord();
};

toggleBtn.onclick = () => {
  showJP = !showJP;
  renderWord();
};

backBtn.onclick = () => {
  card.style.display = "none";
  chapterSelect.style.display = "block";
};