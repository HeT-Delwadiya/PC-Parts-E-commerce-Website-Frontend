import React from "react";
import { getCategory } from "../../admin/helper/adminapicall";
import ImageHelper from "../helper/ImageHelper";
import NumberFormat from 'react-number-format';

function ProductShowcase(props) {

     const [count, setCount] = React.useState(1);
     const [category, setCategory] = React.useState("");

     const handleChange = (event) => {
          setCount(parseInt(event.target.value));
     }

     const decreaseQty = () => {
          if(count>1)
               setCount(count-1);
     }

     const increaseQty = () => {
          setCount(parseInt(count+1));
     }

     const categoryName = () => {
          getCategory(props.product.category).then(data => {
               if(data.error)
                    console.log(data.error);
               else
                    setCategory(data.name);
          });
     }

     
     return (
          <div>
               {categoryName()}
               <div className="modal-content overflow-hidden container mb-5">
                    <div className="position-relative p-4 p-md-5">
                    
                         <div className="d-flex flex-column flex-lg-row align-items-center py-5">
                              <div className="row">
                                   <div className="col-lg-4 col-md-12">
                                        <div className="position-relative bg-white mb-4 mb-lg-0">
                                             <div className="badges"><span className="px-4 py-2 fw-normal mb-0 rounded-0 text-uppercase ms-1 badge bg-success">New</span><span className="px-4 py-2 fw-normal mb-0 rounded-0 text-uppercase ms-1 badge bg-danger">Sale</span></div>
                                             <ImageHelper classProp={"img-fluid d-block mx-auto"} styleProp={{width:"400"}} productId={props.product._id} />
                                        </div>
                                   </div>
                                   <div className="col-lg-8 col-md-12">
                                        <div className="ms-lg-5 text-center text-lg-start">
                                             
                                             <h2 id="productModalLabel" className="mb-5 theme-color">{props.product.name}</h2>
                                             <p className="lead mb-2">{props.product.description}</p>
                                             <p className="mb-4"><span className="text-white theme-bg rounded p-1">{category}</span></p>
                                             <p className="h4 theme-color mt-5 mb-5"><span className="text-dark me-3">Price: </span><sup> $ </sup><NumberFormat value={props.product.price} displayType={'text'} thousandSeparator={true} /></p>
                                             <ul className="list-inline d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-lg-start flex-wrap text-center text-sm-start">
                                             
                                             <div><p className="lead me-3">Quantity: </p></div>
                                             <div>
                                                  <li className="list-inline-item my-2 me-3">
                                                       <div className="input-group">
                                                            <button className="btn btn-outline-secondary shadow-0 btn-sm border-gray-400 px-3 me-1" onClick={decreaseQty}>-</button>
                                                            <input className="form-control form-control-sm border-gray-400 shadow-none num-only text-center quantity flex-shrink-0" type="number" onChange={handleChange} value={count}/>
                                                            <button className="btn btn-outline-secondary shadow-0 btn-sm border-gray-400 px-3 ms-1" onClick={increaseQty}>+</button>
                                                       </div>
                                                  </li>
                                             </div>
                                             </ul><button className="btn btn-purple btn-lg rounded" onClick={() => props.onSubmit(props.product,count)}>Add to cart <i className="fas fa-shopping-bag ms-2"></i></button>
                                        </div>
                                   </div>
                              </div>
                         </div>

                    </div>
               </div>
          </div>
     );
}

export default ProductShowcase;