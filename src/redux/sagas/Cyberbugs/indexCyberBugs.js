import React, { useEffect } from "react";
import ContentMain from "../../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../../components/Cyberbugs/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";

export default function IndexCyberBugs(props) {
  let { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();
  console.log("projectDetail", projectDetail)

  useEffect(() => {
    const { projectId } = props.match.params;
    dispatch({
      type: "GET_PROJECT_DETAIL",
      projectId
    });
  },[]);

  return (
    <div className="ml-4">
      <HeaderMain />
      <InfoMain />
      <ContentMain />
    </div>
  );
}
