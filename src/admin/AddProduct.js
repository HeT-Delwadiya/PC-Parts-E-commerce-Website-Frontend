import React from "react";
import { isAuthenticated } from "../auth/helper";
import NavMenu from "./component/NavMenu";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import {createProduct, getCategories} from "./helper/adminapicall";

function AddProduct() {

  const {user, authtoken} = isAuthenticated();

  const [values, setValues] = React.useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    image:"",
    categories: [],
    category:"",
    loading:false,
    error:"",
    createdProduct:"",
    formData:""
  });

  const {name, description, price, stock, image, categories, loading, error, createdProduct, getRedirect, formData} = values;

  const preload = () => {
    getCategories().then(data => {
      if(data.error)
        setValues({...values, error: data.error});
      else
        setValues({...values, categories: data, formData: new FormData()});
    })
  }

  React.useEffect(() => {
    preload();
  }, []);

  const handleChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true});
    createProduct(user._id, authtoken, formData)
      .then(data => {
        if(data.error)
          setValues({...values, loading: false, error: data.error})
        else 
          setValues({...values, loading:false, createdProduct: data.name, name: "", description:"", price:"", stock:"", image:""})
      })
      .catch(err => console.log(err))
  }

  const successMsg = () => {
    return (
         <div className="container">
              <div className="alert alert-success text-center" style={{display: createdProduct ? "" : "none"}}>
                   {createdProduct} created successfully.
              </div>
         </div>
    );
}

  const errorMsg = () => {
      return (
          <div className="container">
                <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                    Failed to create product. {error}
                </div>
          </div>
      );
  }

  const createProductForm = () => (
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
              categories.map((cate, index) => (
                  <option key={index} value={cate._id}>{cate.name}</option>
              ))}
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
        Create Product
      </button>
    </form>
  );

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
              <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Add new product</h4>
              {successMsg()}
              {errorMsg()}
              {createProductForm()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddProduct;
