import React, { useState } from "react";
import YoutubeIcon from "../assets/navyoutube.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEllipsisVertical,
  faMagnifyingGlass,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/slices/interactSlice";
function Navbar() {
  const dispatch = useDispatch()
  const [ searchValue, setSearchValue ] = useState('')

  const handleSidebar = ()=>{
    dispatch( toggleSidebar() )
  }

  return (
    <div className="w-full h-14 shadow-sm flex sm:px-5 px-3 py-2.5 items-center justify-between relative">
      <div className="flex items-center gap-5 cursor-pointer">
        <FontAwesomeIcon icon={faBars} className="text-xl" onClick={handleSidebar}/>
        <Link to="/" className="items-center hidden sm:flex">
          <img src={YoutubeIcon} alt="youutbe icon" className="h-8" />
          <p className="text-lg block">Youtube</p>
        </Link>
      </div>
      <div className="gap-3 items-center h-full flex">
        <div className="flex h-full">
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none focus:border-blue-100 px-5 h-full bg-inherit rounded-l-full border border-stone-700"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
          />
          <Link to={`/search/${searchValue}`} className="flex items-center justify-center bg-stone-700 h-full w-12 rounded-r-full text-blue-100">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="font-light" />
          </Link>
        </div>
        <div className="rounded-full h-full bg-stone-700 p-3 items-center cursor-pointer hidden sm:flex">
          <FontAwesomeIcon icon={faMicrophone} />
        </div>
      </div>
      <div className="h-full items-center gap-3 hidden sm:flex">
        <div className="h-full flex items-center cursor-pointer">
          <FontAwesomeIcon icon={faEllipsisVertical} className="text-lg block" />
        </div>
        <div className="flex items-center rounded-full border h-full border-blue-600 px-3 cursor-pointer">
              <p>Signin</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
