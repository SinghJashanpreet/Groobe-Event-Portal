import React from 'react'
import Homeheader from '../Header'
import Footer from '../Footer'
import img1 from '../../assets/images/Design/Group 1.svg'
import img2 from '../../assets/images/Design/Group 2.svg'
import img3 from '../../assets/images/Design/Group 2236.svg'
import img4 from '../../assets/images/Design/Group 3.svg'
import img5 from '../../assets/images/Design/Group 4.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
function Design() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedDesign = event.target.getAttribute('name');
    dispatch(setData({ Design: selectedDesign }));
    dispatch(print()); 
  }
    return (
    <div>
        <Homeheader/>
        <div className="flex lg:flex-row flex-col justify-center mt-10 w-[100%] ">
        {/* <div className="flex  space-x-5 "> */}
        <div className="flex flex-col space-y-2 ">
          <Link to='/price'>
            <img src={img1} className="w-[90%] ml-10 justify-center" name="Bridal Mehndi" onClick={changeHandler}></img>    
          </Link>
          <Link to='/price'>
            <img src={img2} className="w-[90%] ml-10" name="Arabic Mehndi" onClick={changeHandler}></img>    
          </Link>
          <Link to='/price'>
            <img src={img3} className="w-[90%] ml-10" name="Khafif Mehndi" onClick={changeHandler}></img>    
          </Link>
          </div>
          <div className="flex flex-col space-y-2">
          <Link to='/price'>
            <img src={img4} className="w-[90%] ml-10" name="Indo Arabic Mehndi" onClick={changeHandler}></img>    
          </Link>
          <Link to='/price'>
            <img src={img5} className="w-[90%] ml-10" name="Tattoo Mehndi" onClick={changeHandler}></img>    
          </Link>
          </div>
          {/* </div> */}
        </div>
        <Footer/>
    </div>
  )
}

export default Design