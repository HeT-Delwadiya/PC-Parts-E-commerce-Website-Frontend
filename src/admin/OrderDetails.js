import React from "react";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import { isAuthenticated } from "../auth/helper/index";
import NavMenu from "../admin/component/NavMenu";
import { getOrderById } from "./helper/adminapicall";
import OrderDetailsCard from "./component/OrderDetailsCard";

function OrderDetails(props) {

     const [order, setOrder] = React.useState({});
     const [isOrderLoaded, setIsOrderLoaded] = React.useState(false);

     const {user, authtoken} = isAuthenticated();

     const preload = (orderId) => {
          getOrderById(user._id, orderId, authtoken).then(data => {
               if(data.error)
                    console.log(data.error);
               else {
                    setOrder(data);
                    setIsOrderLoaded(true);
               }  
          })
     }

     React.useEffect(()=> {
          preload(props.match.params.orderId);
     }, [])

     const showOrderDetails = () => {
          return (
               <div>
                    <OrderDetailsCard order={order} />
               </div>
          );
     }
     
     return (
          <div>
               <Header />
               <div className="container mt-4 mb-4">
                    <div className="row">
                         <div className="col-3"><NavMenu /></div>
                         <div className="col-9">
                              <div className="card bg-light p-4">
                                   <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Order details</h4>
                                   {isOrderLoaded && showOrderDetails()}
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default OrderDetails;