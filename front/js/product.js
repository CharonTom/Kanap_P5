const url = new URL(window.location.href);      //  Créer une variable qui récupere l'URL courante.

const idProduct = url.searchParams.get("id");   // Créer une variable qui récupere l'id de l'URL
console.log(idProduct);                       // Affiche cette varaible


//-----------------------Recupère les Sélecteurs----------------------

const titleProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const imgProduct = document.querySelector(".item__img");
const colorsProduct = document.getElementById("colors");
const addCartBtn = document.getElementById("addToCart");
const idQuantity = document.getElementById("quantity");




function fetchProduit() {
    fetch("http://localhost:3000/api/products/" + idProduct) // Récupère les Détails du produit sélectionné
        .then(function (res) {
            if (res.ok)
                return res.json();
        })
        .then(function (productDetail) {
            console.log(productDetail);


            //---------Introduit les éléments dans le DOM-----------


            titleProduct.innerText = productDetail.name;
            descriptionProduct.innerText = productDetail.description;
            priceProduct.innerText = productDetail.price;
            const img = document.createElement("img");
            imgProduct.append(img);
            img.src = productDetail.imageUrl;
            img.alt = productDetail.altTxt;

            for (let i of productDetail.colors) {    // parcours les couleurs dans la liste de couleur
                let colorsOption = document.createElement("option");
                colorsOption.value = i;              // Créer l'attribut value dans la balise option et lui indique la valeur de i
                colorsOption.innerText = i;          // Indique la valeur de i avec ça valeur string.
                colorsProduct.append(colorsOption);  // créer une balise option qui est insérée dans la balise select
            };


            addCartBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const cartId = idProduct + "_" + colorsProduct.value;

                if (colorsProduct.value === "") {
                    alert('Veuillez selectionner une couleur');
                } else {

                    if (Number(idQuantity.value) <= 0 || Number(idQuantity.value) > 100) {
                        alert('Veuillez selectionner une valeur entre 0 et 100');
                    } else {
                        addCart(cartId, Number(idQuantity.value));

                        alert(" Le canapé " + productDetail.name + " de couleur " + colorsProduct.value + " a été ajouté " + idQuantity.value + " fois dans le panier ")
                    }
                }
            })




        }).catch(function (error) {
            console.log(error);
        });
}


fetchProduit();