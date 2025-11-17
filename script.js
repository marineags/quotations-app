const btn = document.getElementById("button");

btn.addEventListener("click", () => {
  const text = document.getElementById("addQuote").value;
  const author = document.getElementById("author").value;

  console.log(text, author);
});
