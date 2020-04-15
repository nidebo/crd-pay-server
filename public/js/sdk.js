(function(w){
    const button = ({ selector, createOrder }) => {
        const { document } = w
        const element = document.querySelector(selector)
        
        const redirectToPayout = (orderId) => {
            console.log('client received orderId', orderId)
            w.location.href = `http://localhost:3005/pay?orderId=${orderId}`
        }

        const wrapper = document.createElement("creditasPayWrapper");
        wrapper.style.margin = '20px 0 0 0';
        wrapper.innerText = 'Pay with';  

        const imgUrl = 'http://localhost:3005/static/media/marketplace-logo-pay.2f7b0bfe.png';
        var logo = document.createElement("img");
        logo.setAttribute('src',imgUrl);
        logo.style.width='125px';


        const btn = document.createElement("div")
        btn.setAttribute("id", "CreditasPay");
        btn.appendChild(logo);
        btn.style.color = 'white'
        btn.style.textAlign = 'center'
        btn.style.padding = '14px'
        btn.style.backgroundColor = '#f7f7f7'
        btn.style.borderRadius = '4px'
        btn.style.border='1px solid #d6d6d6'
        btn.style.cursor = 'pointer'
        btn.style.display = 'flex'
        btn.style.justifyContent = 'center'
        btn.onclick = () => {
            createOrder()
            .then(redirectToPayout)
            .catch(() => {
                console.error('Invalid orderId')
            })
        }
        // TODO: iframe
        element.append(wrapper)
        element.appendChild(btn);
        btn.appendChild(logo);
    }
    w.crdPay = {
        button
    }
}(window))

