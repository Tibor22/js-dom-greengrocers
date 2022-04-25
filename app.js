//Imports
import { addItem } from "./addItem.js";
import { removeItem } from "./removeItem.js";
const itemList = document.querySelector(".item-list ");
const cartContainer = document.querySelector(".cart--item-list");
const totalNum = document.querySelector(".total-number");
const container = document.querySelector(".container");
const sortContainer = document.querySelector(".sort");
let sorting = true;
createForm();

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

  renderCartItems(state.cart);
  getTotal();
  state.filtered = state.cart;
}

export function renderCartItems(cart) {
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
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

function createForm() {
  const html = `
  <form class="filter-items">
  <label for="vegetable">Vegetables</label>
  <input
    type="checkbox"
    id="vegetable"
    value="vegetable"
    name="vegetable"
  />
  <label for="fruit">Fruits</label>
  <input type="checkbox" id="fruit" value="fruit" name="fruit" />
</form>
  `;
  container.insertAdjacentHTML("beforeend", html);
}

const filterForm = document.querySelector(".filter-items");

filterForm.addEventListener("change", (e) => {
  const filterType = e.target.name;
  const inputArr = Array.from(e.target.closest("form").children).filter(
    (child) => child.type === "checkbox"
  );

  const isBothChecked = inputArr.every((input) => input.checked);
  const isAnyChecked = inputArr.find((input) => input.checked);

  if (isBothChecked) {
    const newArr = state.cart.filter((item) => item.type === filterType);
    state.filtered = state.filtered.concat(newArr);
    renderCartItems(state.filtered);
  } else if (isAnyChecked) {
    state.filtered = state.cart.filter((item) => {
      const filterType = isAnyChecked.name;
      if (item.type === filterType) return item;
    });
    renderCartItems(state.filtered);
  } else {
    state.filtered = state.cart;
    renderCartItems(state.cart);
  }
});

sortContainer.addEventListener("click", (e) => {
  if (!e.target.src) return;
  if (sorting) {
    const cartCopy = state.filtered.slice();
    state.sorted = cartCopy.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
    renderCartItems(state.sorted);
    sorting = false;
  } else {
    renderCartItems(state.filtered);
    sorting = true;
  }
});
