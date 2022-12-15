function fetchCanap() {
    fetch("http://localhost:3000/api/products")

        .then(function (res) {
            if (res.ok)
                return res.json();
        })
        .then(function (canapeDatas) {
            console.log(canapeDatas);


            let products = '';

            for (var canape of canapeDatas) {
                products += '<a href="./product.html?id=' + canape._id + '" ><article><img src="' + canape.imageUrl + '" alt="' + canape.altTxt + '"><h3 class="productName">' + canape.name + '</h3><p class="productDescription">' + canape.description + '</p></article></a>';
            }

            console.log(products);
            document.getElementById("items").innerHTML = products;
    

        }).catch(function (error) {
            console.log(error);
        });
};


fetchCanap();