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
        link = template.getElementById(('link'))
        link.href = 'src/pages/products.html?type=' + productType + '&id=' + p._id
        item.setAttribute('data-product-id', i)
        item.addEventListener('click', Dom.showProductPage)
        Dom.productsList.appendChild(template)
        })
    },
    refreshProductsList: function () {
        document.getElementById('products-list').innerHTML = " "
    },
    buildTeddiesItems: async function () {
    },
    // showProductPage: function (productId) {
    //     // const productId = e.currentTarget.dataset.productId
    //     // console.log(`je suis clické depuis le produit numéro ${productId}`)
    //     const url = ProductApi.baseUrl(productType)
    //     const products = await ProductApi.getProducts(url)

    // }
}

let tag = Dom.buildProducts
let deTag = Dom.refreshProductsList

let isClicked = true
console.log(isClicked)

function getItems(currentParam) {
    isClicked = !isClicked
    console.log(isClicked)
    console.log(currentParam)
    if (isClicked === true && (currentParam === 'teddies' || currentParam === 'cameras' || currentParam === 'furniture')) {
        return deTag()
    }
    if (isClicked === false) {
        return tag(currentParam)
    }
}
