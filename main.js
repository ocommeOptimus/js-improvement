const Dom = {
    catalog: document.getElementById('catalog'),
    product: document.getElementById('template-index'),
    productDescription: document.getElementById('product-details'),
    productInfo: document.getElementById('template-product'),

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
            description = template.getElementById('description')
            description.innerHTML = p.description
            item.setAttribute('data-product-id', i)
            item.addEventListener('click', Dom.showProductPage)
            Dom.catalog.appendChild(template)
        })
    },
    refreshProductsList: function () {
        document.getElementById('catalog').innerHTML = " "
    },
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
        let productsAdded
        if (JSON.parse(localStorage.getItem('cart')) === null) {
            productsAdded = 0
        }
        else {
          productsAdded = JSON.parse(localStorage.getItem('cart')).length;
          if (document.getElementById('btn-cart')) {
              document.getElementById('cart-num').innerHTML = "( " + productsAdded + " )"
          }
          else {
              document.getElementById('cart-num').innerHTML = "( " + productsAdded + " )"
          }
        }
    },
    showProductDetails: async function (productId) {
        let firstProperty = ""
        let queryStr = window.location.search
        let urlStr = new URLSearchParams(queryStr)

        const urlItem = ProductApi.idUrl(productId)
        const productDetails = await ProductApi.getProducts(urlItem)
        
        const template = document.importNode(Dom.productInfo.content, true)
        const item = template.getElementById('product-information')
        productTitle = template.getElementById('product-title')
        productTitle.innerHTML = urlStr.get('type') + ' ' + productDetails.name
        productImage = template.getElementById('product-image')
        productImage.src = productDetails.imageUrl
        productImage.alt = 'Image de ' + urlStr.get('type') + ' ' + productDetails.name
        productImage.title = urlStr.get('type') + ' ' + productDetails.name
        productSubtitle = template.getElementById('product-subtitle')
        productSubtitle.innerHTML = productDetails.name
        productRef = template.getElementById('product-ref')
        productRef.innerHTML = 'Ref. n° ' + productDetails._id
        productDesc = template.getElementById('product-desc')
        productDesc.innerHTML = productDetails.description
        productPrice = template.getElementById('product-price')
        productPrice.innerHTML = 'Prix : ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(productDetails.price/100))
        Dom.productDescription.appendChild(template)
        const button = document.getElementById('add-btn')

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

        Dom.getAllOptions(firstProperty, productDetails)

        Dom.setQuantity()

        button.addEventListener('click', function (event) {
            let cartProductNumber = JSON.parse(localStorage.getItem('cart'))

            class Line {
                constructor (param, imgUrl, name, id, quantity, price) {
                    this.param = param
                    this.imgUrl = imgUrl
                    this.name = name
                    this.id = id
                    this.quantity = quantity
                    this.price = price
                }
            }
            
            if (cartProductNumber === null) {
                cart = []
                firstAddProduct = new Line(urlStr.get('type'), productDetails.imgUrl, productDetails.name, productDetails._id, parseInt(quantitySelect.value), productDetails.price)
                cart.push(firstAddProduct)
                localStorage.setItem('cart', JSON.stringify(cart))

                alert('Produit ajouté au panier !')
                location.reload()
            }
            else {
                // cartUpdateNumber = JSON.parse(localStorage.getItem('cart'))
                productAlreadyAdded = false

                for (let k in cartProductNumber) {
                    if (cartProductNumber[k].id === productDetails._id) {
                        productAlreadyAdded = true
                        cartProductNumber[k].quantity = parseInt(cartProductNumber[k].quantity) + parseInt(quantitySelect.value)

                        alert('Quantité modifiée !')
                        location.reload()
                    }
                }
                if (!productAlreadyAdded) {
                    cartProductNumber.push(new Line(urlStr.get('type'), productDetails.imgUrl, productDetails.name, productDetails._id, parseInt(quantitySelect.value), productDetails.price))

                    alert('Produit ajouté au panier !')
                    location.reload()
                }
                localStorage.setItem('cart', JSON.stringify(cartProductNumber))
            }
        })
    },
    getAllOptions: function (value, param) {
        param[value].forEach((value, i) => {
            optionSelect = document.getElementById('product-options')
            optionChoice = document.createElement('option')
            optionValue = document.createTextNode(value)
            optionChoice.appendChild(optionValue)
            optionSelect.appendChild(optionChoice)
        }) 
    },
    setQuantity: function () {
        let j = 0;
        quantitySelect = document.getElementById('product-quantity')
        while (j <= 8) {
            j++;
            option = document.createElement('option');
            option.textContent = j;
            option.value = j;
            quantitySelect.appendChild(option);
        }
    }
}

let isClicked = true

function getItems(currentParam) {
    isClicked = !isClicked
    Dom.showProductPage(currentParam)   
}

function read() {
    console.log(window.location.pathname)
    if (window.location.pathname == '/home/jeremyboisdur/Bureau/developpement-web/js-improvement/assets/pages/product.html') {
       Dom.showProductDetails()
    }
}

window.onload = Dom.cartProductsNumber(), read()