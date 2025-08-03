const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultBox = document.getElementById("resultBox");
const errorMsg = document.getElementById("error-msg");
const loader = document.getElementById("loader");
const botMsg = document.getElementById("bot-msg");

searchBtn.addEventListener("click", () => {
  const word = searchInput.value.trim();

  if (word === "") {
    botMsg.textContent = "Please type a word to search! 📘";
    resultBox.innerHTML = "";
    errorMsg.classList.add("hidden");
    return;
  }

  loader.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  resultBox.innerHTML = "";
  botMsg.textContent = "Searching the meaning for \"" + word + "\"...";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((data) => {
      loader.classList.add("hidden");

      if (!data[0] || !data[0].meanings) {
        errorMsg.classList.remove("hidden");
        botMsg.textContent = "Hmm... that word might be missing from our dictionary. 😅";
        return;
      }

      const meaningData = data[0].meanings[0];
      const definition = meaningData.definitions[0].definition;
      const partOfSpeech = meaningData.partOfSpeech;

      resultBox.innerHTML = `
        <h2 class="text-2xl font-bold mb-2 text-purple-700">${word}</h2>
        <p class="italic text-sm text-gray-500">${partOfSpeech}</p>
        <p class="mt-2 text-lg">${definition}</p>
      `;

      botMsg.textContent = "Here you go! Want to try another word? 😊";
    })
    .catch((error) => {
      loader.classList.add("hidden");
      errorMsg.classList.remove("hidden");
      botMsg.textContent = "Something went wrong. Please try again later. 😢";
    });
});
