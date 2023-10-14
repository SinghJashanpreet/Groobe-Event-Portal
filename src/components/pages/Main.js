import React from "react";
import Homeheader from '../Header';
import Footer from '../Footer';
import Society from '../pages/Society';


function Main() {
  return (
    <div>
      <Homeheader line1="Karwachauth Event" line2="Mehndi | Nail art service"/>
      <Society/>
      <Footer />
    </div>
  );
}

export default Main;
