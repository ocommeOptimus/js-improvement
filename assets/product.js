const Dom = {
    productDescription: document.getElementById('product-details'),
    productInfo: document.getElementById('template-product-details'),
     
    showProductPage: async function (productId) {
        let firstProperty = ""
        let queryStr = window.location.search
        let urlStr = new URLSearchParams(queryStr)

        const urlItem = ProductApi.idUrl(productId)
        const productDetails = await ProductApi.getProducts(urlItem)
        
        const template = document.importNode(Dom.productInfo.content, true)
        const item = template.getElementById('product-information')
        id = template.getElementById('title-product')
        id.innerHTML = productDetails._id
        Dom.productDescription.appendChild(template)

        function getAllOptions(value) {
            productDetails[value].forEach((value, i) => {
                optionSelect = document.getElementById('option-select')
                optionChoice = document.createElement('option')
                optionValue = document.createTextNode(value)
                optionChoice.appendChild(optionValue)
                optionSelect.appendChild(optionChoice)
            }) 
        }

        switch (urlStr.get('type')) {
            case "teddies":
                firstProperty = 'colors';
                break;
            case "cameras":
                firstProperty = 'lenses';
                break;
            case "furniture":
                firstProperty = "varnish";
                break;
        }

        getAllOptions(firstProperty)

        // const productId = e.currentTarget.dataset.productId
        // console.log(`je suis clické depuis le produit numéro ${productId}`)
    }
}


window.onload = Dom.showProductPage