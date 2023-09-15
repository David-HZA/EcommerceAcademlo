import {getProducts, setLocalStorage} from './functions/helpers.js'
import {drawPRoducts, drawProductsInCart, drawTotal} from './functions/draw.js'
import {handleAddCart, handleBuy, handleCartShow, handleOptionsCart} from './functions/handles.js'


async function main() {
    // ! Base de Datos
    const db = {
        products:
            JSON.parse(localStorage.getItem("products")) ||
            (await getProducts()),
        cart: JSON.parse(localStorage.getItem("cart")) || {},
    }

    // ! funciones Modularizadas
    drawPRoducts(db)
    handleCartShow()
    handleAddCart(db)
    drawProductsInCart(db)
    handleOptionsCart(db)
    drawTotal(db)
    handleBuy(db)
}

window.addEventListener("load", main);
