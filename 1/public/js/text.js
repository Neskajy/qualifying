const descriptions = document.querySelectorAll(".description");

descriptions.forEach((element) => {
    if (element.innerHTML.length > 86) {
        element.innerHTML = element.innerHTML.slice(0, 85) + "...";
    };
});