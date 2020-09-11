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
    },
    
    sending: function (url, order) {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function (response) {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        resolve(response = JSON.parse(this.responseText), orderIds.push(new OrderConfirm(response.orderId, JSON.parse(localStorage.getItem('paramOrder')))), localStorage.setItem('orderId', JSON.stringify(orderIds)), localStorage.setItem('contact', JSON.stringify(response.contact)));
                    } else {
                        reject(
                            alert(this.satus, + '\n' + 'Une erreur est survenue, merci de réessayer ultérieurement')
                        )
                    }
                }
            }
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(order));
        })
    }
}