import React from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, login } from "../auth/helper";
import Footer from "../core/components/Footer";
import Header from "../core/components/Header";
import GoogleLogin from "react-google-login";
import { postFbLogin, postTokenId } from "./helper/userapicalls";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

function Login() {

     const [values, setValues] = React.useState({
          email:"",
          password:"",
          error:"",
          isLoading: false,
          didRedirect: false
     });

     const {email,password,error,isLoading,didRedirect} = values;

     const {user} = isAuthenticated();

     const scope = ["email", "public_profile"];

     const handleChange = name => event => {
          setValues({...values, error:false, [name]:event.target.value});
     }

     const handleSubmit = event => {
          event.preventDefault();
          setValues({...values, error: false, isLoading:true, didRedirect:false});
          login({email,password})
          .then(data => {
               console.log(data);
               if (data.error)
                    setValues({...values, error: data.error, isLoading: false});
               else {
                    authenticate(data, () => {
                         setValues({...values, didRedirect: true});
                    });
               }
          })
          .catch(err => console.log(err));
     }

     const performRedirect = () => {
          if(didRedirect) {
               if(user && user.role===1) {
                    return <Redirect to="/admin/dashboard" />
               } else {
                    return <Redirect to="/user/dashboard" />
               }
          }
          if (isAuthenticated()) {
               return <Redirect to="/" />
          }
     }

     const loadingMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-success text-center" style={{display: isLoading ? "" : "none"}}>
                         Loading ...
                    </div>
               </div>
          );
     }

     const errorMsg = () => {
          return (
               <div className="container">
                    <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                         {error}
                    </div>
               </div>
          );
     }

     const responseSuccessGoogle = response => {
          let tokenId = response.tokenId;

          postTokenId({tokenId}).then(data => {
               if(data.error)
                    setValues({...values, error: data.error, success: false})
               else {
                    authenticate(data, () => {
                         setValues({...values, error: false, didRedirect: true})
                    });
               }
          }).catch(err => console.log(err));
     }

     const responseFailureGoogle = response => {
          console.log(response);
     }

     const responseFacebook = response => {
          const fbData = {
               accessToken: response.accessToken,
               userID: response.userID
          }
          postFbLogin(fbData).then(data => {
               if(data.error)
                    setValues({...values, error: data.error, success: false})
               else {
                    authenticate(data, () => {
                         setValues({...values, error: false, didRedirect: true})
                    });
               }
          }).catch(err => console.log(err))
     }

     return (
          <div>
               <Header title="Login"/>
               {loadingMsg()}
               {errorMsg()}
               {performRedirect()}
               {/* <div className="container py-5 h-100">
               <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                         <div className="card-body p-5 text-center">

                         {/* <h3 className="mb-5">Sign in</h3> */}

                         {/* <div className="form-outline mb-4">
                         <input type="email" onChange={handleChange("email")} value={email} id="typeEmailX" className="form-control form-control-lg theme-color" />
                         <label className="form-label" for="typeEmailX">Email</label>
                         </div>

                         <div className="form-outline mb-4">
                         <input type="password" onChange={handleChange("password")} value={password} id="typePasswordX" className="form-control form-control-lg theme-color" />
                         <label className="form-label" for="typePasswordX">Password</label>
                         </div>

                         <div className="form-check d-flex justify-content-start mb-4">
                         <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="form1Example3"
                         />
                         <label className="form-check-label" for="form1Example3"> Remember password </label>
                         </div>

                         <button className="btn btn-purple btn-lg btn-block" onClick={handleSubmit} style={{borderRadius:"10px"}} type="submit">Login</button>

                         <hr className="my-4"/>

                         <button className="btn btn-lg btn-block btn-primary" style={{backgroundColor: "#dd4b39",borderRadius:"10px"}} type="submit"><i className="fab fa-google me-2"></i> Sign in with google</button>
                         <button className="btn btn-lg btn-block btn-primary mb-2" style={{backgroundColor: "#3b5998",borderRadius:"10px"}} type="submit"><i className="fab fa-facebook-f me-2"></i>Sign in with facebook</button>

                         </div>
                    </div>
                    </div>
               </div>
               </div>  */}
               <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                         <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                              <div className="card border-0 shadow rounded-3 my-5">
                                   <div className="card-body p-4 p-sm-5">
                                        <div className="theme-bg rounded"><h5 className="card-title text-center mb-5 fw-light fs-5 text-white p-2">Login to your account</h5></div>
                                        <form>
                                        <div className="form-floating mb-3">
                                             <input type="email" onChange={handleChange("email")} value={email} className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                             <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                             <input type="password" onChange={handleChange("password")} value={password} className="form-control" id="floatingPassword" placeholder="Password"/>
                                             <label htmlFor="floatingPassword">Password</label>
                                        </div>

                                        <div className="form-check mb-3">
                                             <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                                             <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                             Remember password
                                             </label>
                                        </div>
                                        <div className="d-grid">
                                             <button onClick={handleSubmit} style={{borderRadius:"10px"}} className="btn btn-purple rounded btn-login text-uppercase fw-bold" type="submit">Login</button>
                                        </div>
                                        <hr className="my-4"/>
                                        <div className="d-grid mb-2">
                                             <GoogleLogin
                                                  clientId="1029735325088-vq3mag7vo7kp6kr0lsi0cvbgb1v0puno.apps.googleusercontent.com"
                                                  render={renderProps => (
                                                       <button className="btn btn-google btn-login text-uppercase fw-bold rounded" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google me-2"></i> Sign in with Google</button>
                                                  )}
                                                  buttonText=""
                                                  onSuccess={responseSuccessGoogle}
                                                  onFailure={responseFailureGoogle}
                                                  cookiePolicy={'single_host_origin'}
                                             />
                                        </div>
                                        <div className="d-grid">
                                             {/* <button className="btn btn-facebook btn-login text-uppercase fw-bold rounded" type="submit">
                                             <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                                             </button> */}
                                             <FacebookLogin
                                                  appId="542240420416270"
                                                  autoLoad
                                                  scope={scope}
                                                  callback={responseFacebook}
                                                  render={renderProps => (
                                                  <button  className="btn btn-facebook btn-login text-uppercase fw-bold rounded"><i className="fab fa-facebook-f me-2"></i> Sign in with Facebook</button>
                                                  )}
                                             />
                                        </div>
                                        </form>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default Login;