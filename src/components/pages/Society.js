import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { print } from "../../Redux/Slices/FormSlice";
function Society() {
  const formm = useSelector((state)=>state.FormData.value);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Dispatching print action...' , formm);
    dispatch(print());
  }, [dispatch]);
  return (
    <div className="text-center">
      {/* {dispatch(print())} */}
      <h1>Choose Your Society {formm}</h1>
      <div className="flex flex-col">
        <Link to="/service">
          <div className=" border border-3 p-3">JLPL1</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3">JLPL2</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3">JLPL3</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3">JLPL4</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3">JLPL5</div>
        </Link>
      </div>
    </div>
  );
}

export default Society;
