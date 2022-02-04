"use strict";
// DOM elements
const seatsElements = document.querySelectorAll(".stage_seat");
const counterElement = document.getElementById("result_counter");
const priceElement = document.getElementById("result_price");
const movieSelect = document.getElementById("movie-select");

// global variables
let counter = 0;
let price = 0;
const prices = {
  movie1: 10,
  movie2: 20,
  movie3: 30,
};
let selectedSeatsIndexes = [];
let movieSelectedIndex = 0;

// Functions
const handleMovieSelectChanged = () => {
  localStorage.setItem("selectedOption", movieSelect.options.selectedIndex);
  setPrice();
};

const setPrice = () => {
  const selectedMovie = movieSelect.options[movieSelectedIndex].value;
  const moviePrice = prices[selectedMovie];
  priceElement.textContent = counter * moviePrice;
};

const selectSeat = (e) => {
  const seat = e.target;
  seat.classList.toggle("seat--selected");
  if (seat.classList.contains("seat--selected")) {
    selectedSeatsIndexes.push(seat.getAttribute("index"));
  } else {
    selectedSeatsIndexes.pop(seat.getAttribute("index"));
  }

  updateLocalStorageIndexesArray(selectedSeatsIndexes);
  counterElement.textContent = selectedSeatsIndexes.length;
  setPrice();
};

const updateLocalStorageIndexesArray = (indexesArray) => {
  localStorage.setItem("indexesArray", JSON.stringify(indexesArray));
};
const getIndexesArrayFromLocalStorage = () => {
  const localStorageValue = JSON.parse(localStorage.getItem("indexesArray"));
  return localStorageValue ? localStorageValue : [];
};
const getSelectedOptionFromLocalStorage = () => {
  return localStorage.getItem("selectedOption");
};

// Event listeners
seatsElements.forEach((element) => {
  if (!element.classList.contains("seat--occupied"))
    element.addEventListener("click", selectSeat);
});

movieSelect.addEventListener("change", handleMovieSelectChanged);

const init = () => {
  let index = 0;
  // initializing seat indexes
  seatsElements.forEach((element) => {
    element.setAttribute("index", index);
    index++;
  });
  selectedSeatsIndexes = getIndexesArrayFromLocalStorage();
  movieSelect.options.selectedIndex = getSelectedOptionFromLocalStorage();

  seatsElements.forEach((element) => {
    const elementIndex = element.getAttribute("index");
    if (selectedSeatsIndexes.includes(elementIndex)) {
      element.classList.add("seat--selected");
    }
  });
  counterElement.textContent = selectedSeatsIndexes.length;
  setPrice();
};

init();
