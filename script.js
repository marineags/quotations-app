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

form.addEventListener("submit", (event) => {
  event.preventDefault(); // empêche la page de se recharger

  const text = document.getElementById("addQuote").value;
  const author = document.getElementById("author").value;

  // si un des champs est vide, on ne fait rien
  if (!text || !author) return;

  addQuoteAuthor(text, author);
  quoteCount();
  // vider les champs du formulaire
  form.reset();
});
