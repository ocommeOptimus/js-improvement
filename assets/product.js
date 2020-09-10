const Dom = {
    productDescription: document.getElementById('product-details'),
    productInfo: document.getElementById('template-product-details'),
    
    showProductPage: async function (productId) {
        
        const urlItem = ProductApi.idUrl(productId)
        const productDetails = await ProductApi.getProducts(urlItem)
        
        const template = document.importNode(Dom.productInfo.content, true)
        const item = template.getElementById('product-information')
        id = template.getElementById(('title-product'))
        id.innerHTML = productDetails._id
        Dom.productDescription.appendChild(template)

        // const productId = e.currentTarget.dataset.productId
        // console.log(`je suis clické depuis le produit numéro ${productId}`)
    }
}


window.onload = Dom.showProductPage