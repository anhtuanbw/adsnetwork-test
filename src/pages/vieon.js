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
      if (window.AicactusSDK) {
        const sdk = window.AicactusSDK || {};

        sdk.track("Article Completed", {
          title: "How to Create a Tracking Plan",
          course: "Intro to Analytics",
        });

        const adUnits = [
          {
            inventoryId: 24,
            placementId: "display_ads_1",
          },
          {
            inventoryId: 23,
            placementId: "display_ads_2",
          },
          {
            inventoryId: 22,
            placementId: "display_ads_3",
          },
          // {
          //   inventoryId: 21,
          //   placementId: "display_ads_4",
          //   options: {
          //     video: {
          //       usePlayer: false,
          //     },
          //     debug: true,
          //   },
          // },
          {
            inventoryId: 549,
            placementId: "display_ads_4",
            options: {
              video: {
                player: true,
              },
            },
          },
          {
            inventoryId: 550,
            placementId: "display_ads_5",
            options: {
              video: {
                player: true,
              },
            },
          },
        ];
        const res = await sdk.requestAds(adUnits);
        console.log(
          "🚀 ~ file: index.js ~ line 119 ~ window.addEventListener ~ res",
          res
        );

        setResJson(res);
      }
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
                : "https://cdn.aicactus.io/aicactus-sdk.min.js"
            }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AicactusSDK.load(function(){AicactusSDK.initialize({containerId:"1c8f8a44-1d08-46f1-8e99-1b1da65d3769@web", type: ["adnetwork", "dmp"], debug: true}),AicactusSDK.callMethodsFromContainer()});`,
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
          <Row gutter={30}>
            <Col className="gutter-row">
              <div id="display_ads"></div>
            </Col>
            <Col className="gutter-row">
              <div id="display_ads_1"></div>
            </Col>
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
            {/* <Col className="gutter-row">
              <div
                id="display_ads_5"
                style={{
                  position: "relative",
                }}
              >
                <video
                  id="content_video"
                  className="video-js vjs-default-skin"
                  poster="https://googleads.github.io/videojs-ima/examples/posters/bbb_poster.jpg"
                  controls
                  preload="auto"
                  width="1366"
                  height="768"
                  playsInline
                >
                  <source
                    src="//commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  ></source>
                </video>
              </div>
            </Col> */}
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}
