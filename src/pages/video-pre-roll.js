import { Col, Row } from 'antd';
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

const VIDEO_ID = 'test-youtube';

export default function Home() {
  const router = useRouter();

  const [resJson, setResJson] = React.useState({});

  React.useEffect(() => {
    window.addEventListener('load', async () => {
      if (window.AiactivSDK) {
        const sdk = window.AiactivSDK || {};
        const adUnits = [
          {
            inventoryId: 990,
            placementId: 'display_ads_1',
            options: {
              video: {
                player: true,
                videoContentId: VIDEO_ID,
              },
              debug: true,
            },
          },
        ];
        const res = await sdk.requestAds(adUnits);

        sdk.on('ALL_ADS_COMPLETED', (data) => {
          console.log('ALL_ADS_COMPLETED: ', data);
        });

        setResJson(res);
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
            }",b.addEventListener?b.addEventListener("load",function(b){"function"==typeof a&&a(b)},!1):b.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&a(window.event)};let c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},AiactivSDK.load( function(){AiactivSDK.initialize({containerId:"8aff59d2-f161-41d3-bc2c-ebd52a09e4ba@web", type: ["adnetwork"], debug: true}),AiactivSDK.callMethodsFromContainer();
            });
            `,
          }}
        ></script>
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
          <hr></hr>
          <Row>
            <Col className="gutter-row" xs={24}>
              <JsonViewer src={resJson} />
            </Col>
          </Row>
          <hr></hr>
          <p>Video responsive ads</p>
          <Row gutter={30}>
            <Col className="gutter-row" style={{ width: '100%' }}>
              <iframe
                id={VIDEO_ID}
                width="560"
                height="315"
                src="https://www.youtube.com/embed/nqye02H_H6I"
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>

              <div id="display_ads_1"></div>
            </Col>
          </Row>
          <hr></hr>
          <p>Video no responsive ads</p>
          <Row gutter={30} style={{ width: '100%', overflow: 'hidden' }}>
            <Col className="gutter-row">
              <div id="display_ads_2"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}
