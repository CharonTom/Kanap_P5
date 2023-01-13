const basket = JSON.parse(localStorage.getItem("MyKanapCart")); // Créer une variable basket qui récupère les données du Local Storage

if (basket === null || basket == 0) {
  alert('votre panier est vide, veuillez sélectionner vos produits dans la page d\'acceuil');
  document.querySelector("h1").innerText =
    "Votre panier est vide !";
}

else {

  let BuildDomHTML = [];
  const cart_items = document.getElementById('cart__items');
  cart_items.innerHTML = '';
  for (i = 0; i < basket.length; i++) {


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
    `
      ;
  }
  cart_items.innerHTML += BuildDomHTML;
}



// ------------------------------ Obtenir le nombre de produit et afficher le prix total -----------------------------------

getNumberProduct();
getTotalPrice();

//------------------------------------------Option Remove-----------------------------------

const selectSupprimer = document.querySelectorAll(".deleteItem");

for (let k = 0; k < selectSupprimer.length; k++) {
  selectSupprimer[k].addEventListener('click', function (e) {
    e.preventDefault();



    //alert('element supprimé')
    removeFromCart(e.target.closest('article').dataset.id);
    window.location.href = "cart.html";

    getNumberProduct();
    getTotalPrice();

  });
}
//-----------------------------------------Option ChangeQuantity-----------------------------

const selectQuantity = document.querySelectorAll(".itemQuantity");

for (let k = 0; k < selectQuantity.length; k++) {
  selectQuantity[k].addEventListener('change', function (e) {
    e.preventDefault();
    //alert('cooucou');
    let value = parseInt(e.target.value);

    if (value < 1 || value > 100) {
      alert('Veuillez sélectionner une valeur entre 1 et 100');
      value = parseInt(e.target.defaultValue)
    }

    changeQuantity(e.target.closest('article').dataset.id, value, false);
    getNumberProduct();
    getTotalPrice();

  });
}



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

// -------------------------------Validation des champs du formulaire-------------------------------------------------

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


//------------------------------------Configuration du bouton commander ---------------------------------------------------


order.addEventListener('click', (event) => {
  event.preventDefault();

  if (basket === null || basket == 0) {
    alert('votre panier est vide, veuillez sélectionner vos produits dans la page d\'acceuil');

  } else {
    if (regexName.test(firstName.value) && regexName.test(lastName.value) && regexCity.test(city.value) && regexAdress.test(address.value) && regexMail.test(email.value) == true) {


      //Je stock les données saisie par l'utilisateur dans un objet
      //Je les enregistre dans le Local Storage au format JSON

      const formData = {
        firstNameData: firstName.value,
        lastNameData: lastName.value,
        addressData: address.value,
        cityData: city.value,
        emailData: email.value
      }
      localStorage.setItem('formData', JSON.stringify(formData));

      // Je récupère les données du formulaire ET du panier dans le même objet

      const Basket_And_FormData = {
        basket,
        formData
      }

    } else {
      alert('Veuillez revérifier les informations saisie dans le formulaire')
    }
  }
});
