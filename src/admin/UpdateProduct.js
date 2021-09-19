import React, {useState, useEffect} from "react";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import {getProduct, getCategories, updateProduct} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import NavMenu from "./component/NavMenu";
import { Redirect } from "react-router";

function UpdateProduct(props) {

     const {user, authtoken} = isAuthenticated();

     const [values, setValues] = useState({
          name:"",
          description:"",
          price:"",
          stock:"",
          image:"",
          categories: [],
          category:"",
          loading:false,
          error:"",
          updatedProduct:"",
          getRedirect: false,
          formData:""
     });

     const {name, description, price, stock, image, category, categories, loading, error, updatedProduct, getRedirect, formData} = values;

     const preload = (productId) => {
          getProduct(productId).then(data => {
               if(data.error)
                    setValues({...values, error: data.error});
               else {
                    preloadCategories();
                    setValues({...values,
                         name: data.name,
                         description: data.description,
                         price: data.price,
                         category: data.category,
                         stock: data.stock,
                         formData: new FormData()});
               }
          })
     }

     const preloadCategories = () => {
          getCategories().then(data => {
               if(data.error) {
                    setValues(prevState => {
                         return {...prevState, error: data.error}
                    })
               }  
               else {
                    setValues(prevState => {
                         return {...prevState, categories: data, formData: new FormData()}
                    })
               }      
          })
     }

     useEffect(() => {
          preload(props.match.params.productId);
     }, []);

     const onSubmit = (event) => {
          event.preventDefault();
          setValues({...values, error: "", loading: true});
          updateProduct(user._id, authtoken, formData, props.match.params.productId)
               .then(data => {
               if(data.error)
                    setValues({...values, loading: false, error: data.error})
               else 
                    setValues({...values, loading:false, updatedProduct: data.name, name: "", description:"", price:"", stock:"", image:"", getRedirect: true})
               })
               .catch(err => console.log(err))
     }

     const handleChange = name => event => {
          const value = name === "image" ? event.target.files[0] : event.target.value;
          formData.set(name, value);
          setValues({...values, [name]: value});
     }

     const successMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-success text-center" style={{display: updatedProduct ? "" : "none"}}>
                         {updatedProduct} updated successfully. Redirecting back in 5 seconds...
                    </div>
               </div>
          );
     }

     const errorMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                         Failed to update product. {error}
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

     const updateProductForm = () => (
     <form className="p-2">
          <h5>Product image</h5>
          <div className="form-group">
          <label className="btn btn-block btn-purple mb-4 rounded">
               <input
               onChange={handleChange("image")}
               type="file"
               name="image"
               accept="image"
               placeholder="choose a file"
               />
          </label>
          </div>
          <div className="form-group mb-4">
          <input
               onChange={handleChange("name")}
               name="image"
               className="form-control"
               placeholder="Name"
               value={name}
          />
          </div>
          <div className="form-group mb-4">
          <textarea
               onChange={handleChange("description")}
               name="image"
               className="form-control"
               placeholder="Description"
               value={description}
          />
          </div>
          <div className="form-group mb-4">
          <input
               onChange={handleChange("price")}
               type="number"
               className="form-control"
               placeholder="Price"
               value={price}
          />
          </div>
          <div className="form-group mb-4">
          <select
               onChange={handleChange("category")}
               className="form-control"
               placeholder="Category"
          >
               <option>Category</option>
               {categories && 
               categories.map((cate, index) => {
                    if(category === cate._id)
                         return (<option key={index} value={cate._id} selected>{cate.name}</option>) 
                    else
                         return (<option key={index} value={cate._id} >{cate.name}</option>)
               })}
          </select>
          </div>
          <div className="form-group mb-4">
          <input
               onChange={handleChange("stock")}
               type="number"
               className="form-control"
               placeholder="Quantity"
               value={stock}
          />
          </div>

          <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-purple rounded"
          >
          Update Product
          </button>
     </form>
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
                                   <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Update product</h4>
                                   {successMsg()}
                                   {errorMsg()}
                                   {handleRedirect()}
                                   {updateProductForm()}
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default UpdateProduct;