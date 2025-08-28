import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard Icon" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/admin-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments Icon" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/admin-add_doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor Icon" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/admin-doctor_list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctor List Icon" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

