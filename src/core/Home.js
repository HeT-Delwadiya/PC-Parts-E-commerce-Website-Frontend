import React from "react";
import { Redirect } from "react-router";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import Card from "./components/Card";
import { getProducts, addItemToCart } from "./helper/coreapicalls";

function Home() {

     const [redirect, setRedirect] = React.useState(false);
     const [redToProduct, setRedToProduct] = React.useState(false);
     const [products, setProducts] = React.useState([]);
     const [error, setError] = React.useState("");

     const loadAllProduct = () => {
          getProducts().then(data => {
               if(data.error)
                    setError(data.error);
               else
                    setProducts(data)
          });
     }

     React.useEffect(() => {
          loadAllProduct();
     }, [])

     const onSubmit = (product) => {
          addItemToCart(product, 1, () => {
               setRedirect(true);
          })
     }

     const onDetails = (productId) => {
          setRedToProduct(productId);
     }

     const redirectToProduct = () => {
          if(redToProduct)
               return <Redirect to={`/product/${redToProduct}`} />
     }

     const redirectToCart = () => {
          if(redirect)
               return <Redirect to="/cart" />
     }

     return (
          <div>
               <Header />
               <div className="container">
                    <div className="row">
                         {products && products.map((product, index) => {
                              return (
                                   <div key={index} className="col-lg-3 col-md-6 col-sm-12 mt-5 mb-5 text-center">
                                        <Card product={product} onSubmit={onSubmit} onDetails={onDetails} />
                                   </div>
                              )
                         })}
                         {redirectToCart()}
                         {redirectToProduct()}
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default Home;