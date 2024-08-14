import questions from "./perguntas.js";

const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // troca elementos
  }
}

function nextQuestion(e) {
  const isCorrect = e.target.getAttribute("data-correct") === "true";

  if (isCorrect) {
    e.target.classList.add("correct");
    questionsCorrect++;
  } else {
    e.target.classList.add("incorrect");

    // Destaca a resposta correta
    document.querySelectorAll(".answer").forEach((button) => {
      if (button.getAttribute("data-correct") === "true") {
        button.classList.add("correct");
      }
    });
  }

  // Aguarda um curto período antes de avançar para a próxima questão
  setTimeout(() => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      finish();
    }
  }, 2000); // Aguarda 2 segundos para que o usuário veja o feedback antes de prosseguir
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  // Adiciona a imagem entre a pergunta e as alternativas
  const img = document.createElement("img");
  img.src = item.img;
  img.alt = "Imagem da questão";
  img.style.width = "100%"; // Ajusta o tamanho da imagem, se necessário
  img.style.margin = "10px 0"; // Adiciona algum espaço entre a imagem e os textos

  // Adiciona a imagem ao DOM
  question.appendChild(img);

  // Embaralha as alternativas antes de exibi-las
  shuffle(item.answers);

  item.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.setAttribute("data-correct", answer.correct);
    button.textContent = answer.option;
    button.addEventListener("click", nextQuestion);
    answers.appendChild(button);
  });
}

loadQuestion();
