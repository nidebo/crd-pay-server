const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3003

app.use(bodyParser.json())
app.options('*', cors())

app.use('/static', express.static(path.join(__dirname, 'public')))

const generateOrderId = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
const orders = {};

app.get('/checkout/order/:id', cors(), (req, res) => {
    const { id } = req.params;
    res.send({ order: orders[id] })
})

app.post('/checkout/order/:id/confirm', cors(), (req, res) => {
    const { name, personalId } = req.body;
    const { id } = req.params
    console.log('id', id)
    console.log('name', name)
    console.log('personalId', personalId)
    orders[id].name = name
    orders[id].personalId = personalId
    orders[id].paid = true
    res.send({ ok: true })
})

app.get('/orders', (req, res) => {
    res.send(orders)
})

app.post('/order', cors(), (req, res) => {
    const { products, total, successUrl } = req.body;
    console.log('received order with data', 'products', products, 'total', total, 'successUrl', successUrl)
    const id = generateOrderId();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    orders[id] = {
        products,
        total,
        successUrl,
        paid: false,
        expiration: tomorrow
    }
    console.log('sending order id', id)
    res.send({ orderId: id })
})

app.listen(port, () => console.log(`Creditas Pay server app listening at http://localhost:${port}`))