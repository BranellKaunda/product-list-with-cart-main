const addButton = document.querySelectorAll('.js-add-button');
const image = document.querySelectorAll('.js-images');
const yourOrder = document.querySelector('.js-your-order');

let orderQuantity = 0;

addButton.forEach((button) => {
  let quantity= 1;
  
  button.addEventListener('click', () => {
    orderQuantity +=1;
    
    button.classList.add('select-button');

    button.innerHTML = `
      <button class="decrease js-decrease" ><img src="assets/images/icon-decrement-quantity.svg" alt=""></button> 
        ${quantity}
      <button class="increase js-increase"><img src="assets/images/icon-increment-quantity.svg" alt=""></button>`
    ;

    const increaseButton = document.querySelectorAll('.js-increase');
    const decreaseButton = document.querySelectorAll('.js-decrease');
    
    increaseButton.forEach((btn) => {
      btn.addEventListener('click', () => {
        quantity +=1;
      })
    })

    decreaseButton.forEach((btn) => {
      btn.addEventListener('click', () => {
        quantity -=1;
        if(quantity === 0) {
          quantity = 1;
        }
      })
    });   

    yourOrder.innerHTML = `Your Order (${orderQuantity})`;
      
  })

});

fetch('data.json').then((response) => response.json())
  .then((data) => {
    console.log(data);
  })

const cart = [];

function addToCart() {
  
}