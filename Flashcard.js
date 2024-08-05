
let index = 2;
let length;

document.addEventListener('DOMContentLoaded', (event) => {
  function switch1() {
    var front = document.querySelector('.FFront');
    var back = document.querySelector('.FBack');

    if (front.style.display === 'none') {
      front.style.display = 'block';
      back.style.display = 'none';
    } else {
      front.style.display = 'none';
      back.style.display = 'block';
    }
  }

  var front = document.querySelector('.FFront');
  var back = document.querySelector('.FBack');

  if (front && back) {
    front.addEventListener('click', switch1);
    back.addEventListener('click', switch1);
  } else {
    console.error("Elements with class 'FFront' or 'FBack' not found.");
  }
});

const APILINK = 'https://5672e1d7-8f63-44af-80fe-2c97762754b4-00-kacw9b1o78ep.worf.replit.dev/api/v1/flashcards';
const url = new URL(location.href);
const defId = url.searchParams.get('id');

const main = document.getElementById("list");

//const note = document.getElementById("bleh")
returnFlashcardlist(APILINK);

returnFlashcard(APILINK);

function returnFlashcardlist(url1) {
  fetch(url1 + "/")

    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      data.forEach(flashcard => {
        const div_card = document.createElement('div');
        div_card.innerHTML = `
          <p class="word"> ${flashcard.word}</p>
          <p class="def"> ${flashcard.definition} <i class="delete" onclick="deleteTask('${flashcard._id}')">delete</i></p>
          
        `;
        main.appendChild(div_card);
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}


function returnFlashcard(url2) {
  fetch(url2 + "/")
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      if (data.length > 0) {
        length = data.length;
        const flashcard = data[index];
        document.getElementById("FFront").innerHTML = `${flashcard.word}`;
        document.getElementById("FBack").innerHTML = `${flashcard.definition}`;

      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}


function before() {
  if (index > 0) {
    index--;
    returnFlashcard(APILINK);
  }
}

function after() {
  if (index <= length) {
    index++;
    returnFlashcard(APILINK);
  }
}

function newF() {
  const main = document.getElementById("newcard");
  const div_new = document.createElement('div');
  div_new.innerHTML = `

          
              <input type="text" id="new_word" value="" class= "new_word">
          
              <input type="text" id="new_def" value="" class= "new_def">
            </p>
            <p><a href="#" onclick="saveReview('new_word', 'new_def')">Save</a>
            </p>
  `
  main.appendChild(div_new)


}




function saveReview(wordId, defId, id = "") {
  const word = document.getElementById(wordId).value;
  const def = document.getElementById(defId).value;

  if (id) {
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "word": word, "definition": def })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  } else {
    fetch(APILINK + "/new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "word": word, "definition": def })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}
function deleteTask(id) {
  fetch(APILINK + "/task/" + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });
}