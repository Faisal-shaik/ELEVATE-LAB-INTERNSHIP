document.querySelectorAll(".btn-primary").forEach(button => {
  button.addEventListener("click", function (e) {
    console.log("Read More clicked:", this.parentElement.querySelector(".card-title").innerText);
  });
});
