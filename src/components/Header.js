import React, { useState } from "react";
import HeaderNavbar from "./Navbar";
// import HeaderText from "./HeaderText";
// import HeaderSearch from "./HeaderSearch";
// import HomeMobileListView from "./HomeMobileListView";
import backgroundImgHome from "../assets/images/Home/pexels-deepak-khirodwala-3865895.png";
function Homeheader(props) {
  const forBlog = true;
  const rowCount = 1;
  const bgImage = backgroundImgHome;
  const headerStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "certer",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: 10000,
  };
  // cssText: `background-image: url("../assets/images/Home/pexels-deepak-khirodwala-3865895.png") !important; background-position: center center; background-size: cover; background-repeat: no-repeat;`,

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        style={headerStyles}
        className="
          font-Bell
        md:h-[54vh]
        sm:h-[54vh]
        h-[45vh]
        w-screen
        text-white
    "
      >
        <HeaderNavbar isOpen={isOpen} setOpen={setOpen} />
        <div className={`grid grid-rows-1 gap-0 h-[80%] md:h-[50vh]`}>
          {!isOpen ? (
            <>
              <div className="flex flex-col justify-center md:justify-start items-center">
                <h1 className="font-bell font-[400] text-3xl  md:text-4xl mt-0  md:mt-9 mb-1">
                  Karwachauth Event
                </h1>
                <p className="font-Bell font-[400] text-xl md:text-2xl">
                  Mehndi | Nail art service
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center md:justify-start items-center">
                <h1 className="font-bell font-[400] text-3xl  md:text-4xl mt-0  md:mt-9 mb-1">
                  Karwachauth Event
                </h1>
                <p className="font-Bell font-[400] text-xl md:text-2xl">
                  Mehndi | Nail art service
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Homeheader;
