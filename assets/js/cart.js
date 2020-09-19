// Creating class for sending contact infos
class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName  = firstName
        this.lastName   = lastName
        this.address    = address
        this.city       = city
        this.email      = email
    }
}
// Creating a class to post contact's object and product's array to server
class FormSent {
    constructor(user, products) {
        this.contact    = user
        this.products   = products
    }
}
// Creating a class to easily add product purchased info
class Confirm {
    constructor(param, name, imgUrl, id, quantity, price) {
        this.param      = param
        this.name       = name
        this.imgUrl     = imgUrl
        this.id         = id
        this.quantity   = quantity
        this.price      = price
    }
}

const DomCart = {
    cart: document.getElementById('cart'),
    cartProducts: document.getElementById('template-cart'),
    total: document.getElementById('total'),
    cartFinalPrice: document.getElementById('template-total'),
    form: document.getElementById('form'),
    cartForm: document.getElementById('template-form'),

    buildCart: function () {
        let productsAddedToCart = JSON.parse(localStorage.getItem('cart'))
        let toggleCartRemove = false
        const toastBox = document.getElementById("toast")

        productsAddedToCart.forEach((c, i) => {
            const cartTemplate = document.importNode(DomCart.cartProducts.content, true)
            const cartProductsList = cartTemplate.getElementById('cart-products')
            let cartLink = cartTemplate.getElementById('cart-link')
            cartLink.href = './product.html?type=' + c.param + '&id=' + c.id
            let cartImage = cartTemplate.getElementById('cart-image')
            cartImage.src = c.imgUrl
            cartImage.alt = 'Image de ' + c.name
            cartImage.title = 'Image de ' + c.name
            let cartProductTitle = cartTemplate.getElementById('cart-title')
            cartProductTitle.innerHTML = c.name
            let cartProductPrice = cartTemplate.getElementById('cart-price')
            cartProductPrice.innerHTML = 'Prix unitaire : ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(c.price/100))
            let cartProductQuantity = cartTemplate.getElementById('cart-quantity')
            cartProductQuantity.innerHTML = 'Quantité : ' + c.quantity
            let buttonMore = cartTemplate.getElementById('btn-more')
            buttonMore.setAttribute('id', 'btn-more-' + i)
            buttonMore.addEventListener('click', function (event) {
                c.quantity++
                localStorage.setItem('cart', JSON.stringify(productsAddedToCart))
                toastBox.innerHTML = 'Quantité modifiée !'
                toastBox.className = "show"
                setTimeout(function(){ toastBox.className = toastBox.className.replace("show", ""); }, 3000)
                document.getElementById('cart-num').innerHTML = "( " + productsAddedToCart.length + " )"
                setTimeout(function() { location.reload(); }, 1500)
            });

            let buttonLess = cartTemplate.getElementById('btn-less')
            buttonLess.setAttribute('id', 'btn-less-' + i)
            buttonLess.addEventListener('click', function (event) {
                if (productsAddedToCart[i].quantity === 1) {
                    toggleCartRemove = true
                    if (productsAddedToCart.length === 1) {
                        toastBox.innerHTML = c.name + ' a été supprimé et votre panier est vide !'
                        toastBox.className = "show"
                        setTimeout(function(){ toastBox.className = toastBox.className.replace("show", ""); }, 3000)
                        document.getElementById('cart-num').innerHTML = "( " + productsAddedToCart.length + " )"
                        localStorage.clear()
                        setTimeout(function() { location.reload(); }, 3100)
                        
                    }
                    if (productsAddedToCart.length > 1) {
                        productsAddedToCart[i].quantity--
                        productsAddedToCart.splice(i, 1)
                        localStorage.setItem('cart', JSON.stringify(productsAddedToCart))
                        toastBox.innerHTML = c.name + ' a été supprimé du panier !'
                        toastBox.className = "show"
                        setTimeout(function(){ toastBox.className = toastBox.className.replace("show", ""); }, 3000)
                        document.getElementById('cart-num').innerHTML = "( " + productsAddedToCart.length + " )"
                        setTimeout(function() { location.reload(); }, 1500)
                    }
                }
                if (productsAddedToCart[i].quantity > 1 && toggleCartRemove == false) {
                    productsAddedToCart[i].quantity--
                    localStorage.setItem('cart', JSON.stringify(productsAddedToCart))
                    toastBox.innerHTML = 'Quantité modifiée !'
                    toastBox.className = "show"
                    setTimeout(function(){ toastBox.className = toastBox.className.replace("show", ""); }, 3000)
                    document.getElementById('cart-num').innerHTML = "( " + productsAddedToCart.length + " )"
                    setTimeout(function() { location.reload(); }, 1500)
                }
                
            })

            let cartProductsTotal = cartTemplate.getElementById('cart-products-total')
            cartProductsTotal.innerHTML = 'Prix total pour cet article : ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((c.quantity * c.price)/100))
            DomCart.cart.appendChild(cartTemplate)
        })      
    },

    buildTotalPrice: function () {
        let productsAddedToCart = JSON.parse(localStorage.getItem('cart'))
        let calculationTotalOrder = 0;
        const cartTotalTemplate = document.importNode(DomCart.cartFinalPrice.content, true)

        for (let j in productsAddedToCart) {
            calculationTotalOrder += productsAddedToCart[j].price * productsAddedToCart[j].quantity
        }

        let cartTotal = cartTotalTemplate.getElementById('cart-total')
        cartTotal.innerHTML = 'Prix total de votre commande: ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(calculationTotalOrder/100))

        DomCart.total.appendChild(cartTotalTemplate)

    },

    buildForm: function () {
        let productsAddedToCart = JSON.parse(localStorage.getItem('cart'))
        let orderIds = []
        const toastBox = document.getElementById("toast")
        
        const formTemplate = document.importNode(DomCart.cartForm.content, true)
        DomCart.form.appendChild(formTemplate)

        class OrderConfirm {
            constructor(id, param){
                this.id = id
                this.param = param
            }
        }

        function sending (url, order) {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();
                request.onreadystatechange = function (response) {
                    if (this.readyState === 4) {
                        if (this.status === 201) {
                            resolve(response = JSON.parse(this.responseText), orderIds.push(new OrderConfirm(response.orderId, JSON.parse(localStorage.getItem('paramOrder')))), localStorage.setItem('orderId', JSON.stringify(orderIds)), localStorage.setItem('contact', JSON.stringify(response.contact)));
                        } else {
                            reject(
                                toastBox.innerHTML = this.satus + '\n' + 'Une erreur est survenue, merci de réessayer ultérieurement',
                                toastBox.className = "show show--alert",
                                setTimeout(function(){ toastBox.className = toastBox.className.replace("show show--alert", ""); }, 3000)
                            )
                        }
                    }
                }
                request.open("POST", url);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(order));
            })
        }

        document.getElementById('btn-submit').addEventListener('click', function (event) {
            
            //Initializing array for products Ordered
            let productsOrdered = []
                    
            //Checking the form validity
            if (!document.getElementById('cart-form').checkValidity()) {
                //Form isn't valid: preventing the submit and show an error message
                event.preventDefault()
                toastBox.innerHTML = 'Formulaire invalide, merci de bien renseigner tous les champs du formulaire !'
                toastBox.className = "show show--alert"
                setTimeout(function(){ toastBox.className = toastBox.className.replace("show show--alert", ""); }, 3000)
            }
            else {
                //Form is valid: creating the user contact infos
                let newContact = new Contact(document.getElementById('firstName').value, document.getElementById('lastName').value, document.getElementById('address').value, document.getElementById('city').value, document.getElementById('email').value)

                //Initializing an array to push the Confirm class into it
                let confirm = []

                for (let l in productsAddedToCart) {
                    //if it's the first time we have this type of product, we create sub array
                    if (typeof productsOrdered[productsAddedToCart[l].param] == "undefined") {
                        productsOrdered[productsAddedToCart[l].param] = [];
                    }
                    //we push product on dedicate subarray
                    productsOrdered[productsAddedToCart[l].param].push(productsAddedToCart[l].id.toString())
                    confirm.push(new Confirm(productsAddedToCart[l].param, productsAddedToCart[l].name, productsAddedToCart[l].imgUrl, productsAddedToCart[l].id, productsAddedToCart[l].quantity, productsAddedToCart[l].price))
                }

                //Initializing an array to get the param used to the POST request and adding it to orderIds
                let paramOrder = []

                for (let i in productsOrdered) {
                    paramOrder.push(i)
                    localStorage.setItem('paramOrder', JSON.stringify(paramOrder))

                    sending("http://localhost:3000/api/" + i + "/order", new FormSent(newContact, productsOrdered[i]))
                    .then(function () {
                        if(Object.keys(productsOrdered).length === orderIds.length) {
                            localStorage.setItem('confirm', JSON.stringify(confirm))
                            localStorage.removeItem('cart')
                            window.location.pathname = '/pages/order.html'
                        }
                    })
                }
            }
        })
            
    },

    displayCart: function () {
        const toastBox = document.getElementById("toast")
        if (JSON.parse(localStorage.getItem('cart') !== null)) {
            DomCart.buildCart()
            DomCart.buildTotalPrice()
            DomCart.buildForm()
        }
        else {
            setTimeout(function() { alert('Panier vide !\n\nVous allez être redirigé vers la page d\'accueil'); }, 500)
            setTimeout(function() { window.location.pathname = '/index.html'; }, 600)
            
        }
    }
}

window.onload = DomCart.displayCart()
