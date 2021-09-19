import React from "react";
import { Redirect } from "react-router";
import { getProduct } from "../admin/helper/adminapicall";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import ProductShowcase from "./components/ProductShowcase";
import { addItemToCart } from "./helper/coreapicalls";

function Product(props) {

     let path = props.location.pathname;
     let productId = path.slice(9);

     const [product, setProduct] = React.useState({});
     const [redirect, setRedirect] = React.useState(false);

     const grabProduct = () => {
          getProduct(productId).then(data => {
               if(data.error)
                    console.log(data.error);
               else
                    setProduct(data)
          });
     }

     React.useEffect(() => {
          grabProduct();
     }, [])

     const onSubmit = (product, count) => {
          addItemToCart(product, count,() => {
               setRedirect(true);
          })
     }

     const redirectToCart = () => {
          if(redirect)
               return <Redirect to="/cart" />
     }
     
     return (
          <div>
               <Header title="Product"/>
                    <ProductShowcase product={product} onSubmit={onSubmit}/>
                    {redirectToCart()}
               <Footer />
          </div>
     );
}

export default Product;