var text = ["Amazingly", "Incredibly", "Astonishingly", "Believe it or not"];
var counter = 0;
var elem = document.getElementById("changing-text");
setInterval(change, 1500);

function change() {
  elem.innerHTML = text[counter];
  counter++;
  if (counter >= text.length) {
    counter = 0;
  }
}

// <!-- header -->
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("myHeader").style.fontSize = "75%";
    document.getElementById("myHeader").style.padding = "0px 0px";
    document.getElementById("myHeader").style.transitionDuration = "100ms";
    document.getElementsByClassName("list-r").style.paddingBottom = "2px";
  } else {
    document.getElementById("myHeader").style.fontSize = "125%";
    document.getElementById("myHeader").style.padding = "0px 0px";
  }
}
// Global Variable used to store the quotes
// fetched from the API
var data;
let front = true;

// Getting the front and the back author boxes
const authors = document.querySelectorAll(".author");

// Getting the front and the back texts
const texts = document.querySelectorAll(".text");

// Getting the body
const body = document.getElementById("body");

// Getting the buttons
const button = document.querySelectorAll(".new-quote");

const blockFront = document.querySelector(".block__front");
const blockBack = document.querySelector(".block__back");

const authorFront = authors[0];
const authorBack = authors[1];

const textFront = texts[0];
const textBack = texts[1];

const buttonFront = button[0];
const buttonBack = button[1];

// An arrow function used to get a quote randomly
const displayQuote = () => {
  // Generates a random number between 0
  // and the length of the dataset
  let index = Math.floor(Math.random() * data.length);

  // Stores the quote present at the randomly generated index
  let quote = data[index].text;

  // Stores the author of the respective quote
  let author = data[index].author;

  // Making the author anonymous if no author is present
  if (!author) {
    author = "Anonymous";
  }

  // Replacing the current quote and the author with a new one

  if (front) {
    // Changing the front if back-side is displayed
    textFront.innerHTML = quote;
    authorFront.innerHTML = author;
  } else {
    // Changing the back if front-side is displayed
    textBack.innerHTML = quote;
    authorBack.innerHTML = author;
  }

  front = !front;
};

// Fetching the quotes from the type.fit API using promises
fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  }) // Getting the raw JSON data
  .then(function (data) {
    // Storing the quotes internally upon
    // successful completion of request
    this.data = data;

    // Displaying the quote When the Webpage loads
    displayQuote();
  });

// Adding an onclick listener for the button
function newQuote() {
  // Rotating the Quote Box
  blockBack.classList.toggle("rotateB");
  blockFront.classList.toggle("rotateF");

  // Displaying a new quote when the webpage loads
  displayQuote();
}
