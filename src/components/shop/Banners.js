import { Col, Divider, Row } from "antd";
import Link from "next/link";
import * as React from "react";

import { FEATURE_IDS } from "../../common/defines";
import Container from "../other/Container";

export default function Banners({ containerType }) {
  const [adsBanners, setAdsBanners] = React.useState([]);

  const init = React.useCallback(async () => {
    const res = await window.AicactusSDK.getFeatureById(
      FEATURE_IDS.topCanvas,
      "canvas",
      {
        width: 450,
        height: 170,
        background_color: "#FFFFFF",
      }
    );
    if (res?.data?.results?.data?.length) {
      setAdsBanners(res.data.results.data);
    }
  }, []);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      init();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="banners">
      <Container type={containerType}>
        <Row gutter={30}>
          {adsBanners.map((item, index) => (
            <Col
              key={item?.id ?? index}
              className="gutter-row"
              span={24}
              sm={24}
            >
              <a className="banner-item" href={item.href} target="_blank">
                <img src={item.link} alt="banner" />
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
