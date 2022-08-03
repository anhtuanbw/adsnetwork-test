import { Col, Row } from "antd";
import React, { useState } from "react";
import Slider from "react-slick";

import { FEATURE_IDS } from "../../common/defines";
import { delay } from "../../common/utils";
import ProductDetailContentOne from "../productDetail/productDetailContent/ProductDetailContentOne";

function ShopQuickView({ data, setModalVisible }) {
  const [extensionHTML, setExtensionHTML] = React.useState(null);

  async function init() {
    try {
      const res = await window.AicactusSDK.getFeatureById(
        FEATURE_IDS.extensions,
        "extension",
        {
          id: data.id,
        }
      );
      setExtensionHTML(res);
    } catch (error) {}
  }

  React.useEffect(() => {
    init();
  }, []);

  const slider1Settings = {
    arrows: false,
  };
  const slider2Settings = {
    arrows: false,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,

        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const onAddedToCart = () => {
    setModalVisible(false);
  };
  return (
    <div className="shop-qv">
      <Row align="middle" gutter={50}>
        <iframe
          srcDoc={extensionHTML}
          style={{
            width: "100%",
            minHeight: "60vh",
          }}
        />
      </Row>
    </div>
  );
}

export default React.memo(ShopQuickView);
