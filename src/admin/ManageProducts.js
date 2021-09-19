import React from "react";
import { isAuthenticated } from "../auth/helper";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import NavMenu from "./component/NavMenu";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";
import { Link} from "react-router-dom";

function ManageProducts() {

     const [products, setProducts] = React.useState([]);

     const {user, authtoken} = isAuthenticated();

     const preload = () => {
          getAllProducts().then(data => {
               if(data.error)
                    console.log(data.error);
               else 
                    setProducts(data);
          }).catch(err => console.log(err))
     }

     React.useEffect(() => {
          preload();
     }, []);

     const deleteThisProduct = (productId) => {
          deleteProduct(user._id, authtoken, productId)
          .then(data => {
               if(data.error)
                    console.log(data.error);
               else 
                    preload();
          }).catch(err => console.log(err))
     }

     const productsList = () => (
          <div>
               <h2 className="mb-4 ms-2">All products:</h2>
               <div className="row">
                    <div className="col-12">
                         {/* <h2 className="text-center my-3">Total 3 products</h2> */}

                         <div className="card bg-light p-4 rounded border-dark mb-1">
                                   <div className="row text-left">
                                        <div className="col-6">
                                             <h5 className="text-left mt-2 theme-color font-weight-bold">Product Name</h5>
                                        </div>
                                        <div className="col-3">
                                             <h5 className="text-left mt-2 theme-color font-weight-bold">Category</h5>
                                        </div>
                                        <div className="col-2">
                                             <h5 className="text-center mt-2 theme-color font-weight-bold">Actions</h5>
                                        </div>
                                   </div>
                                   </div>

                         {products.map((product, index) => {
                              return (
                                   <div key={index} className="card bg-light p-4 rounded border-dark mb-1">
                                   <div className="row text-left">
                                        <div className="col-6">
                                             <h5 className="text-left mt-2">{product.name}</h5>
                                        </div>
                                        <div className="col-3">
                                             <h5 className="text-left mt-2">{product.category.name}</h5>
                                        </div>
                                        <div className="col-2">
                                             <div className="row">
                                                  <div className="col-5">
                                                       <Link
                                                            className="btn btn-success rounded"
                                                            to={`/admin/product/${product._id}/update`}
                                                       >
                                                            <span className="">Update</span>
                                                       </Link>
                                                  </div>
                                                  <div className="col-2"></div>
                                                  <div className="col-5">
                                                       <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger rounded">
                                                            Delete
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                        {/* <div className="col-1 me-1">
                                             <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger">
                                                  Delete
                                             </button>
                                        </div> */}
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
                                   <h4 className="card-header text-center mb-4 text-white theme-bg rounded">Manage products</h4>
                                   {productsList()}
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default ManageProducts;