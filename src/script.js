let userText = document.getElementById("wc-text");
let userWord = document.getElementById("user-word");
let API_KEY = "d005d2a608msha616720d96273b5p17058fjsn3a4d7e3b9415";

window.addEventListener("DOMContentLoaded", yourFunc);

function yourFunc() {
  document.getElementById("home-preloader").style.display = "block";
  setTimeOut(() => {
    document.getElementById("home-preloader").style.display = "none";
  }, 3000);
}

// Word of the day API ---------
// Defines word of the day using Dictionary API -------

async function wordOfTheDay() {
  let wordOfDay = document.getElementById("word-of-day");

  await fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then((response) => response.json())
    .then((data) => {
      wordOfDay.innerText = data;
      fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${data}?key=44793c76-dae0-4101-a109-1642ae60ecea`
      )
        .then((response) => response.json())
        .then((define) => {
          console.log(define[0]);
          document.getElementById("wod-define").innerText =
            define[0].shortdef[0];
        });
    });
}

wordOfTheDay();

// Dictionary API ---------------------
//  search word and return definition

function searchWord() {
  let keyword = "universe";

  userWord.addEventListener("change", (e) => {
    e.preventDefault();
    keyword = userWord.value;
    document.getElementById("word--").textContent = keyword;
    console.log(keyword);

    let showDefinition = document.getElementById("show-def");
    let showExample = document.getElementById("show-ex");
    showExample.style.fontSize = "1rem";

    async function defineWord() {
      await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0].meanings[0].definitions[0]);

          showDefinition.innerHTML =
            data[0].meanings[0].definitions[0].definition;
          showExample.innerText = data[0].meanings[0].definitions[0].example;

          console.log(showDefinition);
        });
    }

    defineWord();
  });
}

searchWord();

//  ------- Word Cloud API ---------------------

let wcUserText = document.getElementById("");

fetch("https://quickchart.io/wordcloud?", {
  method: "POST",
  headers: {
    "x-rapidapi-host": "textvis-word-cloud-v1.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
    "content-type": "application/json",
    accept: "application/json",
  },
  body: JSON.stringify({
    text: "It might seem crazy what I'm 'bout to say Sunshine she's here, you can take a break I'm a hot air balloon that could go to space With the air, like I don't care, baby, by the way, huh (Because I'm happy) Clap along if you feel like a room without a roof (Because I'm happy) Clap along if you feel like happiness is the truth (Because I'm happy) Clap along if you know what happiness is to you (Because I'm happy) Clap along if you feel like that's what you wanna do Here come bad news, talking this and that (Yeah!) Well, give me all you got, don't hold it back (Yeah!) Well, I should probably warn ya, I'll be just fine (Yeah!) No offense to you, dont waste your time, here's why (Because I'm happy) Clap along if you feel like a room without a roof (Because I'm happy) Clap along if you feel like happiness is the truth (Because I'm happy) Clap along if you know what happiness is to you (Because I'm happy) Clap along if you feel like that's what you wanna do (Hey Come On Uh,)(Happy),  My level's too high to (Happy, Happy, Happy, Happy,) ",
    format: "svg",
    width: 800,
    height: 800,
    fontFamily: "sans-serif",
    fontScale: 55,
    scale: "linear",
  }),
})
  .then((response) => {
    console.log(response);
    return response.text();
  })
  .then((wordCloud) => {
    let img = document.getElementById("word-cloud");
    img.innerHTML = wordCloud;
    img.width = "100%";
  })
  .catch((err) => {
    console.log(err);
  });
