import React from 'react'
import Homeheader from '../Header'
import Footer from '../Footer'
import img1 from '../../assets/images/Design/Group 1.svg'
import img2 from '../../assets/images/Design/Group 2.svg'
import img3 from '../../assets/images/Design/Group 2236.svg'
import img4 from '../../assets/images/Design/Group 3.svg'
import img5 from '../../assets/images/Design/Group 4.svg'
import { Link } from 'react-router-dom'
function Design() {
    return (
    <div>
        <Homeheader/>
        <div>
          <Link to='/price'>
            <img src={img1}></img>    
          </Link>
          <Link to='/price'>
            <img src={img2}></img>    
          </Link>
          <Link to='/price'>
            <img src={img3}></img>    
          </Link>
          <Link to='/price'>
            <img src={img4}></img>    
          </Link>
          <Link to='/price'>
            <img src={img5}></img>    
          </Link>
        </div>
        <Footer/>
    </div>
  )
}

export default Design