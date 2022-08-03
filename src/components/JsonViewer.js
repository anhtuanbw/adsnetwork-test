// import ReactJson from "react-json-view";

import loadable from "@loadable/component";
const ReactJson = process.browser && loadable(() => import("react-json-view"));

const JsonViewer = ({ src }) => {
  return <ReactJson src={src} theme="hopscotch" collapsed={1} />;
};

export default JsonViewer;
