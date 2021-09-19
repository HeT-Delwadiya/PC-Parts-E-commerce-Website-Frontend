import React, {useState, useEffect} from "react";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import {updateCategory, getCategory} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import NavMenu from "./component/NavMenu";
import { Redirect } from "react-router";

function UpdateCategory(props) {

     const {user, authtoken} = isAuthenticated();

     const [values, setValues] = useState({
          name:"",
          loading:false,
          error:"",
          updatedCategory:"",
          getRedirect: false
     });

     const {name, loading, error, updatedCategory, getRedirect} = values;

     const preload = (categoryId) => {
          getCategory(categoryId).then(data => {
               if(data.error)
                    setValues({...values, error: data.error});
               else 
                    setValues({...values, name: data.name});
          })
     }

     useEffect(() => {
          preload(props.match.params.categoryId);
     }, []);

     const onSubmit = (event) => {
          event.preventDefault();
          setValues({...values, error: "", loading: true});
          updateCategory(user._id, authtoken, {name}, props.match.params.categoryId)
               .then(data => {
               if(data.error)
                    setValues({...values, loading: false, error: data.error})
               else 
                    setValues({...values, loading: false, updatedCategory: data.Message, name: "", getRedirect: true})
               })
               .catch(err => console.log(err))
     }

     const handleChange = event => {
          setValues({...values, name: event.target.value, error: false});
     }

     const successMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-success text-center" style={{display: updatedCategory ? "" : "none"}}>
                         {updatedCategory}. Redirecting back in 5 seconds...
                    </div>
               </div>
          );
     }

     const errorMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                         Failed to update category. {error}
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

     const updateCategoryForm = () => (
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
                         Update Category
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
                                   <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Update category</h4>
                                   {successMsg()}
                                   {errorMsg()}
                                   {handleRedirect()}
                                   {updateCategoryForm()}
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default UpdateCategory;