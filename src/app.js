import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  const drawButton = document.getElementById("drawButton");
  const sortButton = document.getElementById("sortButton");
  const cardCountInput = document.getElementById("cardCount");
  const cardIcons = ["♥", "♦", "♣", "♠"];
  const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let drawnCards = [];

  function generateRandomCard() {
    const icon = cardIcons[Math.floor(Math.random() * cardIcons.length)];
    const value = cardValues[Math.floor(Math.random() * cardValues.length)];
    return { icon, value };
  }

  function renderCards(cards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    cards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card m-2 row shadow-lg rounded";
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

  function drawCards(count) {
    drawnCards = [];
    for (let i = 0; i < count; i++) {
      drawnCards.push(generateRandomCard());
    }
    renderCards(drawnCards, "cardContainer");
  }

  function selectionSortWithSteps(arr) {
    let steps = [];
    arr = [...arr];
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        steps.push(arr.map((card) => ({ ...card })));
      }
    }
    return steps;
  }

  function clearSortLogContainers() {
    const sortLogContainer = document.getElementById("sortLogContainer");
    sortLogContainer.innerHTML = "";
  }

  function createSortLogContainers(numberOfSteps) {
    const sortLogContainer = document.getElementById("sortLogContainer");
    sortLogContainer.innerHTML = "";

    for (let i = 0; i < numberOfSteps; i++) {
      const stepContainer = document.createElement("div");
      stepContainer.className = "d-flex flex-wrap align-items-center";
      stepContainer.innerHTML = `${i}<div id="cardContainer${i}" class="d-flex flex-wrap justify-content-center"></div>`;
      sortLogContainer.appendChild(stepContainer);
    }
  }

  drawButton.addEventListener("click", () => {
    const count = parseInt(cardCountInput.value);
    if (isNaN(count) || count <= 0 || count > 9) {
      alert("Ohh!! You can only draw 1 to 9 cards. Please try again.");
      return;
    }
    // Clear the sorted step containers
    clearSortLogContainers();
    drawCards(count);
  });

  sortButton.addEventListener("click", () => {
    if (drawnCards.length === 0) {
      alert("Draw cards first.");
      return;
    }

    const steps = selectionSortWithSteps([...drawnCards]);

    // Create containers dynamically based on number of steps
    createSortLogContainers(steps.length);

    // Render each step to its corresponding container
    steps.forEach((step, index) => {
      renderCards(step, `cardContainer${index}`);
    });
    drawnCards.sort((a, b) => a.value - b.value);
    renderCards(drawnCards, "cardContainer");
  });
};
