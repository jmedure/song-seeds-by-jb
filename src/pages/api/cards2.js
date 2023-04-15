const cardDescription = document.getElementById('cardReg');
const generateButton = document.getElementById('generateButton');

generateButton.addEventListener('click', () => {
  fetch('/cards.json')
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.cards.length);
      const randomCard = data.cards[randomIndex];

      // Set the card details using the random card data
      cardDescription.textContent = randomCard.reg;
    })
    .catch((error) => console.error(error));
});
