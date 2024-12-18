const getCardsFromFiltersButton = document.getElementById('getCardsFromFiltersButton');
const resetForm = document.getElementById('RESET');
const form = document.getElementById('FILTER');
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const productsContainer = document.getElementById("products-cards");

const products = [
    {
        image: "1.jpg",
        name: "Смартфон DEXP A440 8 ГБ розовый",
        article: "DEXPA440-PINK",
        price: 3200,
        ram: 1,
        storage: 8,
        manufacturer: "DEXP"
    },
    {
        image: "2.jpg",
        name: "Samsung Galaxy M52",
        article: "SAMM52-BLK",
        price: 40999,
        ram: 6,
        storage: 256,
        manufacturer: "Samsung"
    },
    {
        image: "3.jpg",
        name: "Смартфон POCO F3 Черный",
        article: "POCOF3-BLK",
        price: 32999,
        ram: 6,
        storage: 128,
        manufacturer: "POCO"
    },
    {
        image: "4.jpg",
        name: "Смартфон POCO F3 Белый",
        article: "POCOF3-WHT",
        price: 34999,
        ram: 6,
        storage: 128,
        manufacturer: "POCO"
    },
    {
        image: "5.jpg",
        name: "Samsung Galaxy A15 4/128Gb Cиний",
        article: "SAMGA15-BLU",
        price: 13990,
        ram: 4,
        storage: 128,
        manufacturer: "Samsung"
    },
    {
        image: "6.jpg",
        name: "iPhone 14 Pro Max 128Gb",
        article: "IP14PM-128",
        price: 109200,
        ram: 6,
        storage: 128,
        manufacturer: "Apple"
    },
    {
        image: "7.jpg",
        name: "Xiaomi 14 Ultra",
        article: "XIA14U-512",
        price: 92790,
        ram: 16,
        storage: 512,
        manufacturer: "Xiaomi"
    }
];

const minPrice  = document.querySelector('input[type="number"][data-filter-category="minPrice"]');
const maxPrice  = document.querySelector('input[type="number"][data-filter-category="maxPrice"]');
minPrice.value = 10**8;
maxPrice.value = 0;

searchForm.addEventListener("click" , (event) => {
    event.preventDefault();
    if (searchInput.value != "") {
        products.forEach(element => {
            const regex = new RegExp(searchInput.value.toLowerCase(), 'gi'); // 'g' - глобальный поиск, 'i' - игнорировать регистр
            if (regex.test(element.name)) { // Используем regex.test() вместо includes
                productsContainer.innerHTML = ""; // Очищаем контейнер каждый раз - это может быть неэффективно при большом количестве товаров. Лучше очищать один раз перед циклом
                let cardSample = `
                    <div class="card" id="${element.article}">
                        <div class="image">
                            <img src="public/media/phones/${element.image}" alt="" class="product">
                        </div>
                        <div class="information">
                            <div class="rating">
                                <div class="stars">
                                    <img src="public/media/icons/star.svg" class="star"></img>
                                    <img src="public/media/icons/star.svg" class="star"></img>
                                    <img src="public/media/icons/star.svg" class="star"></img>
                                    <img src="public/media/icons/star.svg" class="star"></img>
                                    <img src="public/media/icons/star.svg" class="star"></img>
                                </div>
                                <div class="reviews__count">
                                    <span>2</span>
                                </div>
                            </div>
                            <div class="description">${element.name}</div>
                            <div class="price">
                                <span class="discount">${element.price} ₽</span>
                                
                            </div>
                        </div>
                        <button class="details" data-article="${element.article}">В корзину</button>
                    </div>  
                `;
                productsContainer.innerHTML += cardSample;
            }
        });
        
    }
});

