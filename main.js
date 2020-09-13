const Dom = {
    catalog: document.getElementById('catalog'),
    product: document.getElementById('template-index'),

    buildProducts: async function (productType) {
        const url = ProductApi.baseUrl(productType)
        const products = await ProductApi.getProducts(url)

        products.forEach((p, i) => {
            const template = document.importNode(Dom.product.content, true)
            const item = template.getElementById('products')
            link = template.getElementById('link')
            link.href = 'assets/pages/product.html?type=' + productType + '&id=' + p._id
            productName = template.getElementById('title')
            productName.innerHTML = p.name
            image = template.getElementById('image')
            image.src = p.imageUrl
            image.alt = 'Image de l\'article : ' + p.name
            image.title = 'Image de l\'article : ' + p.name
            item.setAttribute('id', 'products-' + i)
            Dom.catalog.appendChild(template)
        })
    },

    refreshProductsList: function () {
        document.getElementById('catalog').innerHTML = " "
    },

    showProductPage: async function (param) {
        let tag = Dom.buildProducts
        let deTag = Dom.refreshProductsList

        if (isClicked === true && (param === 'teddies' || param === 'cameras' || param === 'furniture')) {
            deTag()
        }
        if (isClicked === false) {
            tag(param)
        }
    },

    cartProductsNumber: function () {
      productsAdded = JSON.parse(localStorage.getItem('cart')).length
      document.getElementById('cart-num').innerHTML = "( " + productsAdded + " )"
    }
}

let isClicked = true

function getItems(currentParam) {
    isClicked = !isClicked
    Dom.showProductPage(currentParam)   
}

function updateCartNumber() {
    if (JSON.parse(localStorage.getItem('cart')) !== null) {
        Dom.cartProductsNumber()
    }
    else {
        document.getElementById('cart-num').innerHTML = '(' + 0 + ')'
    }
}

window.onload = updateCartNumber()