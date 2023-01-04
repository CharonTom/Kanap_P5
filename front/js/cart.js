const Cart = localStorage.getItem("MyKanapCart");

if (Cart === null || Cart == 0) {
    alert('votre panier est vide, veuillez sélectionner vos produits dans la page d\'acceuil');
    document.querySelector("h1").innerText =
        "Votre panier est vide !"
} else {
    console.log(Cart);  
}