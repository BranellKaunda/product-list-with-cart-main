const addButton = document.querySelectorAll('.js-add-button');
const image = document.querySelectorAll('.js-images');
const yourOrder = document.querySelector('.js-your-order');

//generateOrderHTML();

let order = JSON.parse(localStorage.getItem('order')) || [];
let orderQuantity = 0;

async function loadProducts() {
  const response = await fetch('data.json');
  const products = await response.json();
  return products;
}

function addToOrder(productName) {

  loadProducts().then((products) => {
    products.forEach((product) => {
    
      if (product.name === productName) {
        order.push(product);
        console.log(order);
      }

      localStorage.setItem('order', JSON.stringify(order));
    })
  }).then(() => {
    displayOrder();
  })
}

function displayOrder() {
  
  order.forEach((item) => {
    document.querySelector('.js-order')
      .innerHTML += `
        <d class="item-div">
          <div class="item-container">

            <div class="details"> 
              <p class="item-name">${item.name}</p>
              <p class="price"><span style="color: hsl(14, 86%, 42%);">1x</span> @ $${Number((item.price * 100) / 100).toFixed(2)}</p>
            </div>
            
            <div class="button-div">
              <button class="remove-item"><img src="/assets/images/icon-remove-item.svg"></button>
            </div>
            
          </div>  
        </d>
      `;
  })
}

function comfirmOrder() {
  let total = 0;

  order.forEach((item) => {
    total += item.price;
  })

  console.log(Number((total * 100) / 100).toFixed(2));
}

comfirmOrder();


/*
function generateOrderHTML() {

  document.querySelector('.js-order-container')
    .innerHTML = `
      <h2 class="js-your-order">Your Order (0)</h2>
      <div class="order js-order">
        <img src="assets/images/illustration-empty-cart.svg" alt="">
        
        <p>Your added items will appear here</p>
      </div>
    `;
}
*/

addButton.forEach((button) => {
  let quantity= 1;
  
  button.addEventListener('click', () => {
    document.querySelector('.js-order')
      .innerHTML = '';


    let productName = button.dataset.productName;

    addToOrder(productName);
    
    if (!button.classList.contains('select-button')) {
      button.classList.add('select-button');
      orderQuantity++;
    } 

    button.innerHTML = `
      <button class="decrease js-decrease" ><img src="assets/images/icon-decrement-quantity.svg" alt=""></button> 
        ${quantity}
      <button class="increase js-increase"><img src="assets/images/icon-increment-quantity.svg" alt=""></button>`
    ;

    const increaseButton = document.querySelectorAll('.js-increase');
    const decreaseButton = document.querySelectorAll('.js-decrease');
    
    increaseButton.forEach((btn) => {
      btn.addEventListener('click', () => {
        quantity++;
        orderQuantity +=1;
      })
    })

    decreaseButton.forEach((btn) => {
      btn.addEventListener('click', () => {
        quantity--;
        orderQuantity--;
        if(quantity === 0) {
          quantity = 0;
        } else if (quantity === -1) {
          quantity = 0;
        }
        
        if(orderQuantity === -1) {
          orderQuantity = 0;
        }
      })
    });   

    yourOrder.innerHTML = `Your Order (${orderQuantity})`;
   
  })

});
