import React from "react";

function Footer() {
     return (
          <div>
               
               <footer className="page-footer font-small unique-color-dark">

               <div style={{backgroundColor: "#6351ce"}}>
               <div className="container">

                    
                    <div className="row py-4 d-flex align-items-center">

                    
                    <div className="col-md-6 col-lg-5 text-left text-md-left mb-4 mb-md-0">
                         <h6 className="mb-0">Get connected with us on social networks!</h6>
                    </div>
                    

                    
                    <div className="col-md-6 col-lg-7 text-center text-md-end">

                         
                         <a className="fb-ic">
                         <i className="fab fa-facebook-f white-text me-4"> </i>
                         </a>
                         
                         <a className="tw-ic">
                         <i className="fab fa-twitter white-text me-4"> </i>
                         </a>
                         
                         <a className="gplus-ic">
                         <i className="fab fa-google-plus-g white-text me-4"> </i>
                         </a>
                         
                         <a className="li-ic">
                         <i className="fab fa-linkedin-in white-text me-4"> </i>
                         </a>
                         
                         <a className="ins-ic">
                         <i className="fab fa-instagram white-text"> </i>
                         </a>

                    </div>
                    

                    </div>
                    

               </div>
               </div>

               
               <div className="container text-left text-md-left mt-5">

               
               <div className="row mt-3">

                    
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                    
                         <h6 className="text-uppercase font-weight-bold">Company name</h6>
                         <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                         <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                              consectetur
                              adipisicing elit.</p>

                    </div>
                    

                    
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                    
                         <h6 className="text-uppercase font-weight-bold">Products</h6>
                         <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                         <p>
                              <a href="#!">Monitors</a>
                         </p>
                         <p>
                              <a href="#!">Gaming chairs</a>
                         </p>
                         <p>
                              <a href="#!">Laptops</a>
                         </p>
                         <p>
                              <a href="#!">Pre-Build PC</a>
                         </p>

                    </div>
                    
                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                    
                         <h6 className="text-uppercase font-weight-bold">Useful links</h6>
                         <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                         <p>
                              <a href="#!">Your Account</a>
                         </p>
                         <p>
                              <a href="#!">Contact Us</a>
                         </p>
                         <p>
                              <a href="#!">About Us</a>
                         </p>
                         <p>
                              <a href="#!">Privacy Policy</a>
                         </p>

                    </div>
                    
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                    
                         <h6 className="text-uppercase font-weight-bold">Contact</h6>
                         <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
                         <p>
                              <i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                         <p>
                              <i className="fas fa-envelope mr-3"></i> info@example.com</p>
                         <p>
                              <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                         <p>
                              <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>

                    </div>
                    

               </div>
               

               </div>
               

               
               <div className="footer-copyright text-center py-3">© 2020 Copyright | 
               <a href="/"> PC Parts Shop</a>
               </div>
               

               </footer>
               
          </div>
     );
}

export default Footer;