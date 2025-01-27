const addButton = document.querySelectorAll('.js-add-button');

let order = [];
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
      }

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
              <p class="price"><span style="color: hsl(14, 86%, 42%);">${item.quantity}x</span> @$${formatPrice(item.price)} $${formatPrice((item.quantity * item.price))}</p>
            </div>
            
            <div class="button-div">
              <button class="remove-item-button js-remove-item-button" data-order-id="${item.name}">x</button>
            </div>
            
          </div>  
        </d>
      `;
  })

 removeOrder();
}

function removeOrder() {
  
  document.querySelectorAll('.js-remove-item-button')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelector('.js-order')
          .innerHTML = '';

        order.forEach((item, index) => {
          if(item.name === btn.dataset.orderId) {
            order.splice(index, 1);

            //document.querySelector('.js-your-order').innerHTML = `Your Order (${item.quantity})`;
          }

          if(order.length === 0) {
            document.querySelector('.js-order')
              .innerHTML = `
              <div class="order js-order">
                <img src="assets/images/illustration-empty-cart.svg" alt="">
                
                <p>Your added items will appear here</p>
              </div>`;

              document.querySelector('.js-total-container')
              .innerHTML = '';

          }
        })

        displayOrder();
      });
    })
}

function formatPrice(number) {

  return Number((number * 100) / 100).toFixed(2);
}


function addQuantity(productName) {
  let itemQuantity = 0;
  
  order.forEach((item) => {
    if (productName === item.name) {
      itemQuantity++;
      item.quantity += itemQuantity;
      document.querySelector('.js-order').innerHTML = ''; 
    }

  })
  
  displayOrder();
  console.log(order);
}

function reduceQuantity(productName) {
  let itemQuantity = 0;
  
  order.forEach((item) => { 
    if (productName === item.name) {
      itemQuantity--;
      item.quantity += itemQuantity;
      document.querySelector('.js-order').innerHTML = '';
    }

    //improve feature
    if(item.quantity === 0) {
      item.quantity = 1;
    }

  })
  
  displayOrder();
  console.log(order);
}


addButton.forEach((button) => {
  let quantity= 1;
  
  button.addEventListener('click', () => {
    let productName = button.dataset.productName;

    if (!button.classList.contains('select-button')) {
      //removes default image empty order
      document.querySelector('.js-order').innerHTML = '';
      button.classList.add('select-button');
      addToOrder(productName);
      orderQuantity++;
    } else if (button.classList.contains('select-button')) {
      orderQuantity += 0;
    }

    button.innerHTML = `
      <button class="decrease js-decrease" ><img src="assets/images/icon-decrement-quantity.svg" alt=""></button> 
        ${quantity}
      <button class="increase js-increase" data-product-name="${productName}"><img src="assets/images/icon-increment-quantity.svg" alt=""></button>`
    ;
 
    document.querySelectorAll('.js-increase')
      .forEach((btn) => {
        btn.addEventListener('click', () => {

          addQuantity(productName);
          quantity++;
          orderQuantity +=1;
        })
    })

    document.querySelectorAll('.js-decrease')
      .forEach((btn) => {
        btn.addEventListener('click', () => {

          reduceQuantity(productName);
          quantity--;
          orderQuantity--;

          if (quantity === 0) {
            quantity = 1;
          } else if (quantity === -1) {
            quantity = 0;
          }
          
          if (orderQuantity === -1) {
            orderQuantity = 0;
          }
        })
    });   

    renderTotalHTML();
    document.querySelector('.js-your-order').innerHTML = `Your Order (${orderQuantity})`;
   
  })
});

async function renderTotalHTML() {
  let totalPrice = 0;

  order.forEach((item) => {
    totalPrice += item.price;

    document.querySelector('.js-total-container')
    .innerHTML =`
      <div class="total-container">
        <div class="total">
          Order Total
        </div>

        <div class="total-price">
          $${formatPrice(item.quantity * totalPrice)}
        </div>
      </div>

      <div class="order-description">
        <div class="carbon-image"><img src="/assets/images/icon-carbon-neutral.svg" alt=""></div>
        <div>
          <p>This is a <span style="color:hsl(14, 65%, 9%); font-weight: 500">carbon neutral</span> delivery</p>
        </div>
      </div>

      <div class="comfirm-oder">
        <button class="js-confirm-order-button">Confirm Order</button>
      </div>
    `;

    document.querySelector('.js-confirm-order-button').addEventListener('click', () => {
     console.log('hello');
    })

  })


}
