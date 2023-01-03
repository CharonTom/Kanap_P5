function fetchCanap() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok)
                return res.json();
        })
        .then(function (products) {
            console.log(products);  // Affiche le contenant de l'API dans la console

            const items = document.getElementById("items"); // Créer une variable Items qui va récuper l'ID "items" dans le code HTML

            for (let product of products) { // parcours la liste des produits

                let productDOM = buildProductDOM(product._id, product.name, product.description, product.imageUrl, product.altTxt);
                 // Créer une variable qui récupère la fonction "buildProductDOM" construite plus bas.
                console.log(productDOM);
                items.append(productDOM);
            }

        }).catch(function (error) {
            console.log(error);
        });
}




function buildProductDOM(id, name, description, imageUrl, altTxt) {
    
    let a = document.createElement("a");
    a.href = "./product.html?id=" + id;          // créer une balise a et Indique le lien dans cette balise

    let article = document.createElement("article");     // Créer une balise article

    let img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altTxt;                             // Créer une balise image et indique le src et alt

    let h3 = document.createElement("h3");
    h3.classList.add('productName');
    h3.textContent = name;                        // Créer une balise h3 avec une classe dedans, et ajoute un titre

    let p = document.createElement("p");
    p.classList.add('productDescription');
    p.textContent = description;                 // Créer une balise P avec une classe dedans, et ajoute un text de description   

    article.append(img);
    article.append(h3);
    article.append(p);                                   // insere les éléments img h3 et p dans la balise article
    a.append(article);
    return a;  // récupere a, qui est la balise liens qui contient désormais l'article.
}



fetchCanap();