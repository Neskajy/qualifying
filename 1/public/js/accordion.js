class Accordion {
    constructor(accordionSelector) {
        this.accordion = document.querySelector(accordionSelector);

        this.switchStatusAccordion();
        this.handleClickOutside();
    }


    switchStatusAccordion() {
        this.accordion.addEventListener("click", () => {
            this.accordion.classList.toggle("active");
            this.content.classList.toggle("active");
        });
    }

    handleClickOutside() {
        document.addEventListener('click', (event) => {
            if (!this.accordion.contains(event.target) && this.accordion.classList.contains("active")) {
                this.accordion.classList.remove("active");
                this.content.classList.remove("active");
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // const accordion1 = new Accordion(".accordion.contacts");
    const accordion2 = new Accordion(".accordion-sites");
});
