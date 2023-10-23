import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/groobe logo2.svg";
// import { Divide as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
function HeaderNavbar(props) {
  const navigate = useNavigate();
  const isOpen = props.isOpen;
  const setOpen = props.setOpen;
  const [otherServices, setOtherServices] = useState(true);
  const [showMyList, setShowMyList] = useState(false);
  const menuRef = useRef(null);

  // Function to handle hamburger click
  // const handleHamburgerClick = () => {
  //   setOpen(!isOpen);
   
  // };

  // Effect to listen for screen size changes and update otherServices state
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 767px)");
    const handleScreenSizeChange = (e) => {
      setOtherServices(e.matches);
      setOpen(false); // Close the hamburger menu when screen size changes (optional)
    };

    mediaQuery.addListener(handleScreenSizeChange);
    setOtherServices(mediaQuery.matches);

    return () => {
      mediaQuery.removeListener(handleScreenSizeChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Check if the clicked element is not one of the menu items
        const isMenuItem = event.target.closest(".menu-item");

        if (!isMenuItem) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setOpen]);

  return (
    <div className="grid grid-cols-[_3fr_8fr] text-base font-[300] font-inter pt-7 mr-5">
      <div
        className=" flex flex-col items-center justify-start
      ml-[4%]
      sm:ml-0"
      >
        <Link to="/">
          <img src={logo} onClick={()=>localStorage.removeItem("eventData")} alt="Logo" className="w-[120px] h-[70px] lg:w-[120px] lg:h-[70px] m:h-[80px] m:w-[60px] s:h-[70px] s:w-[50px]"  />
        </Link>
      </div>
      {/* The rest of your grid items */}
      {(otherServices || showMyList) && (
        <div
          className={`grid grid-cols-[repeat(5,_1fr)_3fr] md:grid `}
          id="myList"
        >
          {/* <div className="md:flex flex-col items-center justify-center cursor-pointer ">
            <Link to="/services">Services</Link>
          </div>
          <div className="md:flex flex-col items-center justify-center cursor-pointer ">
            <Link to="/gallery">Gallery</Link>
          </div>
          <div className="md:flex flex-col items-center justify-center cursor-pointer ">
            <Link to="/blogs">Blogs</Link>
          </div>
          <div className="md:flex flex-col items-center justify-center cursor-pointer ">
            <Link to="/about">About</Link>
          </div>
          <div className="md:flex flex-col items-center justify-center cursor-pointer ">
            <Link to="/contact">Contact</Link>
          </div> */}
        </div>
      )}
      {/* Add the "hamburger-react" component */}
      <div ref={menuRef} className="md:hidden flex justify-end mr-1 2m:mr-5 sm:mr-7 mt-1">
        {/* <Hamburger toggled={isOpen} toggle={handleHamburgerClick} /> */}
      </div>
    </div>
  );
}

export default HeaderNavbar;
