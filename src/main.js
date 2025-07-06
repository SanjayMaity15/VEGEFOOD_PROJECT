import "./style.css";

// Active and close mobile menu

const humburger = document.getElementById("humburger");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.getElementById("close-menu");

humburger.addEventListener("click", (e) => {
  e.preventDefault();
  mobileMenu.classList.add("mobile-menu-active");
  humburger.style.display = "none";
  closeMenu.style.display = "block";
  humburger.classList.remove("humburger-active");
});
closeMenu.addEventListener("click", (e) => {
  e.preventDefault();
  mobileMenu.classList.remove("mobile-menu-active");
  humburger.classList.add("humburger-active");
  closeMenu.style.display = "none";
});

// Hero section bg image crousal

const bgHero = document.querySelectorAll(".bg-hero");
let current = 0;

function removeBgActiveClass() {
  bgHero.forEach((currBg) => {
    currBg.classList.remove("hero-bg-active");
  });
}

function showNextBg() {
  removeBgActiveClass();
  current = (current + 1) % bgHero.length;
  bgHero[current].classList.add("hero-bg-active");
}

setInterval(() => {
  showNextBg();
}, 5000);


// Price update


const cartTotalPrice = document.getElementById("cart-total-price");

// Update total price

const updateFinalTotal = () => {
  let finalTotalPrice = 0;

  document.querySelectorAll(".item").forEach((cItem) => {
    let price = cItem
      .querySelector("#cart-item-price")
      .textContent.replace("$", "");
    price = Number(price);
    finalTotalPrice = finalTotalPrice + price;
  });

  cartTotalPrice.textContent = `$${finalTotalPrice}`;
};



//Add to cart


const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
const itemList = document.querySelector(".item-list");
const cartVal = document.getElementById('cart-value');

let addToCartItemList = [];

addToCartBtn.forEach((currItem) => {
  currItem.addEventListener("click", (e) => {
    let quantity = 1;

    let parentElem = e.target.parentElement;

    let grandPareElem = parentElem?.parentElement;

    const existingItem = addToCartItemList.find((currElem) => {
      return currElem.id === grandPareElem.id;
    });

    if (existingItem) {
      alert(`The is already in your cart`);

      return;
    }

    addToCartItemList.push(grandPareElem);
    cartVal.innerText = addToCartItemList.length

    let itemPriceDollar = grandPareElem.querySelector(".item-price").textContent;

    let itemPrice = parseInt(itemPriceDollar.replace('$', ""))

    let itemImage = grandPareElem.querySelector(".pro-image").src;

    let itemName = grandPareElem.querySelector(".item-name").textContent;

    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
  
      <div class="item-image">
        <img src="${itemImage}" alt="" id="img">
      </div>
      <div class="item-name-price">
        <h4 id="cart-item-name">${itemName}</h4>
        <h4 id="cart-item-price">${itemPriceDollar}.00</h4>

      </div>
      <div class="qty-btn">
        <a href="#" class="decrement">
          <i class="fa-solid fa-minus"></i>
        </a>
        <h4 class="qty-value">${quantity}</h4>
        <a href="#" class="increment">
          <i class="fa-solid fa-plus"></i>
        </a>
      </div>
  
  
  `;

    itemList.appendChild(item);
    updateFinalTotal()

    // qty increment & decrement

    const increment = item.querySelector(".increment");
    const decrement = item.querySelector(".decrement");
    const qtyValue = item.querySelector(".qty-value");
    const cartItemPrice = item.querySelector("#cart-item-price");

    increment.addEventListener("click", (e) => {
      e.preventDefault();

      quantity = quantity + 1;
      qtyValue.textContent = quantity;
      cartItemPrice.textContent = (itemPrice * quantity).toFixed(2);
      updateFinalTotal();
    });
    decrement.addEventListener("click", (e) => {
      e.preventDefault();
      if (quantity > 1) {
        quantity = quantity - 1;
        qtyValue.textContent = quantity;
        cartItemPrice.textContent = (itemPrice * quantity).toFixed(2);
        updateFinalTotal();
      } else {
        alert(`Want to delete ${name} from cart !!!`);

        item.remove();
        addToCartItemList = addToCartItemList.filter((item) => {
          return item.id !== grandPareElem.id;
        });
        cartVal.innerText = addToCartItemList.length;

        updateFinalTotal();
      }
    });
  });
});

const cartIcon = document.getElementById("cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.getElementById("close");
cartIcon.addEventListener("click", (e) => {
  cartTab.classList.add("cart-tab-active");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});
