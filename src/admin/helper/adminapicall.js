import API from "../../backend";

//CATEGORY API

export const createCategory = (userId, token, category) => {
     return fetch(`${API}/user/${userId}/category/create`,{
          method: "POST",
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(category)
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const getCategory = (categoryId) => {
     return fetch(`${API}/category/${categoryId}`,{
          method: "GET"
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const getCategories = () => {
     return fetch(`${API}/categories/all`,{
          method: "GET"
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const deleteCategory = (userId, token, categoryId) => {
     return fetch(`${API}/user/${userId}/category/${categoryId}/delete`,{
          method: "DELETE",
          headers: {
               Accept: "application/json",
               Authorization: `Bearer ${token}`
          }
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const updateCategory = (userId, token, category, categoryId) => {
     return fetch(`${API}/user/${userId}/category/${categoryId}/update`,{
          method: "PUT",
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(category)
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

//PRODUCT API

export const createProduct = (userId, token, product) => {
     return fetch(`${API}/user/${userId}/product/create`,{
          method: "POST",
          headers: {
               Accept: "application/json",
               Authorization: `Bearer ${token}`
          },
          body: product
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const getAllProducts = () => {
     return fetch(`${API}/products/all`,{
          method: "GET"
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const getProduct = (productId) => {
     return fetch(`${API}/product/${productId}`,{
          method: "GET"
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const updateProduct = (userId, token, product, productId) => {
     return fetch(`${API}/user/${userId}/product/${productId}/update`,{
          method: "PUT",
          headers: {
               Accept: "application/json",
               Authorization: `Bearer ${token}`
          },
          body: product
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const deleteProduct = (userId, token, productId) => {
     return fetch(`${API}/user/${userId}/product/${productId}/delete`,{
          method: "DELETE",
          headers: {
               Accept: "application/json",
               Authorization: `Bearer ${token}`
          }
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

// Order APIs

export const getAllOrders = (userId, token) => {
     return fetch(`${API}/user/${userId}/orders/all`,{
          method: "GET",
          headers: {
               Authorization: `Bearer ${token}`
          }
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const getOrderById = (userId, orderId, token) => {
     return fetch(`${API}/user/${userId}/order/${orderId}/details`,{
          method: "GET",
          headers: {
               Authorization: `Bearer ${token}`
          }
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}

export const updateOrderStatus = (userId, token, orderId, statusData) => {
     return fetch(`${API}/user/${userId}/order/${orderId}/status/update`,{
          method: "PUT",
          headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(statusData)
     })
     .then(response => response.json())
     .catch(err => console.log(err))
}