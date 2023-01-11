import React from "react";

export default function SidebarCyberbugs() {
  return (
    <div className="sideBar">
      <div className="sideBar-top">
        <div className="sideBar-icon text-white">
          <i className="fab fa-jira" />
        </div>
        <div
          className="sideBar-icon text-white"
          data-toggle="modal"
          data-target="#searchModal"
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-search" />
          <span className="title ml-3">SEARCH ISSUES</span>
        </div>
        <div className="sideBar-icon text-white">
          <i className="fa fa-plus" />
          <span className="title ml-3">CREATE ISSUES</span>
        </div>
      </div>
      <div className="sideBar-bottom text-white">
        <div className="sideBar-icon">
          <i className="fa fa-question-circle" />
          <span className="title ml-3">ABOUT</span>
        </div>
      </div>
    </div>
  );
}