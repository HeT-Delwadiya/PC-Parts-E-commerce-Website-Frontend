import API from "../../backend";

export const getProducts = () => {
     return fetch(`${API}/products/all`,{
          method: "GET"
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const addItemToCart = (product, count, next) => {
     let cart=[]
     if(typeof window!== undefined) {
          if(localStorage.getItem("cart"))
               cart = JSON.parse(localStorage.getItem("cart"))
     }
     cart.push({...product, count: count})

     localStorage.setItem("cart", JSON.stringify(cart));
     next();
}

export const loadCart = () => {
     if(typeof window!== undefined) {
          if(localStorage.getItem("cart"))
               return JSON.parse(localStorage.getItem("cart"));
          else {
               let cart = [];
               localStorage.setItem("cart", JSON.stringify(cart));
               return JSON.parse(localStorage.getItem("cart"));
          }  
     }
}

export const removeItemFromCart = (productId) => {
     let cart = [];
     if(typeof window !== undefined) {
          if(localStorage.getItem("cart"))
               cart = JSON.parse(localStorage.getItem("cart"));

          cart.map((product, i) => {
               if(product._id === productId)
                    cart.splice(i, 1)
          })
          localStorage.setItem("cart", JSON.stringify(cart));
     }
     return cart;
}

export const emptyCart = next => {
     if(typeof window!== undefined) {
          localStorage.removeItem("cart");
     }
     let cart = [];
     localStorage.setItem("cart", JSON.stringify(cart));
     next();
}