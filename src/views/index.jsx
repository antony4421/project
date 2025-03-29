

import React, { useEffect } from "react"; 

import './assets/css/templatemo-chain-app-dev.css'

import { useNavigate, Link } from "react-router-dom";
import right from "./assets/images/slider-dec.png";
import head from "./assets/images/heading-line-dec.png";
import about from "./assets/images/about-right-dec.png";
import abhi from "./assets/images/abhi.png";
import antu from "./assets/images/antu.webp";
import sye from "./assets/images/sye.webp";

export const Index = () => {



  
  return (
    
  

    
    
    <div>
    

    <nav className="nav1">
  <ul className="nav1-ul">
    <li className="nav1-li">
      <a className="nav1-a" href="/">Home</a>
    </li>
    <li className="nav1-li">
      <a className="nav1-a" href="#about">About</a>
    </li>
    <li className="nav1-li">
      <a className="nav1-a" href="#services">Services</a>
    </li>
    <li className="nav1-li">
      <a className="nav1-a" ><Link to="/login">Login </Link></a>
    </li>
  </ul>
</nav>


  <div class="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
    
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-6 align-self-center">
              <div class="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                <div class="row mt-15">
                  <div class="col-lg-12">
                    <h2>Empowering Workforces, Streamlining Success!</h2>
                    
                  </div>
                  <div class="col-lg-12">
                    <div class="white-button first-button scroll-to-section">
                      <Link to="/login">Login <i class="fab fa-apple"></i></Link>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                <img  src={right} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="services" class="services section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="section-heading  wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
            <h4>Amazing <em>Services &amp; Features</em> for you</h4>
            <img src={head} alt=""/>
            <p>If you're looking for the best Employee Management System to streamline your business operations, explore <a rel="nofollow" href="" target="_blank">Pookies</a> Blog.For assistance or inquiries, visit our contact page to get in touch with us.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="service-item first-service">
            <div class="icon"></div>
            <h4>App Maintenance</h4>
            <p>Ensure smooth operations with regular updates and seamless performance.</p>
            <div class="text-button">
              <a href="#">Read More <i class="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="service-item second-service">
            <div class="icon"></div>
            <h4>Rocket Speed</h4>
            <p>Experience a streamlined and responsive employee management system.</p>
            <div class="text-button">
              <a href="#">Read More <i class="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="service-item third-service">
            <div class="icon"></div>
            <h4>Multi Workflow Idea</h4>
            <p>Optimize processes with automated solutions for better productivity.</p>
            <div class="text-button">
              <a href="#">Read More <i class="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="service-item fourth-service">
            <div class="icon"></div>
            <h4>24/7 Help &amp; Support</h4>
            <p>Our team is always ready to help with any queries or issues.</p>
            <div class="text-button">
              <a href="#">Read More <i class="fa fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="about" class="about-us section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 align-self-center">
          <div class="section-heading">
            <h4>About <em>What We Do</em> &amp; Who We Are</h4>
            <img src="assets/images/heading-line-dec.png" alt=""/>
            <p>HR Solutions is a comprehensive Employee Management System designed to simplify workforce management, enhance productivity, and streamline HR operations. Our platform offers an intuitive and efficient solution for businesses of all sizes.</p>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="box-item">
                <h4><a href="#">Maintance Problems</a></h4>
                <p>Easily handle employee records, attendance, and payroll with our seamless system.</p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="box-item">
                <h4><a href="#">24/7 Support &amp; Help</a></h4>
                <p>Our dedicated team is available round-the-clock to ensure smooth operations and resolve any queries</p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="box-item">
                <h4><a href="#">Issue Resolution</a></h4>
                <p>Identify and fix workforce-related challenges efficiently with our smart automation tools.</p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="box-item">
                <h4><a href="#">Co. Development</a></h4>
                <p>HR Solutions optimizes workforce management,      so you can focus on growth</p>
              </div>
            </div>
            <div class="col-lg-12">
              <p>At HR Solutions, we are committed to revolutionizing employee management with cutting-edge technology. Our platform simplifies HR tasks, enhances productivity, and ensures seamless workforce management, helping businesses thrive effortlessly.</p>
              <div class="gradient-button">
                <a href="#">SignUp</a>
              </div>
              <span></span>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="right-image">
            <img src={about} alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div id="pricing" class="pricing-tables">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="section-heading">
            <h4>DEVELOPER TEAM</h4>
            <img src="assets/images/heading-line-dec.png" alt=""/>
            <p>Excelr Project-27[Group-2]</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="pricing-item-regular">
            <h4>ABHIJITH CS</h4>
            <div class="icon">
              <img src={abhi} alt="abhi"/>
            </div>
            
            <div class="border-button">
              <a href="https://www.instagram.com/eren___yeager________?__pwa=1#"></a>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="pricing-item-regular">
            <h4>ANTONY</h4>
            <div class="icon">
              <img src={antu} alt="antu"/>
            </div>
            
            <div class="border-button">
              <a href="https://www.instagram.com/r_e_b._e_l?igsh=MTlhOWVrbm54eXlybw=="></a>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="pricing-item-regular">
            
            <h4>SYED</h4>
            <div class="icon">
              <img src={sye} alt="sye"/>
            </div>
           
            <div class="border-button">
              <a href="#"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 

  <footer id="newsletter">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="section-heading">
            <h4>Join our mailing list to receive the news &amp; latest trends</h4>
          </div>
        </div>
       
      </div>
      <div class="row">
        <div class="col-lg-3">
          <div class="footer-widget">
            <h4>Contact Us</h4>
            <p>BANGALORE</p>
            <p><a href="#">8281181502</a></p>
            <p><a href="#">hrsolutionp27@gmail.com</a></p>
          </div>
        </div>
       
       
   
      </div>
    </div>

  
</footer>

</div>
  )
}
export default Index;
