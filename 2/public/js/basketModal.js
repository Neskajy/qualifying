const basketModal = document.getElementById("basketModal");
const openBasketModal = document.getElementById("openBasketModal");
const addedCards = document.getElementById("addedCards");

let basket = {};

openBasketModal.addEventListener('click', () => {
    basketModal.classList.toggle("active");
    document.body.classList.toggle("smooth");
    renderBasket();
});


function createBasketCard(product, quantity) {
    return `
        <div class="card" data-article="${product.article}">
            <div class="image">
                <img src="public/media/phones/${product.image}" alt="" class="product">
            </div>
            <div class="information">
                <div class="description">${product.name}</div>
                <div class="price">
                    <span class="discount">${product.price} ₽</span>
                </div>
            </div>
            <div class="switchNumOfProducts">
                <input type="number" value="${quantity}" data-article="${product.article}" data-price="${product.price}">
            </div>
            <div class="total">
                <span>Итого:</span>
                <span class="productTotal">${product.price * quantity} ₽</span> </div>
            <button class="btn remove" data-article="${product.article}"><img src="public/media/icons/trash.svg" alt=""></button>
        </div>
    `;
}

function updateBasket(article, quantity) {
    if (quantity <= 0) {
        delete basket[article];
    } else {
        basket[article] = quantity;
    }
    renderBasket();
}

function renderBasket() {
    addedCards.innerHTML = '';
    let totalPrice = 0;
    for (const article in basket) {
        const product = products.find(p => p.article === article);
        if (product) {
            const cardHTML = createBasketCard(product, basket[article]);
            addedCards.insertAdjacentHTML('beforeend', cardHTML);
            totalPrice += product.price * basket[article];
        }
    }
    const totalPriceElement = document.getElementById('productTotal');
    if(totalPriceElement) totalPriceElement.textContent = `${totalPrice} ₽`;

    const quantityInputs = addedCards.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateBasket(input.dataset.article, parseInt(input.value, 10));
        });
    });

    const removeButtons = addedCards.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateBasket(button.dataset.article, 0);
        });
    });
}


function addToBasket(article) {
    const product = products.find(p => p.article === article);
    if (product) {
        basket[article] = basket[article] ? basket[article] + 1 : 1;
        renderBasket();
        alert("Товар добавлен в корзину!");
    }
}


productsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('details')) {
        addToBasket(event.target.dataset.article);
    }
});
