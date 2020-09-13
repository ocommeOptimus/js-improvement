const DomOrder = {
    order: document.getElementById('order'),
    orderTemplate: document.getElementById('template-order'),
    orderList: document.getElementById('order-list'),
    orderTemplateList: document.getElementById('template-order-list'),
    
    buildOrderText: function () {
        let contact                     = JSON.parse(localStorage.getItem('contact'))
        let orderId                     = JSON.parse(localStorage.getItem('orderId'))

        const orderTemplate = document.importNode(DomOrder.orderTemplate.content, true)
        orderRefList = orderTemplate.getElementById('order-refs')

        for (let i in orderId) {
            let newRef = document.createElement('li');
            newRef.textContent = `${orderId[i].param[i]} : ${orderId[i].id}`;
            orderRefList.appendChild(newRef);
        }

        orderContact = orderTemplate.getElementById('order-contact')
        orderContact.innerHTML = contact.firstName + ' ' + contact.lastName

        orderEmail = orderTemplate.getElementById('order-email')
        orderEmail.innerHTML = contact.email

        DomOrder.order.appendChild(orderTemplate)

    },
    buildOrderList: function () {
        let orderConfirmation                = JSON.parse(localStorage.getItem('confirm'))
        let finalPriceOrder = 0

        orderConfirmation.forEach((c) => {
            const orderProductTemplate = document.importNode(DomOrder.orderTemplateList.content, true)
            orderImage = orderProductTemplate.getElementById('order-image')
            orderImage.src = c.imgUrl
            orderImage.alt = 'Image de ' + c.name
            orderImage.title = 'Image de ' + c.name
            orderTitle = orderProductTemplate.getElementById('order-title')
            orderTitle.innerHTML = c.name
            orderProductPrice = orderProductTemplate.getElementById('order-price')
            orderProductPrice.innerHTML = 'Prix : ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(c.price/100))
            orderProductQuantity = orderProductTemplate.getElementById('order-quantity')
            orderProductQuantity.innerHTML = 'Quantité : ' + c.quantity
            orderProductTotal = orderProductTemplate.getElementById('order-product-total')
            orderProductTotal.innerHTML = 'Prix total pour cet article : ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((c.quantity * c.price)/100))
            DomOrder.orderList.appendChild(orderProductTemplate)
        })
/*         for (let c in orderConfirmation) {
            const urlConfirmPath = orderConfirmation[c].param + "/" + orderConfirmation[c].id
            const urlConfirmAdress = ProductApi.baseUrl(urlConfirmPath)
            finalPriceOrder += orderConfirmation[c].price * orderConfirmation[c].quantity

            fetch(urlConfirmAdress)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP error, status = ' + response.status)
                }
                return response.json()
            }).then(function (data) {
                const orderProductTemplate = document.importNode(DomOrder.orderTemplateList.content, true)
                orderImage = orderProductTemplate.getElementById('order-image')
                orderImage.src = data.imageUrl
                orderImage.alt = 'Image de ' + data.name
                orderImage.title = 'Image de ' + data.name
                orderTitle = orderProductTemplate.getElementById('order-title')
                orderTitle.innerHTML = data.name
                orderProductPrice = orderProductTemplate.getElementById('order-price')
                orderProductPrice.innerHTML = 'Prix : ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(data.price/100))
                orderProductQuantity = orderProductTemplate.getElementById('order-quantity')
                orderProductQuantity.innerHTML = 'Quantité : ' + data.quantity
                orderProductTotal = orderProductTemplate.getElementById('order-product-total')
                orderProductTotal.innerHTML = 'Prix total pour cet article : ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((data.quantity * data.price)/100))
                DomOrder.orderList.appendChild(orderProductTemplate)

            })
            .catch()
        } */

        for (let t in orderConfirmation) {
            finalPriceOrder += orderConfirmation[t].price * orderConfirmation[t].quantity
        }

        orderTotal = document.getElementById('order-total')
        orderTotal.innerHTML = 'Prix de votre commande : ' + (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(finalPriceOrder/100))
    }
}
window.onload = DomOrder.buildOrderText(), DomOrder.buildOrderList()
