import {menuArray} from '/data.js'
const menu = document.getElementById('menu')
const orderTitle = document.getElementById('order-title')
const totalPriceLine = document.getElementById('total-price-line')
const modal = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')
let orderArray = []
let nextOrderId = 1
const completeOrderContainer = document.getElementById('complete-order-container')


menuArray.forEach((item, index) => {
    menu.innerHTML += `
        <div class="item">
            <div class="emoji">
                ${item.emoji}
            </div>
            <div class="desc">
                <div class="food">
                    ${item.name}
                </div>
                <div class="ingredients">${item.ingredients.join(', ')}</div>
                <div class="price">$${item.price}</div>
            </div>
            <div class="add-item" id="add-item">
                <div class="circle-button" id="circle-button" data-index="${index}">
                    +
                </div>
            </div>
        </div>
    `
})

const addButtons = document.querySelectorAll('.circle-button')
addButtons.forEach((addButton, index) => {
const menuItem = menuArray[index]

addButton.addEventListener('click', () => {
    const orderItem = {
        id: nextOrderId++,
        name: menuItem.name,
        price: menuItem.price
    }
        
    orderArray.push(orderItem)
    
    renderOrder()
    console.log(orderArray)
    })

})

function renderOrder() {
    const order = document.getElementById('order')
    
    if (orderArray.length === 0) {
        orderTitle.innerHTML = ''
        order.innerHTML = ''
        totalPriceLine.innerHTML = ''
        completeOrderContainer.innerHTML = ''
        return
    }
    
    orderTitle.innerHTML = 'Your Order'
    
    let orderHTML = ''
    
    orderArray.forEach((item, index) => {
        orderHTML +=  `
        <div class="order-item" id="order-item">
            <div class="food">${item.name}<span data-index="${index}" class="remove-button">remove</span></div>
            <div class="price">$${item.price}</div>
        </div>
    `
    })
    
    order.innerHTML = orderHTML
    
    const total = orderArray.reduce((sum, item) => sum + item.price, 0)
    
    totalPriceLine.innerHTML = `
        <div class="total-price-container">
            <div class="total-price-text">Total Price:</div>
            <div class="total-price">$${total}</div>
        </div>
    `
    
    const removeButtons = document.querySelectorAll('.remove-button')
        removeButtons.forEach(removeButton => {
            removeButton.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'))
                    orderArray.splice(index, 1)
                    renderOrder()
                    console.log(orderArray)
            })
        })       
        completeOrderContainer.innerHTML = `
            <div class="complete-order-btn" id="complete-order-btn">Complete Order</div>
    `
    const completeOrderBtn = document.getElementById('complete-order-btn')
    completeOrderBtn.addEventListener('click', () => {
        modal.style.display = 'flex'
    })
    
    }
    
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const name = document.getElementById('name').value
        const cardNumber = document.getElementById('card-number').value
        const cvv = document.getElementById('cvv').value
        
        console.log('Payment submitted:', { name, cardNumber, cvv })
        
        modal.style.display = 'none'
        
        const order = document.getElementById('order')
        orderTitle.innerHTML = ''
        order.innerHTML = 
        `<div class="success-message">Thanks, ${name}! Your order is on it's way!</div>`
        totalPriceLine.innerHTML = ''
        completeOrderContainer.innerHTML = ''
        
        orderArray = []
        paymentForm.reset()
        
        
    })
    
    