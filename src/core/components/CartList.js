import React from "react";
import ImageHelper from "../helper/ImageHelper";

function CartList(props) {
     
     return (
          <div className="container d-flex justify-content-center mt-5 mb-5">
               <div className="card card-body">
                    <div className="media text-lg-left flex-column flex-lg-row">
                         <div className="row">
                              <div className="col-lg-3 text-center">
                                   <div className="mr-2 mb-3 mb-lg-0 mt-3"> 
                                        <ImageHelper classProp={"card-img-top"} productId={props.product._id} />
                                   </div>
                              </div>
                              <div className="col-lg-9">
                                   <div className="media-body">
                                        <h5 className="media-title font-weight-semibold theme-color">{props.product.name}</h5>
                                        <p className="mb-1">{props.product.description.slice(0, 100) + (props.product.description.length > 100 ? "..." : "")}</p>
                                        <p><span className="text-dark font-weight-bold h6 text-white theme-bg rounded p-1 mb-3">Quantity: {props.product.count}</span></p>
                                   </div>
                                   <div className="mt-3 mt-lg-0 ml-lg-3 text-left">
                                        <h3 className="mb-0 font-weight-semibold theme-color">${props.product.price} </h3> 
                                        <button type="button" onClick={() => {props.removeItem(props.product._id); props.setReload(!props.reload)}} className="btn btn-purple rounded mt-3 text-white"><i className="icon-cart-add mr-2"></i> Remove product</button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default CartList;