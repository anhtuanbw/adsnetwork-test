import { Col, Row, Input } from "antd";
import Head from "next/head";
import * as React from "react";

import LayoutOne from "../components/layouts/LayoutOne";
import Container from "../components/other/Container";

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export default function Home() {
  const [containerId, setContainerId] = React.useState(
    "478878ae-2683-4dfe-8977-31f9a51013e6"
  );
  const [inventoryId, setInventoryId] = React.useState("6");
  const [isLoading, setIsLoading] = React.useState(false);

  const onHandleContainerId = async (evt) => {
    setIsLoading(true);
    setContainerId(evt.target.value);
    await sleep(500);
    setIsLoading(false);
  };

  const onHandleInventoryId = async (evt) => {
    setIsLoading(true);
    setInventoryId(evt.target.value);
    await sleep(500);
    setIsLoading(false);
  };

  const enabled = !!containerId.length && !!inventoryId.length;

  return (
    <LayoutOne title="Home">
      <div className="shop-layout">
        <Container type={"fluid"}>
          <Row gutter={8}>
            <Col span={5}>
              <Input
                placeholder="Container ID"
                onChange={onHandleContainerId}
                value={containerId}
              />
            </Col>
            <Col span={5}>
              <Input
                placeholder="Inventory ID"
                onChange={onHandleInventoryId}
                value={inventoryId}
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              {!isLoading && enabled ? (
                <AdComponent
                  containerId={containerId}
                  inventoryId={inventoryId}
                />
              ) : (
                "Loading..."
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}

const devURL = "https://localhost:9081/aiactiv-sdk.development.min.js";
const prodURL = "https://sdk-cdn.aiactiv.io/aiactiv-sdk.min.js";

function AdComponent({ containerId, inventoryId }) {
  return (
    <div
      style={{
        marginTop: 30,
      }}
    >
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.AiactivSDK||(window.AiactivSDK={}),AiactivSDK.load=function(t){var e=document.createElement("script");e.async=!0,e.type="text/javascript",e.src="${prodURL}?t="+Date.now(),e.addEventListener?e.addEventListener("load",function(e){"function"==typeof t&&t(e)},!1):e.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&t(window.event)};let a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(e,a)},AiactivSDK.load(function(){AiactivSDK.initialize({containerId:"${containerId}@web", type: ["adnetwork"]}),AiactivSDK.callMethodsFromContainer();
            AiactivSDK.on('AD_NETWORK_READY', function() {
              const adUnits = [
                {
                  inventoryId: ${parseInt(inventoryId, 10)},
                  placementId: "display_ads",
                  options: {
                    video: {
                      player: true,
                    },
                  }
                },
              ];

              AiactivSDK.requestAds(adUnits)
            });
          });`,
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

      <Row gutter={8}>
        <Col span={24}>
          <div id="display_ads"></div>
        </Col>
      </Row>
    </div>
  );
}
