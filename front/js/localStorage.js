// La fonction saveCart() utilise la méthode setItem() avec un duo clé-valeur 
// Elle les ajoute dans le local storage, si la clé existe déjà elle met à jour la valeur

function saveCart(Cart) {
    localStorage.setItem("MyKanapCart", JSON.stringify(Cart));
}

// La fonction getCart() utilise la méthode getItem() qui récupère la valeur associée à la clé.
// Je récupère donc le contenu du panier nommé MyKanapCart, si le panier est null un tableau vide et retourné

function getCart() {
    let Cart = localStorage.getItem("MyKanapCart");

    if (Cart == null) {
        return [];
    }
    else {
        return JSON.parse(Cart);
    }
}


//-------------------- Ajouter un produit dans le panier------------


function addCart(_id, quantity) {
    let Cart = getCart();                                      // Récupère les valeurs du Local Storage et les met dans la variable Cart
    const Index = Cart.findIndex(p => p.id === _id);           // On parcours ces valeurs
    if (Index !== -1) {
        Cart[Index].quantity += quantity;                      // Si le produit ajouté existe déjà, les quantités s'additionnent

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
        Cart.push(product);                      // Sinon on récupère les données du produit qu'on veut ajouter et on les poussent dans le Local Storage
    }
    saveCart(Cart);                              // On sauvegarde le panier
}




//-------------------------------------Supprimer un article du panier------------------------------------

function removeFromCart(_id) {
    let Cart = getCart();
    Cart = Cart.filter(p => p.id != _id);
    saveCart(Cart);
}

//------------------------------------ Change la quantité d'un produit----------------------------------

function changeQuantity(_id, quantity, isAddition = true) {
    let Cart = getCart();
    let foundProduct = Cart.find(
        p => p.id == _id
    );
    if (foundProduct != undefined) {
        if (!isAddition) {
            foundProduct.quantity = quantity;
        } else {
            foundProduct.quantity += quantity;
        }

        if (foundProduct.quantity <= 0) {
            removeFromCart(foundProduct);
        }
        else {
            saveCart(Cart);
        }
    }
}

function getQuantity(_id) {
    let Cart = getCart();
    let foundProduct = Cart.find(
        p => p.id == _id
    );
    if (foundProduct != undefined) {
        return foundProduct.quantity;
    }
    return -1;
}



//------------------------------------- La somme des articles----------------------------------
// La fonction getNumberProduct relève la quantité de produits dans le localStorage et les affiches dans la page Panier

function getNumberProduct() {
    const totalQuantity = document.getElementById('totalQuantity');
    let Cart = getCart();
    let number = 0;
    for (let product of Cart) {
        number += product.quantity;
    }
    totalQuantity.textContent = number;

}

//----------------------------------- La somme des prix-----------------------------
// La fonction getTotalPrice() calcule le prix total des produits et les affiches dans la page Panier

function getTotalPrice() {
    const totalPrice = document.getElementById('totalPrice');
    let Cart = getCart();
    let total = 0;
    for (let product of Cart) {
        total += product.quantity * product.price;
    }
    totalPrice.textContent = total;
}


