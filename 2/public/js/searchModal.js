const searchModal = document.querySelector(".searchModal");
const activeButton = document.getElementById("searchButton");
const closeSearch = document.querySelector(".closeSearch");

activeButton.addEventListener("click", () => {
    if (window.screen.width <= 500) {
        searchModal.classList.toggle("active");
    }
    // console.log(window.screen.width);
});
closeSearch.addEventListener("click", () => {
    searchModal.classList.toggle("active");
});

