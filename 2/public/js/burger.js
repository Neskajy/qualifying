const burger_button = document.querySelector(".burger-button");
const burger_window = document.querySelector(".burger-window");

burger_button.addEventListener("click", () => {
    burger_button.classList.toggle('active');
    burger_window.classList.toggle('active');
    document.body.classList.toggle('blocked');

});