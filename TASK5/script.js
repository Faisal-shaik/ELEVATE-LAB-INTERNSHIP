document.getElementById("learnMore").addEventListener("click", () => {
    window.scrollTo({
        top: document.getElementById("about").offsetTop,
        behavior: "smooth"
    });
});
