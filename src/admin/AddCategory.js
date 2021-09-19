import React from "react";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import NavMenu from "./component/NavMenu";
import {isAuthenticated} from "../auth/helper/index"
import { createCategory } from "./helper/adminapicall";

function AddCategory() {

     const [name, setName] = React.useState("");
     const [error, setError] = React.useState(false);
     const [success, setSuccess] = React.useState(false);

     const {user, authtoken} = isAuthenticated();

     const handleChange = (event) => {
          setName(event.target.value);
          setError("");
          setSuccess("")
     }

     const onSubmit = (event) => {
          event.preventDefault();
          setError("");
          setSuccess(false);

          //backend call
          createCategory(user._id, authtoken, {name})
          .then(data => {
               if(data.error)
                    setError(true)
               else {
                    setError("")
                    setSuccess(true);
                    setName("")
               }
          })
          .catch(err => console.log(err))
     }

     const createCategoryForm = () => {
          return (
               <div>
                    <form>
                         <div className="form-group">
                         <p className="my-3 ms-1 fs-5">Enter the category</p>
                         <input
                              type="text"
                              className="form-control my-3"
                              onChange={handleChange}
                              value={name}
                              autoFocus
                              required
                              placeholder="For Ex. Summer"
                         />
                         <button onClick={onSubmit} className="btn btn-purple rounded">
                              Create Category
                         </button>
                         </div>
                    </form>
               </div>
          );
     }

     const successMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-success text-center" style={{display: success ? "" : "none"}}>
                         Category created successfully.
                    </div>
               </div>
          );
     }

     const errorMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                         Failed to create category.
                    </div>
               </div>
          );
     }
     
     return (
          <div>
               <Header adminRoute="true" />
               <div className="container mt-4 mb-4">
                    <div className="row">
                         <div className="col-3"><NavMenu /></div>
                         <div className="col-9">
                              <div className="card bg-light p-4">
                                   <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Add new category</h4>
                                   {successMsg()}
                                   {errorMsg()}
                                   {createCategoryForm()}
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default AddCategory;