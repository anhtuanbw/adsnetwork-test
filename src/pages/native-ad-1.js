import { Col, Row, Divider } from 'antd';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import slugify from 'slugify';

import { FEATURE_IDS } from '../common/defines';
import useProductData from '../common/useProductData';
import JsonViewer from '../components/JsonViewer';
import LayoutOne from '../components/layouts/LayoutOne';
import Container from '../components/other/Container';
import Banners from '../components/shop/Banners';
import ShopLayout from '../components/shop/ShopLayout';
import productData from '../data/product.json';
import NativeAd from '../components/native-ad';

export default function Home() {
  const router = useRouter();

  const [resJson, setResJson] = React.useState({});
  const [nativeAd, setNativeAd] = React.useState({});

  React.useEffect(() => {
    window.addEventListener('load', async () => {
      if (window.AiactivSDK) {
        const sdk = window.AiactivSDK || {};
        const adUnits = [
          {
            inventoryId: 411,
            placementId: 'display_ads_1',
            options: {
              native: {
                template_id: 'template-1',
              },
            },
          },
        ];
        const res = await sdk.requestAds(adUnits);
        const friendlyObject = res?.natives?.[0]?.native;
        sdk.on('ALL_ADS_COMPLETED', (data) => {
          console.log('ALL_ADS_COMPLETED: ', data);
        });

        setResJson(res);
        setNativeAd(friendlyObject);
      }
    });
  }, []);

  return (
    <LayoutOne title="Home">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.AiactivSDK||(window.AiactivSDK={}),AiactivSDK.load=function(a){var b=document.createElement("script");b.async=!0,b.type="text/javascript",b.src="${
              process.env.NODE_ENV === 'development'
                ? 'http://localhost:9081/aiactiv-sdk.development.min.js'
                : 'https://sdk-cdn.aiactiv.io/aiactiv-sdk.test.min.js'
            }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AiactivSDK.load( function(){AiactivSDK.initialize({containerId:"c1e9eec0-75cf-4fe6-a231-98c5bc5e6c8a@web", type: ["adnetwork", "dmp"], debug: true}),AiactivSDK.callMethodsFromContainer();
            });
            `,
          }}
        ></script>
        <script
          data-ad-client="ca-pub-7500008582670100"
          async=""
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-checked-head="true"
        ></script>
        <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/node_modules/video.js/dist/video-js.min.css"
        />
        <link
          rel="stylesheet"
          href="https://googleads.github.io/videojs-ima/node_modules/videojs-contrib-ads/dist/videojs.ads.css"
        />
        <link rel="stylesheet" href="https://googleads.github.io/videojs-ima/dist/videojs.ima.css" />
      </Head>
      <div className="shop-layout">
        <Container type={'fluid'}>
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
          <Row>
            <Col className="gutter-row" xs={24}>
              <div id="aicactus-user-id"></div>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col className="gutter-row" xs={24}>
              <JsonViewer src={resJson} />
            </Col>
          </Row>
          <Divider plain>Native Ad</Divider>
          <Row gutter={30}>
            <Divider orientation="left" plain>
              Template 2
            </Divider>
            <Col className="gutter-row" xs={18}>
              <div id="display_ads_1"></div>
            </Col>
          </Row>
          <Row gutter={30}>
            <Divider orientation="left" plain>
              No template
            </Divider>
            <Col className="gutter-row" xs={24}>
              <NativeAd nativeObj={nativeAd} />
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}
