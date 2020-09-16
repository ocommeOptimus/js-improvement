import "regenerator-runtime/runtime";

const Dom = {
    isClicked: false,
    currentParam: '',
    productCategory: ['teddies', 'cameras', 'furniture'],
    catalog: document.getElementById('catalog'),
    product: document.getElementById('template-index'),

    buildProducts: async function (productType) {
        const url = ProductApi.baseUrl(productType)
        const products = await ProductApi.getProducts(url)

        products.forEach((p, i) => {
            const template = document.importNode(Dom.product.content, true)
            const item = template.getElementById('products')
            let link = template.getElementById('link')
            link.href = 'assets/pages/product.html?type=' + productType + '&id=' + p._id
            let productName = template.getElementById('title')
            productName.innerHTML = p.name
            let image = template.getElementById('image')
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

    showProductPage: function (param) {   
        if ((Dom.isClicked == true && Dom.currentParam == '') || (Dom.isClicked == true && Dom.currentParam == param)) {
            Dom.currentParam = param
            Dom.buildProducts(Dom.currentParam)
        }
        if (Dom.isClicked == false && Dom.currentParam != param) {
            Dom.currentParam = param
            Dom.isClicked = !Dom.isClicked
            Dom.refreshProductsList()
            Dom.buildProducts(Dom.currentParam)
        }
        if (Dom.isClicked == false && Dom.currentParam == param) {
            Dom.currentParam = ''
            Dom.refreshProductsList()
        }
    },

    toggleItems: function () {
        
        function show(e) {
            Dom.isClicked = !Dom.isClicked
            Dom.showProductPage(e.currentTarget.id)
        }

        for (let x = 0; x < Dom.productCategory.length; x++) {
            document.getElementById(Dom.productCategory[x]).addEventListener("click", show, false)
        }
    },

    getItems: function () {
               
        if (window.location.pathname == '/index.html') {
            Dom.toggleItems()
        }
    },

    cartProductsNumber: function () {
      let productsAdded = JSON.parse(localStorage.getItem('cart')).length
      document.getElementById('cart-num').innerHTML = "( " + productsAdded + " )"
    },

    updateCartNumber: function () {
        if (JSON.parse(localStorage.getItem('cart')) !== null) {
            Dom.cartProductsNumber()
        }
        else {
            document.getElementById('cart-num').innerHTML = '(' + 0 + ')'
        }
    }
}

window.onload = Dom.updateCartNumber(), Dom.getItems()