import { renderCartItems, getTotal } from "./app.js";

export function addItem(e) {
  const addBtn = e.target;
  if (!addBtn.classList.contains("add-btn")) return;
  const quantityBtn = addBtn.closest("li").querySelector(".quantity-text");
  const currItem = e.target.closest("li").querySelector("p").innerText;

  state.cart = state.cart.filter((item, i) => {
    if (item.name === currItem) {
      item.quantity++;
      console.log(item.price);
      state.total += Number(item.price);
      quantityBtn.innerText = item.quantity;
    }
    return item.quantity > 0;
  });
  renderCartItems(state.cart);
  getTotal();
}
