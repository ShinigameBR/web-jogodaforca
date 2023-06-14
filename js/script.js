let wordField = document.querySelector(".word");
let hintField = document.querySelector(".hint").querySelector("span");
let attemptsField = document.querySelector(".attempts").querySelector("span");
let letterInput = document.getElementById("letter");
let word;
let wordArray;
let guessArray;
let attempts;

const initGame = () => {
  word = words[Math.floor(Math.random() * words.length)]; // Pegando um objeto da lista de palavras
  wordArray = Array.from(word.palavra); // Transforma a palavra em um array de letras
  guessArray = Array(word.palavra.length).fill("_"); // Cria um array de "_" do tamanho da palavra
  attempts = 6; // Define o número de tentativas

  // Exibe o array de "_" como uma string e a dica
  wordField.innerHTML = guessArray.join("");
  hintField.innerHTML = word.dica;
  attemptsField.innerHTML = attempts;
}

function refreshWord() {
    initGame();
}

function checkLetter() {
  let letter = letterInput.value.toLowerCase();

  if (letter.length !== 1) {
    alert("Por favor, digite apenas uma letra.");
    return;
  }

  if (!/^[a-z]$/.test(letter)) {
    alert("Por favor, digite apenas letras minúsculas.");
    return;
  }

  if (guessArray.includes(letter)) {
    alert("Você já tentou essa letra. Tente outra.");
    return;
  }

  let found = false;

  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === letter) {
      guessArray[i] = letter;
      found = true;
    }
  }

  if (!found) {
    attempts--;
    attemptsField.innerHTML = attempts;

    if (attempts === 0) {
      endGame(false);
    }
  }

  wordField.innerHTML = guessArray.join("");

  if (guessArray.join("") === word.palavra) {
    endGame(true);
  }

  letterInput.value = "";
}

function endGame(win) {
  if (win) {
    alert("Parabéns! Você venceu!");
  } else {
    alert("Você perdeu! A palavra correta era: " + word.palavra);
  }
    initGame();
}

initGame();