export function drawPRoducts (db) {
    let html = ""

    for (const {id, category, image, name, price, quantity }  of db.products) {
        const iconAdd = quantity
        ? `<i class='bx bxs-cart-add' id="${id}"></i>`
        : "<h4>Agotado</h4>"

        html +=  `
        <div class="product">

            <div class="product__img">
                <img src="${image}" alt="" />
            </div>

            <div class="product__info">
                <h3>${name} | <span>${category}</span></h3>
                <p>
                    ${price}.0 USD <strong>${quantity}units</strong>
                </p>

                ${iconAdd}
            </div>

        </div>
        `;
    }

    console.log(db.products);
    document.querySelector(".products").innerHTML = html
}

export function drawProductsInCart(db) {
    let html = ""

    for (const {id, amount, image, price, name} of Object.values(db.cart)) {
        html += `
        <div class="cart__product">
            <div class="cart__product__img">
                <img src="${image}" alt="" />
            </div>

            <div class="cart__product__info">
                <h4>${name}</h4>
                <p>${price}.0 USD</p>
                <p>${price * amount}.00 USD</p>

                <div class="product__info__opt" id="${id}" >
                    <i class='bx bx-minus'></i>
                    <span>${amount}</span>
                    <i class='bx bx-plus'></i>
                    <i class='bx bx-trash-alt' ></i>
                </div>
            </div>
        </div>
        `;
    }


    document.querySelector(".cart__products").innerHTML = html
}

export function drawTotal(db) {
    const totalItems = document.querySelector("#totalItems")
    const totalMoney = document.querySelector("#totalMoney")

    let items = 0
    let money = 0

    for (const { amount, price } of Object.values(db.cart)) {
        items += amount
        money += amount * price
    }

    totalItems.textContent = `${items} items`
    totalMoney.textContent = `total ${money}.00 USD`
    document.querySelector(".amountProductInCart").textContent = items
}