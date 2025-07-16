import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  // namming things
  const drawButton = document.getElementById("drawButton");
  const sortButton = document.getElementById("sortButton");
  const cardCountInput = document.getElementById("cardCount");
  const cardIcons = ["♥", "♦", "♣", "♠"];
  const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let drawnCards = [];

  //1 random card using math.random a simlpe function that returns random number depending on the lenth of its owner.
  function generateRandomCard() {
    const icon = cardIcons[Math.floor(Math.random() * cardIcons.length)];
    const value = cardValues[Math.floor(Math.random() * cardValues.length)];
    return { icon, value };
  }

  //2 a simple function to render cards when needed to call them in the upcoming drawing and sorting buttons.
  function renderCards(cards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    cards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card m-2 row shadow-lg  rounded";
      cardDiv.style.width = "3rem";
      cardDiv.style.height = "4rem";
      cardDiv.innerHTML = `
        <div class="text-start position-absolute top-0 start-0">${card.icon}</div>
        <div class="position-absolute top-50 start-50 translate-middle text-center">${card.value}</div>
        <div class="position-absolute bottom-0 end-0 text-end">${card.icon}</div>
      `;
      container.appendChild(cardDiv);
    });
  }

  // a simple functin that have a for loop inside of it where it utilise the above
  function drawCards(count) {
    drawnCards = [];
    for (let i = 0; i < count; i++) {
      drawnCards.push(generateRandomCard());
    }
    renderCards(drawnCards, "cardContainer");
  }

  function selectionSortWithSteps(arr) {
    let steps = [];
    arr = [...arr]; // Clone to avoid mutating original
    let min = 0;

    while (min < arr.length - 1) {
      for (let i = min + 1; i < arr.length; i++) {
        if (arr[min].value > arr[i].value) {
          let aux = arr[min];
          arr[min] = arr[i];
          arr[i] = aux;
          steps.push([...arr]); // Capture snapshot after every swap
        }
      }
      min++;
    }

    return steps;
  }

  drawButton.addEventListener("click", () => {
    const count = parseInt(cardCountInput.value);
    if (isNaN(count) || count <= 0) {
      alert("Please enter a valid number.");
      return;
    }
    drawCards(count);
  });

  sortButton.addEventListener("click", () => {
    if (drawnCards.length === 0) {
      alert("Draw cards first.");
      return;
    }

    const steps = selectionSortWithSteps(drawnCards);

    // Show up to 4 sorting steps in cardContainer0-3
    for (let i = 0; i < 4; i++) {
      const step = steps[i] || steps[steps.length - 1] || drawnCards;
      renderCards(step, `cardContainer${i}`);
    }
  });
};
