import React from "react";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import NavMenu from "../admin/component/NavMenu";

function AdminDashboard() {

     const {
          user: { name, email, role }
        } = isAuthenticated();

    //  const adminLeftSide = () => {
    //       return (
    //         <div className="card">
    //           <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
    //           <ul className="list-group">
    //             <li className="list-group-item admin-option">
    //               <Link to="/admin/dashboard" className="nav-link theme-color admin-option">
    //                 Dashboard
    //               </Link>
    //             </li>
    //             <li className="list-group-item admin-option">
    //               <Link to="/admin/category/create" className="nav-link theme-color admin-option">
    //                 Create Categories
    //               </Link>
    //             </li>
    //             <li className="list-group-item admin-option">
    //               <Link to="/admin/categories" className="nav-link theme-color admin-option">
    //                 Manage Categories
    //               </Link>
    //             </li>
    //             <li className="list-group-item admin-option">
    //               <Link to="/admin/create/product" className="nav-link theme-color admin-option">
    //                 Create Product
    //               </Link>
    //             </li>
    //             <li className="list-group-item admin-option">
    //               <Link to="/admin/products" className="nav-link theme-color admin-option">
    //                 Manage Products
    //               </Link>
    //             </li>
    //             <li className="list-group-item admin-option">
    //               <Link to="/admin/orders" className="nav-link theme-color admin-option">
    //                 Manage Orders
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       );
    //  };

     const adminRightSide = () => {
          return (
            <div className="card mb-4">
              <h4 className="card-header">Admin Information</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="badge bg-success mr-2">Name:</span> {name}
                </li>
                <li className="list-group-item">
                  <span className="badge bg-success mr-2">Email:</span> {email}
                </li>
      
                <li className="list-group-item">
                  <span className="badge bg-danger">Admin Area</span>
                </li>
              </ul>
            </div>
          );
     };
     
     return (
          <div>
               <Header />
               <div className="container mt-4 mb-4">
                    <div className="row">
                         <div className="col-3"><NavMenu /></div>
                         <div className="col-9">{adminRightSide()}</div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default AdminDashboard;