import React from "react";

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
        <div>
          <i className="fa fa-credit-card" />
          <span className="ml-2">Cyber Board</span>
        </div>
        <div>
          <i className="fa fa-cog" />
          <span className="ml-2">Project Settings</span>
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
