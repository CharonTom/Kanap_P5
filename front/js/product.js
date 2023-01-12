
//---------------------- Je récupère l'id du produit séléctionné à partir de l'Url de ma page---------------------


const url = new URL(window.location.href);      //  Créer une variable qui récupere l'URL courante.

const idProduct = url.searchParams.get("id");   // Je récupere l'id de mon produit par l'URL
console.log(idProduct);



//---------------------------------Je récupère les Sélecteurs------------------------------------

const titleProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const imgProduct = document.querySelector(".item__img");
const colorsProduct = document.getElementById("colors");
const addCartBtn = document.getElementById("addToCart");
const idQuantity = document.getElementById("quantity");

let imgurl, alttxt;


//---------------------------Je rappel l'API en spécifiant cette fois ci le produit concerné ------------------------------


function fetchProduit() {
    fetch("http://localhost:3000/api/products/" + idProduct) // Récupère les Détails du produit sélectionné
        .then(function (res) {
            if (res.ok)
                return res.json();
        })
        .then(function (productDetail) {
            console.log(productDetail);


            //-------------------------------------Introduit les éléments dans le DOM-------------------------------------


            titleProduct.innerText = productDetail.name;
            descriptionProduct.innerText = productDetail.description;
            priceProduct.innerText = productDetail.price;
            const img = document.createElement("img");
            imgProduct.append(img);
            img.src = productDetail.imageUrl;
            img.alt = productDetail.altTxt;
            imgurl = productDetail.imageUrl;
            alttxt = productDetail.altTxt;

            for (let i of productDetail.colors) {    // parcours les couleurs dans la liste de couleur
                let colorsOption = document.createElement("option");
                colorsOption.value = i;              // Créer l'attribut value dans la balise html 'option' et lui indique la valeur de i
                colorsOption.innerText = i;          // Indique la valeur de i avec ça valeur string.
                colorsProduct.append(colorsOption);  // Insère la balise option dans la balise select
            };



            //---------------------------------Parametrage du bouton Ajouter --------------------------------

            // je configure un eventListener quand l'utilisateur clique sur ajouter au panier

            addCartBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const cartId = idProduct + "_" + colorsProduct.value; // je personnalise l' id de chaque produit en y ajoutant sa couleur afin de me facilité la manipulation des mes id

                if (colorsProduct.value === "") {
                    alert('Veuillez selectionner une couleur');
                } else {

                    if (Number(idQuantity.value) < 1 || Number(idQuantity.value) > 100) {
                        alert('Veuillez selectionner une valeur entre 1 et 100');
                    } else {
                        addCart(cartId, Number(idQuantity.value));   // Appel la fonction ""Ajouter au panier"

                        alert(" Le canapé " + productDetail.name + " de couleur " + colorsProduct.value + " a été ajouté " + idQuantity.value + " fois dans le panier ")
                    }
                }
            })

        }).catch(function (error) {
            console.log(error);
        });
}


fetchProduit();