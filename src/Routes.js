import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "../src/core/Home";
import Cart from "../src/core/Cart";
import Register from "../src/user/Register";
import Login from "../src/user/Login";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Product from "./core/Product";
import PaymentPage from "./core/PaymentPage";
import ManageOrders from "./admin/ManageOrders";
import UpdateOrderStatus from "./admin/UpdateOrderStatus";
import OrderDetails from "./admin/OrderDetails";
import MyOrders from "./user/MyOrders";
import UserOrderDetails from "./user/UserOrderDetails";

function Routes() {
     return (
          <BrowserRouter>
               <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/cart" exact component={Cart} />
                    <Route path="/product/:productId" exact component={Product} />
                    <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                    <PrivateRoute path="/user/:userId/orders" exact component={MyOrders} />
                    <PrivateRoute path="/user/:userId/order/:orderId" exact component={UserOrderDetails} />
                    <PrivateRoute path="/user/:userId/payment" exact component={PaymentPage} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                    <AdminRoute path="/admin/category/create" exact component={AddCategory} />
                    <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                    <AdminRoute path="/admin/product/create" exact component={AddProduct} />
                    <AdminRoute path="/admin/products" exact component={ManageProducts} />
                    <AdminRoute path="/admin/product/:productId/update" exact component={UpdateProduct} />
                    <AdminRoute path="/admin/category/:categoryId/update" exact component={UpdateCategory} />
                    <AdminRoute path="/admin/orders" exact component={ManageOrders} /> 
                    <AdminRoute path="/admin/order/:orderId/update" exact component={UpdateOrderStatus} />
                    <AdminRoute path="/admin/order/:orderId" exact component={OrderDetails} />
               </Switch>
          </BrowserRouter>
     )
}

export default Routes;