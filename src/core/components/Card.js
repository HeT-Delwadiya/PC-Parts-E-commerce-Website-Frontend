import React from "react";
import ImageHelper from "../helper/ImageHelper";
import NumberFormat from 'react-number-format';

function Card(props) {
     
     return (

          <div className="card" style={{width: "18rem", borderRadius:"5px"}}>
               <ImageHelper classProp={"card-img-top border border-dark"} styleProp={{height: "180px", width: "100%", borderRadius:"5px", borderBottomLeftRadius:"0px", borderBottomRightRadius:"0px",display: "block"}} productId={props.product._id} />
               <div className="card-body dark-bg" style={{borderRadius:"5px", borderTopLeftRadius:"0px", borderTopRightRadius:"0px"}}>
                    <div className="rounded pt-1"><h5 className="card-title text-white">{props.product.name}</h5></div>
                    <p className="card-text badge theme-bg mr-2">$ <NumberFormat value={props.product.price} displayType={'text'} thousandSeparator={true} /></p>
                    <div className="row">
                    <div className="col-6">
                         <button onClick={() => props.onSubmit(props.product)} className="btn btn-purple w-100 rounded">Add to Cart</button>
                    </div>
                    <div className="col-6">
                         <button onClick={() => props.onDetails(props.product._id)} className="btn btn-purple w-100 rounded">Details</button>
                    </div>
                    </div>
               </div>
          </div>

     );
}

export default Card;

