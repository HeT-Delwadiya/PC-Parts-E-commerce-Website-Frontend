import React from "react";
import { Redirect } from "react-router";
import { isAuthenticated } from "../auth/helper";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import CartList from "./components/CartList";
import {loadCart, removeItemFromCart} from "./helper/coreapicalls";
import NumberFormat from 'react-number-format';

function Cart() {

     const {user, authtoken} = isAuthenticated();

     const [products, setProducts] = React.useState([]);
     const [reload, setReload] = React.useState(false);
     const [redirectToCheckout, setRedirectToCheckout] = React.useState(false);
     const [redirectToLogin, setRedirectToLogin] = React.useState(false);

     React.useEffect(() => {
          setProducts(loadCart());
     }, [reload])

     const onRemove = (productId) => {
          removeItemFromCart(productId);
     }

     const loadAllCartProducts = () => {
          return (
               <div>
                    {products && products.map((product, index) => (
                         <CartList key={index} product={product} removeItem={onRemove} reload={reload} setReload={setReload} />
                    ))}
               </div>
          )
     }

     const getAmount = () => {
          let amount = 0;
          products.map(product => {
               amount = amount + (product.price * product.count);
          })
          return amount;
     }

     const onCheckout = () => {
          if(products.length > 0) {
               if(isAuthenticated()) 
                    setRedirectToCheckout(true);
               else
                    setRedirectToLogin(true);
          } else
               alert("No products in cart to checkout. Please add some products!")
     }

     const onRedirectToCheckout = () => {
          if(redirectToCheckout)
               return <Redirect to={`/user/${user._id}/payment`} />
     }

     const onRedirectToLogin = () => {
          if(redirectToLogin)
               return <Redirect to="/login" />
     }
               

     const loadCheckout = () => {
          return (
               <div>
                    <div className="card mb-5">
                         <h5 className="card-header text-center">Order Summary</h5>
                         <div className="card-body">
                              <h5 className="card-title mb-4">Total products: {products.length}</h5>
                              <ul>
                              {products && products.map((product, index) => {
                                   return (<li key={index}><p className="card-text mb-2">{product.name}</p></li>)
                              })}
                              </ul>
                              <h5 className="card-title mb-4">Total amount:  $<NumberFormat value={getAmount()} displayType={'text'} thousandSeparator={true} /></h5>
                              <button className="btn btn-purple w-100 rounded" onClick={() => onCheckout()} type="submit">Checkout</button>
                         </div>
                    </div>
               </div>
          )
     }
     
     return (
          <div>
               <Header title="Your shopping cart"/>
                    <div className="container">
                         <div className="row">
                              <div className="col-lg-8">{products && products.length > 0 ? loadAllCartProducts() : (<div className="mt-5 mb-5 card bg-light p-5 text-center">
                                   <span className="theme-bg pt-2 text-white rounded"><h3>No products available in cart</h3></span>
                                   <h3 className="mt-5 pt-5 pb-5">Goto home and find some products to purchase.</h3>
                              </div>)}</div>
                              <div className="col-lg-4">{loadCheckout()}</div>
                         </div>
                    </div>
                    {onRedirectToCheckout()}
                    {onRedirectToLogin()}
               <Footer />
          </div>
     );
}

export default Cart;