export async function getProducts() {
    try {
    const BASE_URL = "https://ecommercebackend.fundamentos-29.repl.co/";
    const response = await fetch(BASE_URL);
    return await response.json();

    } catch (error) {
        console.log(error);
    }
}

export function setLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}
