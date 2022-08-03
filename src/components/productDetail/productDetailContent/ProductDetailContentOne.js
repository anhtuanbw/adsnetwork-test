import { Button, Progress, Radio, Rate, message } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { useDispatch, useSelector } from "react-redux";

import { FEATURE_IDS } from "../../../common/defines";
import { checkAvaiableQuantityToAdd } from "../../../common/shopUtils";
import { formatCurrency } from "../../../common/utils";
import { addToCart } from "../../../redux/actions/cartActions";
import QuantitySelector from "../../controls/QuantitySelector";
import ProductGuaranteed from "../elements/ProductGuaranteed";

function ProductDetailContentOne({
  data,
  onAddedToCart,
  hideGuaranteed,
  quantityControllerNoRound,
  showCountdown,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState("none");
  const [currentSize, setCurrentSize] = useState("none");
  const globalState = useSelector((state) => state.globalReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const avaiableQuantity = checkAvaiableQuantityToAdd(cartState, data);
  const { currency, locales } = globalState.currency;

  const [adsBanners, setAdsBanners] = React.useState([]);

  const init = React.useCallback(async (id) => {
    const res = await window.AicactusSDK.getFeatureById(
      FEATURE_IDS.centerCanvas,
      "canvas",
      {
        width: 450,
        height: 170,
        background_color: "#FFFFFF",
      },
      id
    );
    if (res?.data?.results?.data?.length) {
      setAdsBanners(res.data.results.data);
    }
  }, []);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      init(globalState.userId);
    }, 500);

    return () => clearTimeout(timer);
  }, [globalState.userId, data]);

  const onAddProductToCart = (data) => {
    if (avaiableQuantity === 0) {
      return;
    }
    dispatch(addToCart(data, quantity, currentColor, currentSize));
    onAddedToCart && onAddedToCart();
    message.success("Product added to cart successfully");
  };

  const onChooseSize = (e) => {
    setCurrentSize(e.target.value);
  };

  const onChooseColor = (e) => {
    setCurrentColor(e.target.value);
  };

  return (
    <div className="product-detail-content-one">
      <h3>{data.name}</h3>

      <div className="product-detail-content-one-description">
        {adsBanners.map((item, index) => (
          <a
            className="banner-item"
            href={item.href}
            target="_blank"
            key={item.id}
          >
            <img src={item.link} alt="banner" />
          </a>
        ))}
      </div>

      {/* <div className="product-detail-content-one-rate">
        <Rate disabled defaultValue={data.rate} />
        <span className="product-detail-content-one-review-count">
          - 5 Reviews
        </span>
      </div> */}
      {/* <div className="product-detail-content-one-price">
        <h5>
          {data.discount
            ? formatCurrency(data.price - data.discount, locales, currency)
            : formatCurrency(data.price, locales, currency)}
        </h5>
        {data.discount && (
          <span>{formatCurrency(data.price, locales, currency)}</span>
        )}
      </div> */}
      {/* <p className="product-detail-content-one-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi illo
        possimus quae tenetur. Porro aliquam quaerat dolorum pariatur molestias
        commodi ipsa
      </p> */}
      {/* {showCountdown && (
        <>
          <div className="product-detail-content-one-countdown">
            <h3>Hurry Up ! Sales end in :</h3>
            <div className="product-detail-content-one-countdown__items">
              <Countdown
                date={Date.now() + 100000000}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <>
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(days)}</div>
                      <span>days</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(hours)}</div>
                      <span>hours</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(minutes)}</div>
                      <span>mins</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(seconds)}</div>
                      <span>secs</span>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="product-detail-content-one-countdown__sold">
              <Progress percent={50} showInfo={false} />
              <div className="sold-data">
                <h5>
                  Already Sold:
                  <span>20</span>
                </h5>
                <h5>
                  Total:
                  <span>20</span>
                </h5>
              </div>
            </div>
          </div>
        </>
      )} */}
      {/* <div className="product-detail-content-one-variation">
        {data.size && (
          <div className="variation-item -size">
            <>
              <p>Size:</p>
              <Radio.Group onChange={onChooseSize} defaultValue="a">
                {data.size.map((item, index) => (
                  <Radio.Button key={index} value={item.name}>
                    {item.name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </>
          </div>
        )}

        {data.variation && (
          <div className="variation-item -color">
            <>
              <p>Color:</p>
              <Radio.Group onChange={onChooseColor} defaultValue="a">
                {data.variation.map((item, index) => (
                  <Radio.Button
                    key={index}
                    value={item.color}
                    style={{ backgroundColor: item.colorCode }}
                  ></Radio.Button>
                ))}
              </Radio.Group>
            </>
          </div>
        )}
      </div> */}
      {/* <div className="product-detail-content-one-actions">
        <QuantitySelector
          noRound={quantityControllerNoRound}
          defaultValue={1}
          onChange={(val) => setQuantity(val)}
          size="big"
          max={checkAvaiableQuantityToAdd(cartState, data)}
        />
        <Button
          onClick={() => onAddProductToCart(data)}
          disabled={avaiableQuantity === 0}
          className={`product-detail-content-one-atc ${classNames({
            disabled: avaiableQuantity === 0,
          })}`}
          type="link"
          danger
        >
          Add to cart
        </Button>
      </div> */}
      {/* {!hideGuaranteed && <ProductGuaranteed />} */}
    </div>
  );
}

export default React.memo(ProductDetailContentOne);
