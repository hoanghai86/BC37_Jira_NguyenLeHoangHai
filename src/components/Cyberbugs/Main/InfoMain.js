import React from "react";
import parse from "html-react-parser";

export default function InfoMain(props) {
  const { projectDetail } = props;
  const renderAvatar = () => {
    return projectDetail.members?.map((user, index) => {
      return (
        <div key={index} className="avatar">
          <img src={user.avatar} alt={user.avatar} />
        </div>
      );
    });
  };

  const parse = require("html-react-parser");

  return (
    <div className="container">
      <h3>{projectDetail.projectName}</h3>
      <section>{parse(`<p>${projectDetail.description}</p>`)}</section>

      <div className="info row">
        <div className="search-block col-md-auto">

            <input type="text" className="search form-control" />

          <i className="fa fa-search" />
        </div>
        <div className="avatar-group col-md-auto">
          {/* <div className="avatar">
            <img src={require("../../../assets/img/download (1).jfif")} />
          </div>
          <div className="avatar">
            <img src={require("../../../assets/img/download (2).jfif")} />
          </div>
          <div className="avatar">
            <img src={require("../../../assets/img/download (3).jfif")} />
          </div> */}
          <div className="row">{renderAvatar()}</div>
        </div>
        <div className="text col-md-auto h-10 leading-10">Only My Issues</div>
        <div className="text col-md-auto h-10 leading-10">Recently Updated</div>
      </div>
    </div>
  );
}
