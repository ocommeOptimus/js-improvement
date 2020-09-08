const ProductApi = {
    baseUrl: async function getItems(param) {
        linkToSpecificProduct = 'http://localhost:3000/api/'+ param
        console.log(linkToSpecificProduct)
        return await linkToSpecificProduct
    },

    getProducts: async function () {
        /*const products = await fetch(ProductApi.baseUrl)*/
        // fetch une vrai api

        return await fetch(ProductApi.baseUrl)
        .then(function (response) {
            if (!response.ok) {
              throw new Error('HTTP error, status = ' + response.status);
            }
            return response.json();
        })
        .then(function (json) {
            console.log(json)
            return json;
        })
        .catch(function (error) {
                console.log(error);
        })
    },

    getProduct: function (id) {
        console.log('Get a single product')
    },

    createOrder: function () {
        console.log('Create an order')
    }
}