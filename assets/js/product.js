const DomProduct = {
    productDescription: document.getElementById('product-details'),
    productInfo: document.getElementById('template-product'),
     
    showProductDetails: async function (productId) {
        let firstProperty = ""
        let queryStr = window.location.search
        let urlStr = new URLSearchParams(queryStr)
        
        const urlItem = ProductApi.idUrl(productId)
        const productDetails = await ProductApi.getProducts(urlItem)
        
        const template = document.importNode(DomProduct.productInfo.content, true)
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
        const button = document.getElementById('add-btn')
        DomProduct.productDescription.appendChild(template)


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

        DomProduct.getAllOptions(firstProperty, productDetails)

        DomProduct.setQuantity()

        document.getElementById('add-btn').addEventListener('click', function (event) {
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
                firstAddProduct = new Line(urlStr.get('type'), productDetails.imageUrl, productDetails.name, productDetails._id, parseInt(quantitySelect.value), productDetails.price)
                cart.push(firstAddProduct)
                localStorage.setItem('cart', JSON.stringify(cart))

                alert('Produit ajouté au panier !')
                location.reload()
            }
            else {

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
                    cartProductNumber.push(new Line(urlStr.get('type'), productDetails.imageUrl, productDetails.name, productDetails._id, parseInt(quantitySelect.value), productDetails.price))

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
    },
}

window.onload = DomProduct.showProductDetails()
