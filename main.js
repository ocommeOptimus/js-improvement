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
        link.href = 'assets/pages/products.html?type=' + productType + '&id=' + p._id
        item.setAttribute('data-product-id', i)
        item.addEventListener('click', Dom.showProductPage)
        Dom.productsList.appendChild(template)
        })
    },
    refreshProductsList: function () {
        document.getElementById('products-list').innerHTML = " "
    },
/*     showProductDetails: async function (productId) {
        const urlItem = ProductApi.idUrl(productId)
        const productDetails = await ProductApi.getOneProduct(urlItem)
    }, */
    showProductPage: async function (param) {
        let tag = Dom.buildProducts
        let deTag = Dom.refreshProductsList

        console.log(isClicked)
        console.log(param)
        if (isClicked === true && (param === 'teddies' || param === 'cameras' || param === 'furniture')) {
            deTag()
        }
        if (isClicked === false) {
            tag(param)
        }
    },
    cartProductsNumber: function () {
        let productsAdded;
        if (JSON.parse(localStorage.getItem('cart')) === null) {
            productsAdded = 0;
        }
        else {
          productsAdded = JSON.parse(localStorage.getItem('cart')).length;
          if (document.querySelector('#btn-cart')) {
              document.querySelector('#cart-num').innerHTML = "( " + productsAdded + " )";
          }
          else {
              document.querySelector('#cart-num').innerHTML = "( " + productsAdded + " )";
          }
        }
    },
}

let isClicked = true

function getItems(currentParam) {
    isClicked = !isClicked
    Dom.showProductPage(currentParam)   
}

