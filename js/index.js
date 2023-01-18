//----------------------------------------- Appel de l' API qui contient les produits -------------------------------

function fetchCanap() {
    fetch("https://p5-kanap-production.up.railway.app/api/products")
        .then(function (res) {
            if (res.ok)
                return res.json();
        })
        .then(function (products) {
            console.log(products);  // Affiche le contenant de l'API dans la console

            const items = document.getElementById("items"); // Je récupère l'endroit où je vais implémenter mon DOM

            // Je parcours la liste des produits est je créé une variable qui appelle la fonction "buildProductDOM" construite plus bas.
            // J'intègre les produits que j'ai construit, et je l'implémente à l'endroit du DOM voulu.

            for (let product of products) {
                let productDOM = buildProductDOM(product._id, product.name, product.description, product.imageUrl, product.altTxt);
                items.append(productDOM);
            }
        }).catch(function (error) {
            console.log(error);
        });
}

//-----------------------------------------Construction du DOM------------------------------------------

function buildProductDOM(id, name, description, imageUrl, altTxt) {

    let a = document.createElement("a");
    a.href = "./product.html?id=" + id;        // créer une balise "lien" avec un lien de redirection auquel il est ajouté l'id du produit choisit

    let article = document.createElement("article");     // Créer une balise article

    let img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altTxt;                           // créer une balise image et indique le src et alt

    let h3 = document.createElement("h3");
    h3.classList.add('productName');
    h3.textContent = name;                      // créer une balise h3 avec une classe dedans et ajoute un titre

    let p = document.createElement("p");
    p.classList.add('productDescription');
    p.textContent = description;                // créer une balise P avec une classe dedans, et ajoute un texte de description   

    article.append(img);
    article.append(h3);
    article.append(p);                          // insère les éléments img h3 et p dans la balise article
    a.append(article);
    return a;                                   // récupère a, qui est la balise lien qui contient désormais l'article.
}
fetchCanap();