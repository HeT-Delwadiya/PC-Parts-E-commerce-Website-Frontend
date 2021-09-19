import React from "react";
import ImageHelper from "../../core/helper/ImageHelper";

function OrderDetailsCard({order}) {
     
     return (
          <div>
               <div>
                         <p>Order ID: {order._id}</p>
                         <p>Status: {order.status}</p>
                         <hr/>

                         <h4 className="mb-4"><span className="p-1 theme-bg rounded text-white px-2">Payment Info</span></h4>
                              <p>Transaction ID: {order.transaction_id}</p>
                              <p>Total amount: {order.amount}</p>
                              <p>User ID: {order.user}</p>
                              <p>Created At: {order.createdAt}</p>
                              <hr/>

                         <h4 className="mb-4"><span className="p-1 theme-bg rounded text-white px-2">Products Info</span></h4>
                              {order.products.map((product,index) => {
                                   return (<div key={index}>
                                        <div className="card p-3 pb-2 rounded">
                                             <div className="row">
                                                  <div className="col-lg-4">
                                                       <ImageHelper classProp={"card-img-top"} productId={product._id} /> 
                                                  </div>
                                                  <div className="col-lg-8 mt-3">
                                                       <p>Product no. {index+1}</p>
                                                       <p>Product ID: {product._id}</p>
                                                       <p>Product name: {product.name}</p>
                                                       <p>Product  quantity: {product.count}</p>
                                                       <p>Product price: {product.price}</p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>)
                              })}
                              <hr/>

                         <h4 className="mb-4"><span className="p-1 theme-bg rounded text-white px-2">Shipping Info</span></h4>
                              <p>Name: {order.userInfo.name}</p>
                              <p>Email: {order.userInfo.email}</p>
                              <p>Phone: {order.userInfo.phone}</p>
                              <p>Address: {order.userInfo.address}</p>
                              <p>City: {order.userInfo.city}</p>
                              <p>State: {order.userInfo.state}</p>
                              <p>Country: {order.userInfo.country}</p>
                              <p>Zipcode: {order.userInfo.zipcode}</p>
               </div>
          </div>
     );
}

export default OrderDetailsCard;