import React from "react";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import { isAuthenticated } from "../auth/helper/index";
import OrderDetailsCard from "../admin/component/OrderDetailsCard";
import UserDashboardNav from "./components/UserDashboardNav";
import { getOrderById } from "../admin/helper/adminapicall";

function UserOrderDetails(props) {

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

     const userProfile = () => {
          return (
               <div>
                    <div className="container bootstrap snippets bootdey">
                    <div className="row">
                    <div className="profile-nav col-md-3">
                         <div className="panel rounded">
                              <div className="user-heading rounded p-5">
                              <a href="#">
                                   <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt=""/>
                              </a>
                              <h1 className="pt-3">{user.name}</h1>
                              </div>

                              <div className="mb-5 mt-3">
                                   <UserDashboardNav />
                              </div>
                              
                              
                         </div>
                    </div>
                    
                    <div className="profile-info col-md-9">
                         <div className="card bg-light mb-5">

                         <h4 className="card-header text-center mb-4 text-white theme-bg rounded mt-3 ms-3 me-3">My Orders</h4>
                              
                              <div className="mb-5 rounded">
                                   <div className="panel px-4">
                                        
                                        {isOrderLoaded && showOrderDetails()}
                                             
                                   </div>
                              </div>
                              
                         </div>
                    </div>
                    </div>
                    </div>
               </div>
          );
     }
     
     return (
          <div>
               <Header userRoute={true} />
                    {userProfile()}
               <Footer />
          </div>
     );
}

export default UserOrderDetails;