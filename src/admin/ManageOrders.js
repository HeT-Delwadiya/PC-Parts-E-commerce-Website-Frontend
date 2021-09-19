import React from "react";
import { isAuthenticated } from "../auth/helper";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import NavMenu from "./component/NavMenu";
import { getAllOrders } from "./helper/adminapicall";
import { Link} from "react-router-dom";

function ManageProducts() {

     const [orders, setOrders] = React.useState([]);

     const {user, authtoken} = isAuthenticated();

     const preload = () => {
          getAllOrders(user._id, authtoken).then(data => {
               if(data.error)
                    console.log(data.error);
               else 
                    setOrders(data);
          }).catch(err => console.log(err))
     }

     React.useEffect(() => {
          preload();
     }, []);

     const ordersList = () => (
          <div>
               <h2 className="mb-4 ms-2">All Orders:</h2>
               <div className="row">
                    <div className="col-12">
                         {/* <h2 className="text-center my-3">Total 3 products</h2> */}

                         <div className="card bg-light p-4 rounded border-dark mb-1">
                                   <div className="row text-left">
                                        <div className="col-6">
                                             <h5 className="text-left mt-2 theme-color font-weight-bold">Order Id</h5>
                                        </div>
                                        <div className="col-3">
                                             <h5 className="text-left mt-2 theme-color font-weight-bold">Status</h5>
                                        </div>
                                        <div className="col-2">
                                             <h5 className="text-center mt-2 theme-color font-weight-bold">Actions</h5>
                                        </div>
                                   </div>
                                   </div>

                         {orders.map((order, index) => {
                              return (
                                   <div key={index} className="card bg-light p-4 rounded border-dark mb-1">
                                   <div className="row text-left">
                                        <div className="col-6">
                                             <h5 className="text-left mt-2">{order._id}</h5>
                                        </div>
                                        <div className="col-3">
                                             <h5 className="text-left mt-2">{order.status}</h5>
                                        </div>
                                        <div className="col-2">
                                             <div className="row">
                                                  <div className="col-5">
                                                       <Link
                                                            className="btn btn-success rounded"
                                                            to={`/admin/order/${order._id}`}
                                                       >
                                                            <span className="">Details</span>
                                                       </Link>
                                                  </div>
                                                  <div className="col-2"></div>
                                                  <div className="col-5">
                                                       <Link
                                                            className="btn btn-danger rounded"
                                                            to={`/admin/order/${order._id}/update`}
                                                       >
                                                            <span className="">Update</span>
                                                       </Link>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </div>
     )
     
     return (
          <div>
               <Header adminRoute="true"/>
               <div className="container mt-4 mb-4">
                    <div className="row">
                         <div className="col-3">
                              <NavMenu />
                         </div>
                         <div className="col-9">
                              <div className="card bg-light p-4">
                                   <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Manage orders</h4>
                                   {ordersList()}
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default ManageProducts;