import React from 'react'

import '../About.css';

import {Link} from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import image from '../images/About_Us.png'
export default function About() {
  return (
    <div>
        
    <div class="wrapper ">

        <div class="background-container ">
            <div class="bg-1"></div>
            <div class="bg-2"></div>
    
        </div>
        <div class="about-container mt-5">
            
            <div class="image-container">
                <img src={image} alt=""/>
                
            </div>

            <div class="text-container">
                <h2>About us</h2>
                <h3>Welcome to SST FOOD!</h3>
                <p>At SST FOOD, we are passionate about connecting food lovers with their favorite meals. We understand the joy that comes from indulging in delicious food, and our mission is to make the process of ordering food online as convenient and enjoyable as possible.</p>
                <section className="mb-2">
     
     <Link
       className="btn text-white btn-floating m-1"
       style={{backgroundColor: "#3b5998"}}
       to="#!"
       role="button"
      
     > <FacebookIcon></FacebookIcon></Link>

     
     <Link
       className="btn text-white btn-floating m-1"
       style={{backgroundColor: "#55acee"}}
       to="#!"
       role="button"
       ><TwitterIcon></TwitterIcon>
     </Link>

     
     <Link
       className="btn text-white btn-floating m-1"
       style={{backgroundColor: "#dd4b39"}}
      //  style="background-color: #dd4b39;"
       to="#!"
       role="button"
       ><GoogleIcon></GoogleIcon></Link>

     
     <Link
       className="btn text-white btn-floating m-1"
      //  style="background-color: #ac2bac;"
      style={{backgroundColor: "#ac2bac"}}
       to="#!"
       role="button"
       ><InstagramIcon></InstagramIcon></Link>

     
     <Link
       className="btn text-white btn-floating m-1"
      //  style="background-color: #0082ca;"
      style={{backgroundColor: "#0082ca"}}
       to="#!"
       role="button"
       ><LinkedInIcon></LinkedInIcon></Link>
   
     <Link
       className="btn text-white btn-floating m-1"
      //  style="background-color: #333333;"
      style={{backgroundColor: "#333333"}}
       to="#!"
       role="button"
       ><GitHubIcon></GitHubIcon></Link>
   </section>
   <Link className="btn bg-success text-black" to="/">Home</Link>
            </div>
            
        </div>
    </div>
    
    </div>

  )
}
