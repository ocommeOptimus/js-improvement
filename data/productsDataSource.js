const ProductApi = {
    baseUrl: function (param) {
        return 'http://localhost:3000/api/'+ param
        
    },
    idUrl: function () {
        let queryStr = window.location.search
        let urlStr = new URLSearchParams(queryStr)
        return 'http://localhost:3000/api/' + urlStr.get('type') + "/" + urlStr.get("id")
    },

    getProducts: async function (url) {
        /*const products = await fetch(ProductApi.baseUrl)*/
        // fetch une vrai api

        return await fetch(url)
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
    }
}