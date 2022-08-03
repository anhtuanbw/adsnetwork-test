import { Col, Row } from "antd";
import React from "react";

import Container from "../other/Container";
import ShopContent from "./ShopContent";
import ShopQuickView from "./ShopQuickView";
import ShopSidebar from "./ShopSidebar";

function ShopLayout({
  shopSidebarResponsive,
  shopContentResponsive,
  productResponsive,
  fiveColumn,
  data,
  productPerPage,
  productStyle,
  containerType,
  nextProducts = [],
}) {
  return (
    <div className="shop-layout">
      <Container type={containerType}>
        <Row gutter={30}>
          <Col className="gutter-row" {...shopSidebarResponsive}>
            <ShopSidebar />
          </Col>
          <Col className="gutter-row" {...shopContentResponsive}>
            <ShopContent
              productStyle={productStyle}
              productPerPage={productPerPage}
              fiveColumn={fiveColumn}
              productResponsive={productResponsive}
              data={data}
              nextProducts={nextProducts}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default React.memo(ShopLayout);
