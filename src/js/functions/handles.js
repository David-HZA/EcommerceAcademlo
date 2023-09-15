import {setLocalStorage} from "./helpers.js"
import {drawPRoducts, drawProductsInCart, drawTotal} from './draw.js'


export function handleCartShow() {
    document.querySelector(".bx-cart").addEventListener('click', () => { 
        document.querySelector(".cart").classList.add("cart--show")
        document.querySelector(".bx-x").addEventListener('click', function(){
            document.querySelector(".cart").classList.remove("cart--show")
        })
    })
}

export function handleAddCart (db) {
    document.querySelector(".products").addEventListener('click', (e) => {
        if (e.target.classList.contains("bxs-cart-add")) {
            const id = Number(e.target.id);

            let productFound = db.products.find((product) => product.id === id)

            if(db.cart[id]){
                if (db.cart[id].amount === db.cart[id].quantity)
                    return alert("No hay mas en Stock")

                db.cart[id].amount += 1
            } else {
                db.cart[id] = {
                    ...productFound,
                    amount: 1,
                }
            }

                setLocalStorage("cart", db.cart)
                drawProductsInCart(db)
                drawTotal(db)

        }
    })
}

export function handleOptionsCart(db) {
    document.querySelector(".cart__products").addEventListener("click", (e) => {

        if (e.target.classList.contains("bx-minus")){
            const id = Number(e.target.parentElement.id)
            if (db.cart[id].amount === 1) {
                const response = confirm(
                    "seguro quieres eliminar este producto?"
                    )
                if (!response) return
                delete db.cart[id]
            } else {
                db.cart[id].amount -= 1
            }
        }

        if(e.target.classList.contains("bx-plus")){
            const id = Number(e.target.parentElement.id)

            if (db.cart[id].amount === db.cart[id].quantity)
                return alert("No hay mas en Stock")

            db.cart[id].amount += 1
        }

        if(e.target.classList.contains("bx-trash-alt")){
            const id = Number(e.target.parentElement.id)
            const response = confirm("seguro quieres eliminar este producto?")
            if (!response) return
            delete db.cart[id]
        }

        setLocalStorage("cart", db.cart)

        drawProductsInCart(db)
        drawTotal(db)
})
}

export function handleBuy(db) {
    document.querySelector(".btn__buy").addEventListener("click", () =>{
        if (Object.values(db.cart).length === 0)
            return alert("primero compra algo")

        const response = confirm("seguro quieres comprar?")
        if(!response) return
        let newProducts = []

        for (const product of db.products) {
            if(db.cart[product.id]) {
                newProducts.push({
                    ...product,
                    quantity: product.quantity - db.cart[product.id].amount
                })
            } else {
                newProducts.push(product)
            }
        }

        db.products = newProducts
        db.cart = {}

        setLocalStorage("products", db.products)
        setLocalStorage("cart", db.cart)

        drawProductsInCart(db)
        drawPRoducts(db)
        drawTotal(db)
    })
}
