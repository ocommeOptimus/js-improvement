const Dom = {
    productsList: document.getElementById('products-list'),
    product: document.getElementById('template-product'),

    buildProducts: async function (productType) {
        const url = ProductApi.baseUrl(productType)
        const products = await ProductApi.getProducts(url)
        products.forEach((p, i) => {
            const template = document.importNode(Dom.product.content, true)
            const item = template.getElementById('product')
            id = template.getElementById(('title'))
            id.innerHTML = p._id
            item.setAttribute('data-product-id', i)
            item.addEventListener('click', Dom.showProductPage)
            Dom.productsList.appendChild(template)
        }) 
    },
    buildTeddiesItems: async function () {
        console.log('loading ...')
        let id

        console.log(products)
    },

    showProductPage: function (e) {
        const productId = e.currentTarget.dataset.productId
        console.log(`je suis clické depuis le produit numéro ${productId}`)
    }
}
window.getItems = Dom.buildProducts
