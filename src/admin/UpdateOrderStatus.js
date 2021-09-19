import React, {useState, useEffect} from "react";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import {updateOrderStatus, getOrderById} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import NavMenu from "./component/NavMenu";
import { Redirect } from "react-router";

function UpdateOrderStatus(props) {

     const {user, authtoken} = isAuthenticated();

     const [values, setValues] = useState({
          status:"",
          loading:false,
          error:"",
          updatedStatus:"",
          getRedirect: false
     });

     const statusArr = ["Received","Processing","Shipped","Cancelled","Completed","Delivered"];

     const {status, loading, error, updatedStatus, getRedirect} = values;

     const preload = (orderId) => {
          getOrderById(user._id, orderId, authtoken).then(data => {
               if(data.error)
                    setValues({...values, error: data.error});
               else 
                    setValues({...values, status: data.status});
          })
     }

     useEffect(() => {
          preload(props.match.params.orderId);
     }, []);

     const onSubmit = (event) => {
          event.preventDefault();
          setValues({...values, error: "", loading: true});
          updateOrderStatus(user._id, authtoken, props.match.params.orderId, {status})
               .then(data => {
               if(data.error)
                    setValues({...values, loading: false, error: data.error})
               else 
                    setValues({...values, loading: false, updatedStatus: status, getRedirect: true})
               })
               .catch(err => console.log(err))
     }

     const handleChange = event => {
          setValues({...values, status: event.target.value, error: false});
     }

     const successMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-success text-center" style={{display: updatedStatus ? "" : "none"}}>
                         {updatedStatus}. Redirecting back in 5 seconds...
                    </div>
               </div>
          );
     }

     const errorMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                         Failed to update order. {error}
                    </div>
               </div>
          );
     }

     const handleRedirect = () => {
          if(getRedirect) {
               setTimeout(() => {
                    return <Redirect to="/admin/dashboard" />
               }, 5000)
          }
     }

     const updateOrderStatusForm = () => (
          <div>
               <form>
                    <div className="form-group">
                    <p className="my-3 ms-1 fs-5">Select order status</p>
                    <div className="form-group mb-4">
                         <select
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Status"
                         >
                              <option>Status</option>
                              {statusArr.map((stat, index) => {
                                   if (status == stat)
                                        return (<option key={index} value={stat} selected>{stat}</option>)
                                   else
                                        return (<option key={index} value={stat} >{stat}</option>)
                              })}
                         </select>
                    </div>
                    <button onClick={onSubmit} className="btn btn-purple rounded">
                         Update status
                    </button>
                    </div>
               </form>
          </div>
     );
     
     return (
          <div>
               <Header adminRoute="true" />
               <div className="container mt-4 mb-4">
                    <div className="row">
                         <div className="col-3">
                              <NavMenu />
                         </div>
                         <div className="col-9">
                              <div className="card bg-light p-4">
                                   <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Update order status</h4>
                                   {successMsg()}
                                   {errorMsg()}
                                   {handleRedirect()}
                                   {updateOrderStatusForm()}
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default UpdateOrderStatus;