import { renderCartItems, getTotal } from "./app.js";

export function removeItem(e) {
  const removeBtn = e.target;
  if (!removeBtn.classList.contains("remove-btn")) return;
  const quantityBtn = removeBtn.closest("li").querySelector(".quantity-text");
  const currItem = e.target.closest("li").querySelector("p").innerText;

  state.cart = state.cart.filter((item, i) => {
    if (item.name === currItem && item.quantity > 0) {
      console.log(item.price);

      quantityBtn.innerText = item.quantity;
      if (item.quantity > 1) {
        state.total -= Number(item.price);
      }
      item.quantity--;
    }
    return item.quantity > 0;
  });
  state.baseTotal = state.cart.reduce((acc, item) => (acc += +item.price), 0);
  state.filtered = state.cart;
  renderCartItems(state.cart);
  getTotal();
}
