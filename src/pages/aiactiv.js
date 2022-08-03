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
      if (window.AiactivSDK) {
        const sdk = window.AiactivSDK || {};
        const adUnits = [
          {
            inventoryId: 12,
            placementId: "display_ads",
            options: {
              video: {
                player: true,
              },
            },
          },
        ];

        const res = await sdk.requestAds(adUnits);
        setResJson(res);
      }
    });
  }, []);

  return (
    <LayoutOne title="Home">
      <Head>
        <script
          defer
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.AiactivSDK||(window.AiactivSDK={}),AiactivSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
              process.env.NODE_ENV === "development"
                ? "https://sdk-cdn.aiactiv.io/aiactiv-sdk.min.js"
                : "https://sdk-cdn.aiactiv.io/aiactiv-sdk.min.js"
            }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AiactivSDK.load( function(){AiactivSDK.initialize({containerId:"b8a3ccf2-5d49-4912-b2cc-87dc46e10277@web", type: ["adnetwork"], debug: true}),AiactivSDK.callMethodsFromContainer();
            });
            `,
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
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}
