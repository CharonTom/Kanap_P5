// Enregistre le panier qui s'appelle MyKanapCart dans le local storage

function saveCart(Cart) {
    localStorage.setItem("MyKanapCart", JSON.stringify(Cart));
}


// Récupère le contenu de se panier nommé MyKanapCart , si le panier est null un tableau vide et retourné

function getCart() {
    let Cart = localStorage.getItem("MyKanapCart");

    if (Cart == null) {
        return [];
    }
    else {
        return JSON.parse(Cart);
    }
}

/* 
 Ajouter un produit dans le panier
*/
function addCart(_id, quantity) {
    let Cart = getCart();
    const Index = Cart.findIndex(
        p => p.id === _id
    );
    if (Index !== -1) {
        Cart[Index].quantity += quantity;

    }
    else {
        const product = {
            id: _id,
            quantity: quantity,
            name: title.textContent,
            price: price.textContent,
            color: colors.value,
            imgurl: imgurl,
            alttxt: alttxt
        }
        Cart.push(product);
    }
    saveCart(Cart); // On sauvegarde le panier
}


// Supprime un article du panier

function removeFromCart(_id) {
    let Cart = getCart();
    Cart = Cart.filter(p => p.id != _id);
    saveCart(Cart);
}

// Change la quantité d'un produit

function changeQuantity(_id, quantity) {
    let Cart = getCart();
    let foundProduct = Cart.find(
        p => p.id == _id
    );
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromCart(foundProduct);
        }
        else {
            saveCart(Cart);
        }
    }
}

// La somme des articles

function getNumberProduct() {
    const totalQuantity = document.getElementById('totalQuantity');
    let Cart = getCart();
    let number = 0;
    for (let product of Cart) {
        number += product.quantity;
    }
    totalQuantity.textContent = number;

}

// La somme des prix

function getTotalPrice() {
    const totalPrice = document.getElementById('totalPrice');
    let Cart = getCart();
    let total = 0;
    for (let product of Cart) {
        total += product.quantity * product.price;
    }
    totalPrice.textContent = total;
    return total
}


