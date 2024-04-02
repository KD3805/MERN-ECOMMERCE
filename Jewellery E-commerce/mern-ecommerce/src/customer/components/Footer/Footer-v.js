import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <div className="footer">
        {/* <div className="heading">
        <img src='./assets/matri.png' alt=''/>
      </div> */}
        <div className="content">
          <div className="services">
            <h4>Services</h4>
            <p><Link to="#">find your Match</Link></p>
            <p><Link to="#">Communicate</Link></p>
            <p><Link to="#">DevOps</Link></p>
            <p><Link to="#">Wedding</Link></p>
          </div>
          <div className="social-media">
            <h4>Social</h4>
            <p>
              <Link to="#"><i className="fab fa-linkedin"></i> 
                Linkedin
              </Link>
            </p>
            <p>
              <Link to="#"><i className="fab fa-twitter"></i> 
                Twitter
              </Link>
            </p>
            <p>
              <Link to="#"><i className="fab fa-github"></i> 
                Github
              </Link>
            </p>
            <p>
              <Link to="#"><i className="fab fa-facebook"></i> 
                Facebook
              </Link>
            </p>
            <p>
              <Link to="#"><i className="fab fa-instagram"></i> 
                Instagram
              </Link>
            </p>
          </div>
          <div className="links">
            <h4>Quick links</h4>
            <p><Link to="#">Home</Link></p>
            <p><Link to="#">About</Link></p>
            <p><Link to="#">Testimonials</Link></p>
            <p><Link to="#">Contact</Link></p>
          </div>
          <div className="details">
            <h4 className="address">Address</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur <br />
              adipisicing elit. Cupiditate, qui!
            </p>
            <h4 className="mobile">Mobile</h4>
            <p><Link to="#">+91-12225*****</Link></p>
            <h4 className="mail">Email</h4>
            <p><Link to="#">Abhishek@gmail.com</Link></p>
          </div>
        </div>
        <footer>
          <hr />
          © 2022 codewithAbhishek.
        </footer>
      </div>

    </>
  )
};

