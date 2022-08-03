import { Col, Row } from "antd";
import _ from "lodash";
import Head from "next/head";
import * as React from "react";

import LayoutOne from "../components/layouts/LayoutOne";

export default function Home() {
  React.useEffect(() => {
    window.addEventListener("load", () => {
      AiactivSDK.identify("12091906-01011992", {
        name: "Grace Hopper",
        email: "grace@usnavy.gov",
      });
      AiactivSDK.track("Article Completed", {
        title: "How to Create a Tracking Plan",
        course: "Intro to Analytics",
      });
    });
  }, []);

  const handleTrack = () => {
    AiactivSDK.track("Article Completed", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
  };
  const handleIdentify = () => {
    AiactivSDK.identify("12091906-01011992", {
      name: "Grace Hopper",
      email: "grace@usnavy.gov",
    });
  };

  return (
    <LayoutOne title="Home">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.AiactivSDK||(window.AiactivSDK={}),AiactivSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
              process.env.NODE_ENV === "development"
                ? "http://localhost:9081/aiactiv-sdk.development.min.js"
                : "https://sdk-cdn.aiactiv.io/aiactiv-sdk.min.js"
            }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AiactivSDK.load( function(){AiactivSDK.initialize({containerId:"b8a3ccf2-5d49-4912-b2cc-87dc46e10277@web", type: ["dmp"], debug: ${
              process.env.NODE_ENV === "development"
            }}),AiactivSDK.callMethodsFromContainer();
            });
            `,
          }}
        ></script>
      </Head>
      <div className="shop-layout">
        <button onClick={handleTrack}>Track</button>
        <button onClick={handleIdentify}>Identify</button>
      </div>
    </LayoutOne>
  );
}
