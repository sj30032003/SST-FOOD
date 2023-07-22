import React from 'react'
import {Link} from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <div><div className="">
    <footer className="bg-success text-center text-white">
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
   
   <div className="text-center"> 
   Contact No  +918386999479
 </div>
 <div className="text-center p-3"
//  style="background-color: rgba(0, 0, 0, 0.2);"
style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
> 
   © 2023 Copyright Sourabh
  
 </div>
    </footer>
  </div>
  </div>
  )
}