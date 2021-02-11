// Script.js
let localStorage = window.localStorage;
let cartList = [];

window.addEventListener('DOMContentLoaded', async () => {
  let response = await fetch("https://fakestoreapi.com/products");
  if(response.ok)
  {
    let json = await response.json();
    if(localStorage.getItem("array") == null)
    {
      localStorage.setItem("array", json);
    }
    let productList = document.getElementById("product-list");
    if(localStorage.getItem("cart") != null)
    {
      cartList = JSON.parse(localStorage.getItem("cart"));
      document.getElementById("cart-count").textContent = cartList.length;
    }
    for(let i = 0; i < json.length; i++)
    {
      let itemStatus;
      if(cartList.includes(json[i].id))
      {
        itemStatus = "Remove from Cart";
      }
      else
      {
        itemStatus = "Add to Cart";
      }
      let product = new ProductItem(json[i].image, json[i].title, json[i].price, json[i].id, itemStatus);
      productList.appendChild(product);
    }
  }
});

