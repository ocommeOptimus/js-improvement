const ProductApi = {
    baseUrl: 'http://localhost:3000/api/teddies',

    getProducts: async function () {
        /*const products = await fetch(ProductApi.baseUrl)*/
        // fetch une vrai api
        var items = [];
        const products = await fetch(ProductApi.baseUrl)
        .then(function (response) {
            if (!response.ok) {
              throw new Error('HTTP error, status = ' + response.status);
            }
            return response.json();
        })
        .then(function (json) {
            console.log(json)
            for (let obj of json) {
            items.push(obj)
            } 
        })
        .catch(function (error) {
                console.log(error);
        })
        console.log('caca')
        console.log(items)
        console.log('pipi')
    },

    getProduct: function (id) {
        console.log('Get a single product')
    },

    createOrder: function () {
        console.log('Create an order')
    }
}