const form = document.getElementById("form");
const btn = document.getElementById("button");

function addQuoteAuthor(text, author) {
  const quoteText = document.createElement("p");
  quoteText.classList.add("text");
  quoteText.textContent = text;
  //cree un p pour la citation

  const quoteAuthor = document.createElement("p");
  quoteAuthor.classList.add("author");
  quoteAuthor.textContent = author;
  //cree un p pour l'auteur

  const quoteContainer = document.createElement("div");
  quoteContainer.classList.add("quote");
  //cree une nouvelle div
  const pin = document.createElement("img");
  pin.src = "images/pin.png";
  pin.classList.add("pin");
  quoteContainer.appendChild(pin);

  // Bouton de suppression
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "🗑️";
  quoteContainer.appendChild(deleteBtn);

  quoteContainer.appendChild(quoteText);
  quoteContainer.appendChild(quoteAuthor);
  //je range mes p dans la div

  const list = document.getElementById("quote-list");
  //pour les mettre a l'endroit demandé
  list.appendChild(quoteContainer);
  //et je la range
}

let countAdd = 0;
function quoteCount() {
  const count = document.getElementById("count");
  countAdd++;
  count.innerHTML = countAdd;
}

function saveQuote(text, author) {
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  quotes.push({ text, author });
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// 📥 Recharge toutes les citations quand la page s'ouvre
function loadQuotesFromStorage() {
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  quotes.forEach((quote) => {
    addQuoteAuthor(quote.text, quote.author);
    quoteCount();
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // empêche la page de se recharger

  const text = document.getElementById("addQuote").value;
  const author = document.getElementById("author").value;

  // si un des champs est vide, on ne fait rien
  if (!text || !author) return;

  addQuoteAuthor(text, author);
  saveQuote(text, author);
  quoteCount();
  // vider les champs du formulaire
  form.reset();
});

// 🗑️ Quand on clique sur la poubelle d'une citation
document
  .getElementById("quote-list")
  .addEventListener("click", function (event) {
    // On vérifie que l'élément cliqué est bien la poubelle
    if (event.target.classList.contains("delete-btn")) {
      const quoteDiv = event.target.parentElement; // la div .quote

      // Récupère le texte et l'auteur de cette citation
      const text = quoteDiv.querySelector(".text").textContent;
      const author = quoteDiv.querySelector(".author").textContent;

      // 1. Supprime du DOM
      quoteDiv.remove();

      // 2. Supprime du localStorage
      let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
      quotes = quotes.filter((q) => !(q.text === text && q.author === author));
      localStorage.setItem("quotes", JSON.stringify(quotes));

      // 3. Met à jour le compteur
      countAdd--;
      document.getElementById("count").textContent = countAdd;
    }
  });

loadQuotesFromStorage();
