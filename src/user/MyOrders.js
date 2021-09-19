import React from "react";
import OrderDetailsCard from "../admin/component/OrderDetailsCard";
import { isAuthenticated } from "../auth/helper";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import UserDashboardNav from "./components/UserDashboardNav";
import { getPurchases } from "./helper/userapicalls"; 
import { Link} from "react-router-dom";

function MyOrders() {

     const [orders, setOrders] = React.useState([]);

     const {user, authtoken} = isAuthenticated();

     const preload = () => {
          getPurchases(user._id, authtoken).then(data => {
               if(data.error)
                    console.log(data.error);
               else
                    setOrders(data);
          });
     }

     React.useEffect(() => {
          preload();
     }, [])

     const showOrders = () => {
          return (
               <div>
                    <div className="card bg-light p-4 rounded border-dark mb-1">
                                   <div className="row text-left">
                                        <div className="col-7">
                                             <h5 className="text-left mt-2">Order ID</h5>
                                        </div>
                                        <div className="col-4">
                                             <h5 className="text-left mt-2">Order Status</h5>
                                        </div>
                                   </div>
                                   </div>
                    {orders && orders.length!=0 ? (orders.map((order, index) => (
                         <div key={index} className="card bg-light p-4 rounded border-dark mb-1">
                                   <div className="row text-left">
                                        <div className="col-7">
                                             <h5 className="text-left mt-2">{order._id}</h5>
                                        </div>
                                        <div className="col-3">
                                             <h5 className="text-left mt-2">{order.status}</h5>
                                        </div>
                                        <div className="col-1">
                                             
                                                       <Link
                                                            className="btn btn-success rounded"
                                                            to={`/user/${user._id}/order/${order._id}`}
                                                       >
                                                            <span className="">Details</span>
                                                       </Link>
                                                  
                                        </div>
                                   </div>
                                   </div>))) : (<h3 className="p-4 text-center">No purchases found in your account</h3>)}
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

                    <h4 className="card-header text-center mb-4 text-white theme-bg rounded">My Orders</h4>
                         
                         <div className="mb-5 rounded">
                              <div className="panel px-4">
                                   
                                   {showOrders()}
                                        
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

export default MyOrders;