products.forEach(element => {
    let cardSample = `
        <div class="card" id="${element.article}">
        <div class="image">
            <img src="public/media/phones/${element.image}" alt="" class="product">
        </div>
        <div class="information">
            <div class="rating">
                <div class="stars">
                    <img src="public/media/icons/star.svg" class="star"></img>
                    <img src="public/media/icons/star.svg" class="star"></img>
                    <img src="public/media/icons/star.svg" class="star"></img>
                    <img src="public/media/icons/star.svg" class="star"></img>
                    <img src="public/media/icons/star.svg" class="star"></img>
                </div>
                <div class="reviews__count">
                    <span>2</span>
                </div>
            </div>
            <div class="description">${element.name}</div>
            <div class="price">
                <span class="discount">${element.price} ₽</span>
                
            </div>
        </div>
        <button class="details" data-article="${element.article}">В корзину</button>
        </div>  
    `;

    productsContainer.innerHTML +=  cardSample;


    if (element.price < minPrice.value) {
        minPrice.value = element.price;
    }
    if (element.price > maxPrice.value) {
        maxPrice.value = element.price;
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const filters = document.querySelectorAll('.filters input[type="checkbox"]:checked, input[type="number"]');
    let filteredProducts = [...products]; // Копия массива products

    // Объект для хранения выбранных значений по категориям
    const filterValues = {
        manufacturer: [],
        ram: [],
        storage: [],
        minPrice: null,
        maxPrice: null
    };

    // Заполнение объекта выбранными значениями
    for (let filter_num = 0; filter_num < filters.length; filter_num++) {
        const category = filters[filter_num].dataset.filterCategory;
        const value = filters[filter_num].value;

        // Добавляем значения в соответствующий массив или устанавливаем минимальные/максимальные значения
        if (category == 'minPrice') {
            filterValues.minPrice = parseFloat(value);
        } else if (category == 'maxPrice') {
            filterValues.maxPrice = parseFloat(value);
        } else if (filterValues[category]) {
            filterValues[category].push(value);
        }
    }

    // Фильтрация по выбранным значениям
    filteredProducts = filteredProducts.filter(product => {
        let matches = true;

        // Проверка для каждого фильтра
        if (filterValues.manufacturer.length > 0) {
            matches = matches && filterValues.manufacturer.includes(product.manufacturer);
        }
        if (filterValues.ram.length > 0) {
            matches = matches && filterValues.ram.includes(product.ram.toString());
        }
        if (filterValues.storage.length > 0) {
            matches = matches && filterValues.storage.includes(product.storage.toString());
        }
        
        // Проверка для минимальной и максимальной цены
        if (filterValues.minPrice !== null) {
            matches = matches && product.price >= filterValues.minPrice;
        }
        if (filterValues.maxPrice !== null) {
            matches = matches && product.price <= filterValues.maxPrice;
        }

        return matches;
    });

    // Здесь можно обновить отображение отфильтрованных продуктов
    // updateProductDisplay(filteredProducts);

    productsContainer.innerHTML = "";

    filteredProducts.forEach(element => {
        let cardSample = `
        <div class="card" id="${element.article}">
        <div class="image">
            <img src="public/media/phones/${element.image}" alt="" class="product">
        </div>
        <div class="information">
            <div class="rating">
                <div class="stars">
                    <img src="public/media/icons/star.svg" class="star"></img>
                    <img src="public/media/icons/star.svg" class="star"></img>
                    <img src="public/media/icons/star.svg" class="star"></img>
                    <img src="public/media/icons/star.svg" class="star"></img>
                    <img src="public/media/icons/star.svg" class="star"></img>
                </div>
                <div class="reviews__count">
                    <span>2</span>
                </div>
            </div>
            <div class="description">${element.name}</div>
            <div class="price">
                <span class="discount">${element.price} ₽</span>
                
            </div>
        </div>
        <button class="details" data-article="${element.article}">В корзину</button>
        </div>  
        `;
        productsContainer.innerHTML += cardSample;
    });
});

resetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    productsContainer.innerHTML = "";

    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const minPrice  = document.querySelector('input[type="number"][data-filter-category="minPrice"]');
    const maxPrice  = document.querySelector('input[type="number"][data-filter-category="maxPrice"]');
    minPrice.value = 10**8;
    maxPrice.value = 0;
    allCheckboxes.forEach(element => {element.checked = false});
    products.forEach(element => {
        let cardSample = `
            <div class="card" id="${element.article}">
            <div class="image">
                <img src="public/media/phones/${element.image}" alt="" class="product">
            </div>
            <div class="information">
                <div class="rating">
                    <div class="stars">
                        <img src="public/media/icons/star.svg" class="star"></img>
                        <img src="public/media/icons/star.svg" class="star"></img>
                        <img src="public/media/icons/star.svg" class="star"></img>
                        <img src="public/media/icons/star.svg" class="star"></img>
                        <img src="public/media/icons/star.svg" class="star"></img>
                    </div>
                    <div class="reviews__count">
                        <span>2</span>
                    </div>
                </div>
                <div class="description">${element.name}</div>
                <div class="price">
                    <span class="discount">${element.price} ₽</span>
                    
                </div>
            </div>
            <button class="details">В корзину</button>
            </div>  
        `;
        if (element.price < minPrice.value) {
            minPrice.value = element.price;
        }
        if (element.price > maxPrice.value) {
            maxPrice.value = element.price;
        }
        productsContainer.innerHTML += cardSample;
    });
});