import { MdOutlineSegment, MdOutlineLogout } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { GoMoon, GoSun, GoBell } from "react-icons/go";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { logout } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";



export const Navbar = ({ activeMenu, setActiveMenu }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, didLogout } = useSelector((state) => state.user);

  const handleThemeSwitch = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  console.log('hi', user);
  const userConnected = JSON.parse(localStorage.getItem('user'));
  // console.log('ddd', userConnected.name);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  useEffect(() => {
    if (!userConnected) {
      navigate("/login");
    }
  }, [navigate]);


  return (
    <div className=" grid grid-cols-4 items-center">
      <div className="flex text-lg items-center dark:text-gray-300 md:gap-8 md:col-span-1 col-span-2 gap-4 ">
        <MdOutlineSegment
          className=" rotate-180 text-2xl cursor-pointer"
          onClick={ () => setActiveMenu(!activeMenu) }
        />
        <h2 className="font-bold text-lg ">Dashboard</h2>
      </div>

      <div className="col-span-2">
      </div>

      <div className=" md:col-span-1 col-span-4 md:mt-0 mt-5 gap-3 flex justify-center md:justify-end dark:text-gray-300 items-center text-xl">
        { theme === "dark" ? (
          <GoSun
            onClick={ handleThemeSwitch }
            className="my-auto text-md cursor-pointer"
          />
        ) : (
          <GoMoon
            onClick={ handleThemeSwitch }
            className="my-auto text-md cursor-pointer"
          />
        ) }
        <GoBell className="my-auto text-md cursor-pointer" />
        <div className="flex text-base gap-1"
          onClick={ () => {
            setIsOpen(!isOpen);
          } }>

          <p className="cursor-default mx-3 px-4 flex ">{ userConnected ? userConnected.name : "" }
            <IoIosArrowDown
              className="my-auto cursor-pointer"
            /> </p>

          { userConnected && userConnected.role != 'Gerant'   && isOpen  && (
            <div className=" bg-[#333] flex flex-col absolute top-28 md:top-16 w-40 p-3 text-sm rounded-md">
              <Link
                to="profile"
                className="hover:bg-[#444] dark:hover:bg-[#444] flex gap-2 items-center text-white dark:text-gray-300 p-2"
              >
                <BiUser className=" text-base" />
                Profile
              </Link>
              <button
                className="hover:bg-[#444] dark:hover:bg-[#444] flex items-center gap-2 text-white dark:text-gray-300 p-2"
                onClick={ handleLogout }
              >
                <MdOutlineLogout className=" text-base" />
                Logout
              </button>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};
