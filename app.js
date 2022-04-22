//Imports
import { addItem } from "./addItem.js";
import { removeItem } from "./removeItem.js";
const itemList = document.querySelector(".item-list ");
const cartContainer = document.querySelector(".cart--item-list");
const totalNum = document.querySelector(".total-number");

function renderGrocers() {
  state.items.forEach((item) => {
    const html = `<li>
       <div class="store--item-icon">
         <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
       </div>
       <button>Add to cart</button>
     </li>
     `;
    itemList.insertAdjacentHTML("beforeend", html);
  });
  addCartBtn();
}

function addCartBtn() {
  const addToCartBtn = document.querySelectorAll("button");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
}

function addToCart(e) {
  let currItem = e.target.closest("li").querySelector("img").alt;
  state.items.forEach((item, i) => {
    if (item.name === currItem) {
      state.cart.push({ ...state.items[i], quantity: 1 });
    }
  });
  state.cart = state.cart.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.place === value.place && t.name === value.name)
  );

  state.baseTotal = state.cart.reduce((acc, item) => (acc += +item.price), 0);

  renderCartItems();
  getTotal();
}

export function renderCartItems() {
  cartContainer.innerHTML = "";
  state.cart.forEach((item) => {
    const html = `<li>
   <img
     class="cart--item-icon"
     src="assets/icons/${item.id}.svg"
     alt="${item.name}"
   />
   <p>${item.name}</p>
   <button class="quantity-btn remove-btn center">-</button>
   <span class="quantity-text center">${item.quantity}</span>
   <button class="quantity-btn add-btn center">+</button>
 </li>
 `;
    cartContainer.insertAdjacentHTML("afterbegin", html);
  });
}

export function getTotal() {
  console.log(state.total, state.baseTotal);
  totalNum.innerText =
    "£" + Math.abs((state.total + state.baseTotal).toFixed(2));
}

renderGrocers();
cartContainer.addEventListener("click", removeItem);
cartContainer.addEventListener("click", addItem);
