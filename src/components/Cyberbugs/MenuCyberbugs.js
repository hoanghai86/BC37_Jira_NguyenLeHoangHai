import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuCyberbugs() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download.jfif")}  />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div className="hover:bg-gray-300">
          <i className="fa fa-credit-card mr-2" />
          <NavLink to="/cyberbugs" style={{color:"#212529"}} className="text-sm" activeClassName="font-semibold">Cyber Board</NavLink>
        </div>
        <div className="hover:bg-gray-300">
          <i className="fa fa-list mr-2" />
          <NavLink to="/projectmanagement" style={{color:"#212529"}} className="text-sm" activeClassName="font-semibold">Project Management</NavLink>
        </div>
        <div className="hover:bg-gray-300">
          <i className="fa fa-cog mr-2" />
          <NavLink to="/createProject" style={{color:"#212529"}} className="text-sm" activeClassName="font-semibold">Create Project</NavLink>
        </div>

      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span className="ml-2">Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span className="ml-2">Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span className="ml-2">Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span className="ml-2">Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span className="ml-2">Components</span>
        </div>
      </div>
    </div>
  );
}
