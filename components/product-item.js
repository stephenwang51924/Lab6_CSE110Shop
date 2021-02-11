// product-item.js

class ProductItem extends HTMLElement {
  constructor(itemImage, itemTitle, itemPrice, itemId, itemStatus) {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    let style = document.createElement("style");
    style.textContent = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }`;
      
      localStorage = window.localStorage;
      let list = document.createElement("li");
      list.setAttribute("class", "product");

      let image = document.createElement("img");
      image.setAttribute("src", itemImage);
      image.setAttribute("alt", itemTitle);
      image.setAttribute("width", "200");

      let paragraph1 = document.createElement("p");
      paragraph1.setAttribute("class", "title");
      paragraph1.textContent = itemTitle;

      let paragraph2 = document.createElement("p");
      paragraph2.setAttribute("class", "price");
      paragraph2.textContent = "$" + itemPrice;

      let button = document.createElement("button");
      button.setAttribute("onclick", "clickButton()");
      button.textContent = itemStatus;
      button.onclick = function()
      {
        let count = document.getElementById("cart-count");
        if(button.textContent == "Add to Cart")
        {
          cartList.push(itemId);
          button.textContent = "Remove from Cart";
          alert("Added to Cart!");
        }
        else
        {
          cartList.splice(cartList.indexOf(itemId), 1);
          button.textContent = "Add to Cart";
          alert("Removed from Cart!");
        }
        count.textContent = cartList.length;
        localStorage.setItem("cart", JSON.stringify(cartList));
      }

      list.appendChild(image);
      list.appendChild(paragraph1);
      list.appendChild(paragraph2);
      list.appendChild(button);
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(list);
  }
}

customElements.define('product-item', ProductItem);