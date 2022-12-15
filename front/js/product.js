const fetchCanap = async () => {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok)
                return res.json();
        })
        .then(function(canapeDatas) {
            console.log(canapeDatas);
            

            let product;

            for (var canape of canapeDatas) {
                if(canape._id == idParametre){
                    product=canape;
                }
            }

            console.log(products);

            document.getElementById("title").innerText = product.name;
        }).catch(function(error){
            console.log(error);
        });
};


fetchCanap();