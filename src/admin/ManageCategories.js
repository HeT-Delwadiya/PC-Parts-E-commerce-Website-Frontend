import React from "react";
import NavMenu from "./component/NavMenu";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import {deleteCategory, getCategories} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

function ManageCategories() {

     const {user, authtoken} = isAuthenticated();

     const [values, setValues] = React.useState({
          categories: [],
          category: ""
     })

     const { categories, category} = values;

     const preload = () => {
          getCategories().then(data => {
               if(data.error)
                    setValues({...values, error: data.error});
               else
                    setValues({...values, categories: data});
          })
     }

     React.useEffect(() => {
          preload();
        }, []);

     const deleteThisCategory = (categoryId) => {
          deleteCategory(user._id, authtoken, categoryId)
          .then(data => {
               if(data.error)
                    console.log(data.error);
               else 
                    preload();
          }).catch(err => console.log(err))
     }

     const categoryList = () => (
          <div>
               <h2 className="mb-4 ms-2">All categories:</h2>
               <div className="row">
                    <div className="col-12">

                         <div className="card bg-light p-4 rounded border-dark mb-1">
                                   <div className="row text-left">
                                        <div className="col-8">
                                             <h5 className="text-left mt-2 theme-color font-weight-bold">Category Name</h5>
                                        </div>
                                        <div className="col-4">
                                             <h5 className="text-center mt-2 theme-color font-weight-bold">Actions</h5>
                                        </div>
                                   </div>
                                   </div>

                         {categories.map((cate, index) => {
                              return (
                                   <div key={index} className="card bg-light p-4 rounded border-dark mb-1">
                                   <div className="row text-left">
                                        <div className="col-8">
                                             <h5 className="text-left mt-2">{cate.name}</h5>
                                        </div>
                                        <div className="col-4">
                                             <div className="row">
                                                  <div className="col-5">
                                                       <Link
                                                            className="btn btn-success rounded"
                                                            to={`/admin/category/${cate._id}/update`}
                                                       >
                                                            <span className="">Update</span>
                                                       </Link>
                                                  </div>
                                                  <div className="col-2"></div>
                                                  <div className="col-5">
                                                       <button onClick={() => {deleteThisCategory(cate._id)}} className="btn btn-danger rounded">
                                                            Delete
                                                       </button>
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
                         <div className="col-3"><NavMenu /></div>
                         <div className="col-9">
                              <div className="card bg-light p-4">
                                   <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Manage categories</h4>
                                   {categoryList()}
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default ManageCategories;