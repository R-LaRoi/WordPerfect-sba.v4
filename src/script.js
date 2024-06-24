let wcUserText = document.getElementById("cloud-text");
let userWord = document.getElementById("user-word");
let newWord = document.getElementById("new-word-btn");
let wordList = document.getElementById("saved-words");
let API_KEY = "d005d2a608msha616720d96273b5p17058fjsn3a4d7e3b9415";

// Word of the day API ---------
// Defines word of the day using Dictionary API -------

// function wordOfTheDay() {
//   let wordOfDay = document.getElementById("word-of-day");
//   fetch("https://random-word-api.herokuapp.com/word?number=1")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       wordOfDay.innerText = data;
//       fetch(
//         `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${data}?key=44793c76-dae0-4101-a109-1642ae60ecea`
//       )
//         .then((response) => response.json())
//         .then((define) => {
//           console.log(define[0]);
//           if (!define[0]) {
//             document.getElementById(
//               "wod-define"
//             ).innerText = `No definition provided for ${data}.`;
//           } else {
//             document.getElementById("wod-define").innerText =
//               define[0].shortdef[0];
//           }
//         });
//     });
// }

// wordOfTheDay();

// generates new word of the day
newWord.addEventListener("click", (e) => {
  e.preventDefault();
  wordOfTheDay();
});

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
    let addWordBtn = document.getElementById("add-word-btn");
    addWordBtn.style.display = "hidden";
    showExample.style.fontSize = "1rem";

    // async await function ----
    async function defineWord() {
      await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0].meanings[0].definitions[0]);
          if (!data[0].meanings[0].definitions[0].definition) {
            showDefinition.innerHTML = `No example provided for ${keyword}.`;
          } else {
            showDefinition.innerHTML =
              data[0].meanings[0].definitions[0].definition;
          }

          if (!data[0].meanings[0].definitions[0].example) {
            showExample.innerText = `No example provided for ${keyword}.`;
          } else {
            showExample.innerText = data[0].meanings[0].definitions[0].example;
          }

          addWordBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log();
            let saveWord = document.createElement("div");
            saveWord.innerHTML = `You liked ${keyword}. Definition: ${data[0].meanings[0].definitions[0].definition}`;

            wordList.append(saveWord);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    defineWord();
  });
}

searchWord();

//  ------- Word Cloud API ---------------------

async function makeWordCloud() {
  wcUserText.addEventListener("change", (e) => {
    e.preventDefault();
    let userCloud = wcUserText.value;
    fetchCloud();

    function fetchCloud() {
      fetch("https://quickchart.io/wordcloud?", {
        method: "POST",
        headers: {
          "x-rapidapi-host": "textvis-word-cloud-v1.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          text: userCloud,
          format: "svg",
          width: 700,
          height: 800,
          fontFamily: "sans-serif",
          fontScale: 75,
          scale: "linear",
          colors: ["#ff004d", "#212020"],
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
    }
  });
}

makeWordCloud();
