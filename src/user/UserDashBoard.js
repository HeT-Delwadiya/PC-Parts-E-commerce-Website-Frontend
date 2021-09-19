import React from "react";
import { isAuthenticated } from "../auth/helper";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import UserDashboardNav from "./components/UserDashboardNav";
import { getPurchases } from "./helper/userapicalls";

function UserDashboard() {

     const {user, authtoken} = isAuthenticated();

     const [orders, setOrders] = React.useState(0);
     
     const preload = () => {
          getPurchases(user._id, authtoken).then(data => {
               if(data.error)
                    console.log(data.error);
               else
                    setOrders(data.length);
          });
     }

     React.useEffect(() => {
          preload();
     }, [])

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

                    <h4 className="card-header text-center mb-4 text-white theme-bg rounded">User Dashboard</h4>
                         
                         <div className="card mb-5 rounded">
                              <div className="panel px-4">
                                   
                                   
                                   
                                        <div className="panel-body bio-graph-info">
                                        <div className="row">
                                             <div className="bio-row pt-4">
                                                  <p><span>Name </span>: {user.name}</p>
                                             </div>
                                             <div className="bio-row pt-4">
                                                  <p><span>Email </span>: {user.email}</p>
                                             </div>
                                             <div className="bio-row">
                                                  <p><span>Country </span>: India</p>
                                             </div>
                                             <div className="bio-row">
                                                  <p><span>Orders</span>: {orders}</p>
                                             </div>
                                             
                                        </div>
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
               <Header />
                    {userProfile()}
               <Footer />
          </div>
     );
}

export default UserDashboard;