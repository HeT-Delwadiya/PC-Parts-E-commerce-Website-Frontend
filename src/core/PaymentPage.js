import React from "react";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";
import { getToken, processPayment } from "./helper/paymentHelper";
import { emptyCart, loadCart } from "./helper/coreapicalls";
import { createOrder } from "./helper/orderHelper";
import { Link } from "react-router-dom";

function PaymentPage() {

     const {user, authtoken} = isAuthenticated();

     const [products, setProducts] = React.useState([]);

     const purchaseText = "Purchase";
     const loadingText = "Processing...";

     const [info, setInfo] = React.useState({
          loading: false,
          success: false,
          error: "",
          clientToken: null,
          instance: {},
          payBtn: true
     })

     const [userInfo, setUserInfo] = React.useState({
          name: "",
          email: "",
          address: "",
          phone: "",
          city: "",
          state: "",
          country: "",
          zipcode: ""
     })

     const {name, email, address, phone, city, state, country, zipcode} = userInfo;

     const grabToken = () => {
          getToken(user._id, authtoken).then(data => {
               if(data.error)
                    setInfo({...info, error: data.error})
               else {
                    const clientToken = info.clientToken;
                    setInfo({...info, clientToken: data.clientToken });
               }
          });
     } 

     React.useEffect(() => {
          grabToken();
          setProducts(loadCart());
     }, [])

     const getAmount = () => {
          let amount = 0;
          products.map(product => {
               amount = amount + (product.price * product.count);
          })
          return amount;
     }

     const showDropIs = () => {
          return (
               <div>
                    <h1 className="theme-color">Payment</h1>
                    {info.clientToken !== null && products.length > 0 ? (<div>
                         <DropIn
                              options={{ authorization: info.clientToken }}
                              onInstance={instance => {info.instance = instance}}
                              />
                         {info.payBtn ? (<button className="btn btn-purple rounded w-100 mb-5" onClick={onPurchase}>{!info.loading ? purchaseText : loadingText}</button>) : (<button className="btn btn-purple rounded w-100 mb-5" disabled>Payment Done</button>)}
                    </div>) : (loadingMsg())}
               </div>
          );
     }

     const onPurchase = () => {
          setInfo({...info, loading: true});
          if (name!== null && email!== null && address!== null && phone!== null && city!== null && state!== null && country!== null && zipcode!== null) {
               let nonce;
               let getNonce = info.instance.requestPaymentMethod()
                    .then(data => {
                         nonce = data.nonce
                         const paymentData = {
                              paymentMethodNonce: nonce,
                              amount: getAmount()
                         };
                         processPayment(user._id, authtoken, paymentData)
                              .then(response => {
                                   if(response.errors) {
                                        setInfo({...info, success: false, error: response.message, loading: false})
                                   } else {
                                        const orderData = {
                                             products: products,
                                             transaction_id: response.transaction.id,
                                             amount: response.transaction.amount,
                                             userInfo: userInfo
                                        }
                                        createOrder(user._id, authtoken, orderData)
                                             .then(data => {
                                                  if(data.error) {
                                                       setInfo({...info, loading: false, error: data.error});
                                                  }
                                                  else
                                                       emptyCart(() => {
                                                            setInfo({...info, success: true, error: "", payBtn: false, loading: false})
                                                       });
                                             })
                                   }
                              }).catch(error => (
                                   setInfo({...info, loading: false, error: error, success: false})
                              ))
                    })
          } else {
               setInfo({...info, error: "All fields are required!"})
          }
     }

     const allDetails = () => {
          return (<div>
                    <div className="">
                         <h1>Shipping</h1>
                         <p>Please enter your shipping details.</p>
                         <hr />
                         
                         <form>
                              <div className="form-floating form-group mb-3">
                                   <input type="text" onChange={handleChange("name")} value={name} className="form-control" id="floatingName" placeholder="John Doe"/>
                                   <label htmlFor="floatingName">Full Name</label>
                              </div>
                              <div className="form-floating form-group mb-3">
                                   <input type="email" onChange={handleChange("email")} value={email} className="form-control" id="floatingEmail" placeholder="name@example.com"/>
                                   <label htmlFor="floatingEmail">Email</label>
                              </div>
                              <div className="form-floating form-group mb-3">
                                   <input type="text" onChange={handleChange("address")} value={address} className="form-control" id="floatingAddress" placeholder="Address"/>
                                   <label htmlFor="floatingAddress">Address</label>
                              </div> 
                              <div className="form-floating form-group mb-3">
                                   <input type="number" onChange={handleChange("phone")} value={phone} className="form-control" id="floatingPhone" placeholder="9988776655"/>
                                   <label htmlFor="floatingPhone">Phone Number</label>
                              </div>  
                              <div className="form-floating form-group mb-3">
                                   <input type="text" onChange={handleChange("city")} value={city} className="form-control" id="floatingCity" placeholder="Mumbai"/>
                                   <label htmlFor="floatingCity">City</label>
                              </div>  
                              <div className="form-floating form-group mb-3">
                                   <input type="text" onChange={handleChange("state")} value={state} className="form-control" id="floatingstate" placeholder="Maharastra"/>
                                   <label htmlFor="floatingstate">State</label>
                              </div>
                              <div className="form-floating form-group mb-3">
                                   <input type="text" onChange={handleChange("country")} value={country} className="form-control" id="floatingcountry" placeholder="India"/>
                                   <label htmlFor="floatingcountry">Country</label>
                              </div>
                              <div className="form-floating form-group mb-3">
                                   <input type="number" onChange={handleChange("zipcode")} value={zipcode} className="form-control" id="floatingzipcode" placeholder="330001"/>
                                   <label htmlFor="floatingzipcode">Zip Code</label>
                              </div>
                         </form>

                    </div>
                    <hr/>
               </div>);
     }

     const handleChange = name => event => {
          setUserInfo({...userInfo, [name]:event.target.value});
          setInfo({...info, error:""})
     }

     const successMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-success text-center" style={{display: info.success ? "" : "none"}}>
                         Your order placed successfully. <Link to="/">Click here</Link> to shop other products.
                    </div>
               </div>
          );
     }

     const errorMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-danger text-center" style={{display: info.error ? "" : "none"}}>
                         {info.error}
                    </div>
               </div>
          );
     }

     const loadingMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-success text-center" style={{display: info.loading ? "" : "none"}}>
                         Loading ...
                    </div>
               </div>
          );
     }


     
     return (
          <div>
               <Header/>
                    <div className="container">
                         {successMsg()}
                         {errorMsg()}
                         {loadingMsg()}
                         {allDetails()}
                         {showDropIs()}
                    </div>
               <Footer />
          </div>
     );
}

export default PaymentPage;