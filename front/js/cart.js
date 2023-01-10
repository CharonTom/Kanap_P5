 

const Cart = [];                                                // Créer un tableau vide "Cart"
const basket = JSON.parse(localStorage.getItem("MyKanapCart")); // Créer une variable basket qui récupère les données du Local Storage
console.log(basket);
let idBasket;
let qttBasket;

if (basket === null || basket == 0) {
    alert('votre panier est vide, veuillez sélectionner vos produits dans la page d\'acceuil');
    document.querySelector("h1").innerText =
        "Votre panier est vide !";
}

else {

  let BuildDomHTML = [];
 
  for (i = 0; i < basket.length; i++) {
  Cart.push(basket[i]);                   // Les valeurs du local Storage sont parcourus et poussé dans le tableau "Cart", cela me servivra pour le formulaire

  idBasket = basket[i].id;
  qttBasket = basket[i].quantity;


  //-------------------------------------Construction du DOM---------------------------------------
  // Un article est construit pour chaque tour de boucle jusqu'à ce que tout les produits ai été parcourus
 
  BuildDomHTML = BuildDomHTML + `
    
    <article class="cart__item" data-id="${basket[i].id}" data-color="${basket[i].color}">
    <div class="cart__item__img">
      <img src="${basket[i].imgurl}" alt="${basket[i].alttxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${basket[i].name}</h2>
        <p>${basket[i].color}</p>
        <p>${basket[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  
  }

  if (i === basket.length) {                                    // Quand i à parcourus tout le panier, le DOM construit est injecté dans la page à l'endroit voulu
  const cart_items = document.getElementById('cart__items');
  cart_items.innerHTML += BuildDomHTML;
  }


  
}


// ------------------------------ Obtenir le nombre de produit et afficher le prix total -----------------------------------

getNumberProduct();
getTotalPrice();



//------------------------------------------Option Remove-----------------------------------

const selectSupprimer = document.querySelectorAll(".deleteItem");

for (let k = 0; k < selectSupprimer.length; k++) {
selectSupprimer[k].addEventListener('click' , function (e) {
e.preventDefault();

//alert('element supprimé')
removeFromCart(idBasket);
window.location.href = "cart.html";

});
}
//-----------------------------------------Option ChangeQuantity-----------------------------

const selectQuantity = document.querySelectorAll(".itemQuantity");

for (let k = 0; k < selectQuantity.length; k++) {
selectQuantity[k].addEventListener('change' , function (e) {
  e.preventDefault();
  //alert('cooucou');
  
  changeQuantity(idBasket,qttBasket);
  
  });}




//---------------------------------Construire dans le DOM --------------------------------------

//function BuiltCartDOM(imageUrl, altTxt, name , color, price) {

   /*  let article = document.createElement("article");
    article.classList.add('cart__item');

    let divImg = document.createElement("div");
    divImg.classList.add('cart__item__img');

    let img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altTxt;

    let divContent = document.createElement("div");
    divContent.classList.add('cart__item__content');

    let divContentD = document.createElement("div");
    divContentD.classList.add('cart__item__content__description');

    let h2 = document.createElement("h2");
    h2.textContent = name;                       

    let p1 = document.createElement("p");
    p1.textContent = color;

    let p2 = document.createElement("p");
    p2.textContent = price;

    let divSetting = document.createElement("div");
    divSetting.classList.add('cart__item__content__settings');

    let divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")

                                 
    
    return article; };  */




//-------------------------------------------------------Gestion du formulaire----------------------------------------------------------

//Je récupère les sélecteurs du Formulaire

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");


// Récupération des messages d'erreur

const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameError = document.getElementById("lastNameErrorMsg");
const addressError = document.getElementById("addressErrorMsg");
const cityError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");


// Récupération du bouton de confirmation

const confirm = document.getElementById("order");




