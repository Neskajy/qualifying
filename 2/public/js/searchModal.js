const searchModal = document.querySelector(".searchModal");
const activeButton = document.getElementById("searchButton");
const closeSearch = document.querySelector(".closeSearch");

activeButton.addEventListener("click", () => {
    if (window.screen.width <= 500) {
        searchModal.classList.toggle("active");
    }
});
closeSearch.addEventListener("click", () => {
    searchModal.classList.toggle("active");
});

