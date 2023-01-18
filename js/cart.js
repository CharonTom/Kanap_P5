let products = [];
let basket = null;

function buildDom() {
  products = [];
  let BuildDomHTML = [];
  const cart_items = document.getElementById('cart__items'); // Je récupère l'endroit où je souhaite implémenter mon DOM
  cart_items.innerHTML = '';

  basket = JSON.parse(localStorage.getItem("MyKanapCart")); // Je récupère les informations du local storage que je met dans la variable "basket"
  if (basket === null || basket == 0) {
    alert('Votre panier est vide, veuillez sélectionner vos produits dans la page d\'acceuil');
    document.querySelector("h1").innerText =
      "Votre panier est vide !";
  } else {

    for (i = 0; i < basket.length; i++) {
      const ID = basket[i].id.split("_")[0]  // Je sépare l'id de la couleur et injecte l'id dans un tableau "products"          
      products.push(ID);                     // Le tableau products qui contient les id est indispensable pour l'envoi du formulaire au serveur


      //---------------------------------------------Construction du DOM-----------------------------------------------------
      // Un article est construit pour chaque tour de boucle jusqu'à ce que tous les produits ont été parcouru

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
      `
        ;
    }
    cart_items.innerHTML += BuildDomHTML;
  }
  getNumberProduct();
  getTotalPrice();
  callRemove();
  callChangeQuantity();
}

buildDom();


//------------------------------------------Option Remove-----------------------------------

function callRemove() {
  const selectSupprimer = document.querySelectorAll(".deleteItem");  // je récupère les boutons "supprimer"

  for (let k = 0; k < selectSupprimer.length; k++) {
    selectSupprimer[k].addEventListener('click', function (e) {
      e.preventDefault();
      removeFromCart(e.target.closest('article').dataset.id);     // j'appel la fonction removeFromCart qui prend en paramètre l'id du produit à supprimer
      buildDom();  // Je rafraichit mon DOM
    });
  }
}
//-----------------------------------------Option ChangeQuantity-----------------------------

function callChangeQuantity() {
  const selectQuantity = document.querySelectorAll(".itemQuantity"); // je récupère les inputs de quantité

  for (let k = 0; k < selectQuantity.length; k++) {
    selectQuantity[k].addEventListener('change', function (e) {
      e.preventDefault();

      const regexInput = /^[1-9][0-9]?$|^100$/    // je met une regex qui permet de contrôler les valeurs saisies

      if (!regexInput.test(e.target.value)) {
        alert('Veuillez sélectionner une valeur entre 1 et 100');
        const storeValue = getQuantity(e.target.closest('article').dataset.id);          // Récupère la quantité du produit dans le local storage
        const value = storeValue === -1 ? parseInt(e.target.defaultValue) : storeValue;
        e.target.value = value;                                                        // Je la réaffecte dans l'input

      } else {
        changeQuantity(e.target.closest('article').dataset.id, e.target.valueAsNumber); // je change la quantité de l'article selectionné
        getNumberProduct();
        getTotalPrice();        // Je recalcul la quantité et le prix total
      }
    });
  }
}

//-------------------------------------------------------Gestion du formulaire----------------------------------------------------------

// Je récupère les sélecteurs du formulaire

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

// ------------------------------------Validation des champs du formulaire-------------------------------------------------

const regexName = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>,;:[\]]{3,20}$/;
const regexAdress = /^[0-9]{1,3} [a-z A-Z éèàùâôûîê-]{3,35}$/;
const regexCity = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/;
const regexMail = /^[a-z0-9._-éèàùâôûîê]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

// Setting firstName

firstName.addEventListener('input', (e) => {

  if (e.target.value.match(regexName)) {
    firstNameError.innerHTML = "";
  } else {
    firstNameError.innerHTML = "Le prénom doit avoir entre 3 et 20 caractères. Sans caractères spéciaux ni chiffres. Les tirets et accents sont acceptés";
  }
})

// Setting Name

lastName.addEventListener('input', (e) => {

  if (e.target.value.match(regexName)) {
    lastNameError.innerHTML = "";
  } else {
    lastNameError.innerHTML = "Le nom doit avoir entre 3 et 20 caractères. Sans caractères spéciaux ni chiffres. Les tirets et accents sont acceptés";
  }
})

// Setting adress

address.addEventListener('input', (e) => {

  if (e.target.value.match(regexAdress)) {
    addressError.innerHTML = "";
  } else {
    addressError.innerHTML = "l'adresse doit commencer par un chiffre (maximum 3)";
  }
})

// Setting City

city.addEventListener('input', (e) => {

  if (e.target.value.match(regexCity)) {
    cityError.innerHTML = "";
  } else {
    cityError.innerHTML = "La ville doit avoir entre 3 et 20 caractères. Sans caractères spéciaux ni chiffres. Les tirets et accents sont acceptés";
  }
})

// Setting Email

email.addEventListener('input', (e) => {

  if (e.target.value.match(regexMail)) {
    emailError.innerHTML = "";
  } else {
    emailError.innerHTML = "Le format de l'adresse mail n'est pas valide";
  }
})


//--------------------------------------------Configuration du bouton commander ---------------------------------------------------


order.addEventListener('click', (event) => {
  event.preventDefault();

  if (basket === null || basket == 0) {
    alert('votre panier est vide, veuillez sélectionner vos produits dans la page d\'acceuil');

  } else {
    if (regexName.test(firstName.value) && regexName.test(lastName.value) && regexCity.test(city.value) && regexAdress.test(address.value) && regexMail.test(email.value) == true) {
      // Si tout les champs saisie sont correcte
      // Je stock les données saisie par l'utilisateur dans un objet contact

      const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      }

      // Je récupère les données du formulaire et les id de mes articles dans le même objet

      const order = {
        contact,
        products
      }

      // j'envoi les données sur l'api au format JSON avec une requête POST

      const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
      };
      fetch("https://p5-kanap-production.up.railway.app/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Je récupère le numéro de commande envoyé par l'API
          localStorage.clear(); // Je supprime tout élément du local storage
          document.location.href = 'confirmation.html?id=' + data.orderId; // Je redirige sur la page confirmation.html et ajoute à l'url le numéro de commande
        })
    } else {
      alert('Veuillez revérifier les informations saisie dans le formulaire')
    }
  }
});
