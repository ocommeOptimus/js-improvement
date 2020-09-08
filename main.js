const Dom = {
    teddiesList: document.getElementById('teddies'),
    product: document.getElementById('template-product'),

    buildTeddiesItems: async function () {
        console.log('loading ...')
        const products = await ProductApi.getProducts()
        let id
        console.log(products)

        products.forEach((p, i) => {
            const template = document.importNode(Dom.product.content, true)
            const item = template.getElementById('product')
            id = template.getElementById(('title'))
            id.innerHTML = p._id
            item.setAttribute('data-product-id', i)
            item.addEventListener('click', Dom.showProductPage)
            Dom.teddiesList.appendChild(template)
        })
        console.log(products)
    },

    showProductPage: function (e) {
        const productId = e.currentTarget.dataset.productId
        console.log(`je suis clické depuis le produit numéro ${productId}`)
    }
}
if (window.getItems = ProductApi.baseUrl) {
    ProductApi.getProducts
    Dom.buildTeddiesItems
}