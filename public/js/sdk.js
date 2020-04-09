(function(w){
    const button = ({ selector, createOrder }) => {
        const { document } = w
        const element = document.querySelector(selector)
        
        const redirectToPayout = (orderId) => {
            console.log('client received orderId', orderId)
            w.location.href = `http://localhost:3005/pay?orderId=${orderId}`
        }

        

        const btn = document.createElement("div")
        btn.style.color = 'white'
        btn.style.textAlign = 'center'
        btn.style.padding = '20px'
        btn.style.backgroundColor = '#11BB77'
        btn.style.borderRadius = '4px'
        btn.style.cursor = 'pointer'
        btn.innerText = 'Pay with Creditas'
        btn.onclick = () => {
            createOrder()
            .then(redirectToPayout)
            .catch(() => {
                console.error('Invalid orderId')
            })
        }
        // TODO: iframe
        element.append(btn)
    }
    w.crdPay = {
        button
    }
}(window))

