import { Col, Row } from "antd";
import Head from "next/head";
import * as React from "react";

import JsonViewer from "../components/JsonViewer";
import LayoutOne from "../components/layouts/LayoutOne";
import Container from "../components/other/Container";

export default function Home() {
  const [resJson, setResJson] = React.useState({});

  React.useEffect(() => {
    window.addEventListener("load", async () => {
      if (window.AicactusSDK) {
        const sdk = window.AicactusSDK || {};

        const adUnits = [
          {
            inventoryId: 20,
            placementId: "display_ads_5",
            options: {
              video: {
                player: true,
              },
              debug: true,
            },
          },
        ];
        const res = await sdk.requestAds(adUnits);

        sdk.on("ALL_ADS_COMPLETED", (data) => {
          console.log("ALL_ADS_COMPLETED: ", data);
        });

        setResJson(res);

        var autoplayAllowed = false;
        var autoplayRequiresMute = false;
        var player;
        var wrapperDiv;

        function checkUnmutedAutoplaySupport() {
          canAutoplay
            .video({ timeout: 100, muted: false })
            .then(function (response) {
              if (response.result === false) {
                // Unmuted autoplay is not allowed.
                checkMutedAutoplaySupport();
              } else {
                // Unmuted autoplay is allowed.
                autoplayAllowed = true;
                autoplayRequiresMute = false;
                initPlayer();
              }
            });
        }

        function checkMutedAutoplaySupport() {
          canAutoplay
            .video({ timeout: 100, muted: true })
            .then(function (response) {
              if (response.result === false) {
                // Muted autoplay is not allowed.
                autoplayAllowed = false;
                autoplayRequiresMute = false;
              } else {
                // Muted autoplay is allowed.
                autoplayAllowed = true;
                autoplayRequiresMute = true;
              }
              initPlayer();
            });
        }

        function initPlayer() {
          var vjsOptions = {
            autoplay: autoplayAllowed,
            muted: autoplayRequiresMute,
            debug: true,
          };
          player = videojs("content_video", vjsOptions);

          var imaOptions = {
            id: "content_video",
            adTagUrl: res.videos[0].vastTagURL,
          };
          player.ima(imaOptions);

          if (!autoplayAllowed) {
            if (
              navigator.userAgent.match(/iPhone/i) ||
              navigator.userAgent.match(/iPad/i) ||
              navigator.userAgent.match(/Android/i)
            ) {
              startEvent = "touchend";
            }

            wrapperDiv = document.getElementById("content_video");
            wrapperDiv.addEventListener(startEvent, initAdDisplayContainer);
          }
        }

        function initAdDisplayContainer() {
          player.ima.initializeAdDisplayContainer();
          wrapperDiv.removeEventListener(startEvent, initAdDisplayContainer);
        }

        var startEvent = "click";

        if (res?.videos?.length) {
          checkUnmutedAutoplaySupport();
        }
      }
    });
  }, []);

  return (
    <LayoutOne title="Home">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.AicactusSDK||(window.AicactusSDK={}),AicactusSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
              process.env.NODE_ENV === "development"
                ? "https://localhost:9081/aicactus-sdk.development.min.js"
                : "https://cdn.aicactus.io/aicactus-sdk.staging.min.js"
            }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AicactusSDK.load( function(){AicactusSDK.initialize({containerId:"b8a3ccf2-5d49-4912-b2cc-87dc46e10277@web", type: ["adnetwork", "dmp"], debug: true}),AicactusSDK.callMethodsFromContainer();
            });
            `,
          }}
        ></script>

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
              {navigator.userAgent}
            </Col>
          </Row>
          <Row
            gutter={30}
            style={{
              marginBottom: 40,
            }}
          >
            <Col className="gutter-row" xs={24}>
              <div id="aicactus-user-id"></div>
            </Col>
          </Row>
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
              <div
                id="display_ads_5"
                style={{
                  position: "relative",
                  width: 700,
                }}
              ></div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}
