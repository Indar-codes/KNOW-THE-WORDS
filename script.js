async function searchWord() {
  const word = document.getElementById('wordInput').value.trim();
  const meaningDiv = document.getElementById('meaning');
  const roastDiv = document.getElementById('roast');

  meaningDiv.classList.remove("hidden");
  roastDiv.classList.remove("hidden");

  if (!word) {
    meaningDiv.innerText = "😒 Arre bhai, word to daal!";
    roastDiv.innerText = "Tere jaisa lazy user kam hi dekha! 😂";
    return;
  }

  meaningDiv.innerText = "⏳ Dhoondh raha hoon bhai... ruk jaa!";
  roastDiv.innerText = "";

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if (Array.isArray(data)) {
      const defList = data[0].meanings
        .flatMap(meaning => meaning.definitions)
        .map((d, i) => `👉 ${i + 1}. ${d.definition}`)
        .slice(0, 3) // Top 3 meanings only
        .join('\n');

      meaningDiv.innerText = `🧐 Meanings of "${word}":\n${defList}`;
      roastDiv.innerText = getFunnyRoast(word);
    } else {
      // No definitions found
      meaningDiv.innerText = `😵 Sorry bro, "${word}" ka koi meaning nahi mila!`;
      roastDiv.innerText = `"${word}" – Shayad tu naye shabd bana raha hai 😂`;
    }
  } catch (err) {
    meaningDiv.innerText = "⚠️ Oops! Kuch toh gadbad hai network me.";
    roastDiv.innerText = "Recharge kara lo bhai, data khatam ho gaya kya? 😅";
  }
}

function getFunnyRoast(word) {
  const roasts = [
    `"${word}" – Itna intelligent word? Tu padhai kab karta hai? 🤓`,
    `"${word}" – Ye bolke interview clear ho jaayega shayad! 💼`,
    `"${word}" – Dictionary me bhi dhoondte dhoondte thak gya hu 🥲`,
    `"${word}" – Tujhse ye expect nahi tha bhai 😜`,
    `"${word}" – Ye word sunke ChatGPT bhi hil gaya! 💀`
  ];
  return roasts[Math.floor(Math.random() * roasts.length)];
}
