import React from "react";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
     if (history.location.pathname === path)
          return {color: "#ffffff",backgroundColor:"#6351ce",borderRadius:"25px",fontWeight:"700"};
     else
          return {color: "#6351ce"}
}

function NavMenu(props) {
     
     return (
          <div className="card">
              <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link style={currentTab(props.history,"/admin/dashboard")} to="/admin/dashboard" className="nav-link theme-color admin-option">
                    Dashboard
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link style={currentTab(props.history,"/admin/category/create")} to="/admin/category/create" className="nav-link theme-color admin-option">
                    Create Categories
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link style={currentTab(props.history,"/admin/categories")} to="/admin/categories" className="nav-link theme-color admin-option">
                    Manage Categories
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link style={currentTab(props.history,"/admin/product/create")} to="/admin/product/create" className="nav-link theme-color admin-option">
                    Create Product
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link style={currentTab(props.history,"/admin/products")} to="/admin/products" className="nav-link theme-color admin-option">
                    Manage Products
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link style={currentTab(props.history,"/admin/orders")} to="/admin/orders" className="nav-link theme-color admin-option">
                    Manage Orders
                  </Link>
                </li>
              </ul>
            </div>
     );
}

export default withRouter(NavMenu);