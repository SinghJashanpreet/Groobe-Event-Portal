import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from '../../assets/images/Frame 2219.svg'
function Society() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedSociety = event.target.getAttribute('name');
    dispatch(setData({ Society: selectedSociety }));
    dispatch(print()); 
  }

  return (
    <div className="text-center">
      <img src={whatsapp} width="120px" height="70px" className="fixed top-[50vh] right-0"></img>
      {/* {dispatch(print())} */}
      <h1>Choose Your Society</h1>
      <div className="flex flex-col">
        <Link to="/service">
          <div className=" border border-3 p-3" name="JLPL1" onClick={changeHandler}>JLPL1</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3" name="JLPL2" onClick={changeHandler}>JLPL2</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3" name="JLPL3" onClick={changeHandler}>JLPL3</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3" name="JLPL4" onClick={changeHandler}>JLPL4</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3" name="JLPL5" onClick={changeHandler}>JLPL5</div>
        </Link>
      </div>
    </div>
  );
}

export default Society;
