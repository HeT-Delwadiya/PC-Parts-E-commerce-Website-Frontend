import API from "../../backend";

export const postTokenId = (tokenId) => {
     return fetch(`${API}/auth/google`,{
          method: "POST",
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json"
          },
          body: JSON.stringify(tokenId)
     })
     .then(response => response.json())
     .catch(err => console.log(err)) 
}

export const postFbLogin = (fbData) => {
     return fetch(`${API}/auth/facebook`,{
          method: "POST",
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json"
          },
          body: JSON.stringify(fbData)
     })
     .then(response => response.json())
     .catch(err => console.log(err)) 
}

export const getPurchases = (userId, token) => {
     return fetch(`${API}/user/${userId}/orders`, {
          method: "GET",
          headers: {
               Authorization: `Bearer ${token}`
          }
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}