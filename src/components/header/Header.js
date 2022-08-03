import React from "react";
import { useSelector } from "react-redux";

import { FEATURE_IDS } from "../../common/defines";
import Menu from "./elements/Menu";
import TopNav from "./elements/TopNav";

function Header({ containerType, headerStyle }) {
  const { userId } = useSelector((state) => state.globalReducer);

  const [abResult, setAbResult] = React.useState("");

  // const initABTesting = React.useCallback(async (id) => {
  //   const res = await window.AicactusSDK.getFeatureById(
  //     FEATURE_IDS.ABTesting,
  //     "",
  //     {},
  //     id // "emfe"/"huybe"
  //   );
  //   if (res?.data?.results?.data?.[0]) {
  //     setAbResult(res.data.results.data[0]);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   let timer = setTimeout(() => {
  //     initABTesting(userId);
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, [userId]);

  const renderStyleClass = (type) => {
    switch (type) {
      case "B":
        return "-style-two";
      case "A":
        return "-style-one";
      default:
        return "default";
    }
  };
  return (
    <div className={`header-one ${renderStyleClass(abResult)}`}>
      <TopNav containerType={containerType} />
      <Menu containerType={containerType} />
    </div>
  );
}

export default React.memo(Header);
