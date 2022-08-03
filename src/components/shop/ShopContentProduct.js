import { Col, Empty, Pagination, Row } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getProductsByFilter,
  getProductsBySearch,
} from "../../common/shopUtils";
import Product from "../product/Product";

function ShopContentProduct({
  productResponsive,
  fiveColumn,
  data,
  productPerPage,
  productStyle,
  nextProducts,
}) {
  const shopState = useSelector((state) => state.shopReducer);
  const globalState = useSelector((state) => state.globalReducer);
  const [currentData, setCurrentData] = useState();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let filteredProduct = getProductsByFilter(
      [...data],
      shopState.sort,
      shopState.subCategory
    );
    setCurrentData(filteredProduct);
    setOffset(0);
  }, [shopState, data]);
  useEffect(() => {
    setPage(1);
  }, [globalState]);
  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <i className="fal fa-angle-left" />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <i className="fal fa-angle-right" />
        </a>
      );
    }
    return originalElement;
  };
  const onChangeOffset = (page, pageSize) => {
    let offset = (page - 1) * pageSize;
    setPage(page);
    setOffset(offset);
  };
  return (
    <div className="shop-content__product">
      {!currentData ? (
        <Empty description="No products in this category" />
      ) : (
        <>
          {currentData.length > 0 ? (
            <>
              <div className="shop-content__header">
                <div className="shop-content__header-showing">
                  <h2>Trending: </h2>
                </div>
              </div>
              <Row gutter={[{ xs: 5, sm: 5, xl: 15, xxl: 30 }, 30]}>
                {currentData
                  .slice(offset, offset + productPerPage)
                  .map((product, index) => (
                    <Col
                      key={index}
                      className={classNames({ "five-col": fiveColumn })}
                      {...productResponsive}
                    >
                      <Product data={product} productStyle={productStyle} />
                    </Col>
                  ))}
              </Row>
            </>
          ) : (
            <Empty />
          )}
        </>
      )}

      {nextProducts?.length > 0 && (
        <>
          <div className="shop-content__header">
            <div className="shop-content__header-showing">
              <h2>Just for you: </h2>
            </div>
          </div>
          <Row gutter={[{ xs: 5, sm: 5, xl: 15, xxl: 30 }, 30]}>
            {nextProducts.map((product, index) => (
              <Col
                key={index}
                className={classNames({ "five-col": fiveColumn })}
                {...productResponsive}
              >
                <Product data={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}

export default React.memo(ShopContentProduct);
