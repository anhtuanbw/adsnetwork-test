import { Col, Row } from "antd";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import slugify from "slugify";

import { FEATURE_IDS } from "../common/defines";
import useProductData from "../common/useProductData";
import JsonViewer from "../components/JsonViewer";
import LayoutOne from "../components/layouts/LayoutOne";
import Container from "../components/other/Container";
import Banners from "../components/shop/Banners";
import ShopLayout from "../components/shop/ShopLayout";
import productData from "../data/product.json";

export default function Home() {
  const router = useRouter();

  const [resJson, setResJson] = React.useState({});

  React.useEffect(() => {
    window.addEventListener("load", async () => {
      const sdk = window.AicactusSDK || {};

      const adUnits = [
        {
          inventoryId: 833,
          placementId: "display_ads_1",
          options: {
            video: {
              player: true,
              loop: true,
              controls: false,
            },
          },
        },
        {
          inventoryId: 835,
          placementId: "display_ads_2",
        },
        {
          inventoryId: 836,
          placementId: "display_ads_3",
          options: {
            video: {
              player: true,
            },
          },
        },
        {
          inventoryId: 837,
          placementId: "display_ads_4",
        },
        {
          inventoryId: 838,
          placementId: "display_ads_5",
        },
        {
          inventoryId: 839,
          placementId: "display_ads_6",
        },
        {
          inventoryId: 840,
          placementId: "display_ads_7",
        },
        {
          inventoryId: 841,
          placementId: "display_ads_8",
        },
      ];
      // const res = await sdk.requestAds(adUnits);
    });
  }, []);

  return (
    <LayoutOne title="Home">
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/examples/style.css"
        /> */}
        <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/node_modules/video.js/dist/video-js.min.css"
        />
        <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/node_modules/videojs-contrib-ads/dist/videojs.ads.css"
        />
        <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/dist/videojs.ima.css"
        />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
              process.env.NODE_ENV === "development"
                ? "https://localhost:9081/aicactus-sdk.development.min.js"
                : "https://cdn.aicactus.io/aicactus-sdk.staging.min.js"
            }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AicactusSDK.load(function(){AicactusSDK.initialize({containerId:"e40697e0-7172-4814-a281-d2d93cdc18ef@web", type: ["dmp"], debug: true}),AicactusSDK.callMethodsFromContainer()});`,
          }}
        ></script>
      </Head>
      <div className="shop-layout">
        <Container type={"fluid"}>
          <Row
            gutter={30}
            style={{
              marginBottom: 40,
            }}
          >
            <Col className="gutter-row" xs={24}>
              <JsonViewer src={resJson} />
            </Col>
          </Row>
          <div id="display_ads_1"></div>
          <Row gutter={30}>
            <Col className="gutter-row">
              <div id="display_ads_2"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_3"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_4"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_5"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_6"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_7"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_8"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}
