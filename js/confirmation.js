function getOrderId() {
    const orderId = document.getElementById('orderId'); 
    const url = new URL(window.location.href); 
    orderId.innerText = url.searchParams.get("id"); // Je récupère l'id dans l'url et l'affiche dans le DOM
    alert('Nous vous remercions d\'avoir fait vos courses chez KANAP !\nVeuillez prendre note de votre numéro de commande')
};
getOrderId();
