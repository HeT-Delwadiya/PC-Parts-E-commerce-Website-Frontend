import React from "react";
import API from "../../backend";

function ImageHelper(props) {
     
     return (
               <img className={props.classProp} data-src="holder.js/100px180/" alt="100%x180" style={props.styleProp} src={`${API}/product/${props.productId}/image`} data-holder-rendered="true"/>
     );
}

export default ImageHelper;