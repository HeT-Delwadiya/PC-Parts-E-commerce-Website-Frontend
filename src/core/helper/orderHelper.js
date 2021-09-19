import API from "../../backend";

export const createOrder = (userId, token, orderData) => {
     console.log(orderData);
     return fetch(`${API}/user/${userId}/order/create`,{
          method: "POST",
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({order: orderData})
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}
