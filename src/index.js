const APIhost = `https://wordwatch-api.herokuapp.com`
var $ = require('jQuery');

$(document).ready(() => {
  getTopWord()
  $('button').on('click', breakDown)
  $("textarea")[0]
    .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      $("button").click()
    }
  })
})

const getTopWord = () => {
  return fetch(APIhost + `/api/v1/top_word`)
    .then(response => handleResponse(response))
    .then(topWord => addTopWord(topWord))
    .catch(error => console.log( {error} ))
}

const handleResponse = (response) => {
  return response.json()
  .then(json => {
    if (!response.ok) {
      const error = {
        status: response.status,
        statusText: response.statusText,
        json,
      }
      return Promise.reject(error)
    }
    return json
  })
}

const addTopWord = (topWord) => {
  let word = Object.keys(topWord.word)[0]
  let count = Object.values(topWord.word)[0]
  $('h3').append(`${word} (${count})`)
}

const getWordCount = (wordList) => {
  let wordCount = {}
  wordList.map(function(word) {
    if (!wordCount[word]) {
      wordCount[word] = 1
    }
    else {
      wordCount[word] += 1
    }
  })
  return wordCount
}

const breakDown = () => {
  event.preventDefault
  let wordList = $('textarea')[0].value.split(' ')
  let wordCount = getWordCount(wordList)
  Object.entries(wordCount).forEach(function(word) {
    appendToWordCount(word)
    for (var i = 0; i < word[1]; i++) {
      addWord(word)
    }
  })
}

const appendToWordCount = (word) => {
  $('.word-count').append(`<p class=${word[0]}>${word[0]}</p>`)
  $(`.${word[0]}`).css("fontSize", `${word[1]}em`)
}

const addWord = (word) => {
  let wordName = word[0]
  let data = { word: { value: word[0] } }
    return fetch(APIhost + `/api/v1/words`, {
      method: 'post',
      headers:
      { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => handleResponse(response))
    .catch(error => console.log( {error} ))
}