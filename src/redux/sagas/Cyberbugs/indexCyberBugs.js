import React from "react";
import ContentMain from "../../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../../components/Cyberbugs/Main/InfoMain";

export default function indexCyberBugs() {
  return (
    <div className="ml-4">
      <HeaderMain />
      <InfoMain />
      <ContentMain />
    </div>
  );
}
