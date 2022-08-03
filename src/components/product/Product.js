import { Button, Modal, Rate, Skeleton, Spin, Tooltip, message } from "antd";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  checkAvaiableQuantityToAdd,
  checkProductInWishlist,
} from "../../common/shopUtils";
import { formatCurrency } from "../../common/utils";
import { addToCart } from "../../redux/actions/cartActions";
import { setGlobalProduct } from "../../redux/actions/globalActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlistActions";
import ShopQuickView from "../shop/ShopQuickView";

function Product({ data, productStyle }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!data.thumbImage);
  const globalState = useSelector((state) => state.globalReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const wishlistState = useSelector((state) => state.wishlistReducer);
  const productInWishlist = checkProductInWishlist(wishlistState, data.id);
  const avaiableQuantity = checkAvaiableQuantityToAdd(cartState, data);
  const { currency, locales } = globalState.currency;

  useEffect(() => {
    setImageLoading(!!data.thumbImage);
  }, [globalState.category]);

  const renderProductType = () => {
    if (data.discount && !data.isNew) {
      return <p className="product-type -sale">Sale</p>;
    } else if (data.isNew && !data.discount) {
      return <p className="product-type -new">New</p>;
    } else if (data.isNew && data.discount) {
      return <p className="product-type -new">New</p>;
    } else {
      return null;
    }
  };
  const onAddToCart = (data) => {
    if (avaiableQuantity === 0) {
      return;
    }
    dispatch(addToCart(data, 1, "none", "none"));
    message.success("Product added to cart successfully");
  };
  const onAddToWishlist = (data) => {
    if (productInWishlist) {
      dispatch(removeFromWishlist(data.id));
      return message.error("Product removed from wishlist");
    } else {
      dispatch(addToWishlist(data));
      return message.success("Product added to wishlist successfully");
    }
  };
  const renderStyleClass = () => {
    const avaialeStyles = ["one", "two", "three"];
    if (avaialeStyles.includes(productStyle)) {
      if (!productStyle || productStyle === "one") {
        return "-style-one";
      } else {
        return "-style-" + productStyle;
      }
    } else {
      return "-style-one";
    }
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = (e) => {
    setVisible(false);
  };
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  const handleClickProduct = () => {
    dispatch(setGlobalProduct(data));
  };

  const _renderAvatar = (product) => {
    return <span className="avatar">{[...product.slug][0]}</span>;
  };

  return data ? (
    <>
      <div className={`product ${renderStyleClass()}`}>
        <div className="product-image">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${data.slug}`}
          >
            <a
              className={classNames({ loading: imageLoading })}
              onClick={handleClickProduct}
            >
              {data.thumbImage
                ? data.thumbImage.map((item, index) => (
                    <img
                      onLoad={handleImageLoaded}
                      key={index}
                      src={item}
                      alt="Product image"
                    />
                  ))
                : _renderAvatar(data)}
            </a>
          </Link>
          {imageLoading && (
            <div className="product-image-loading">
              <Spin size="large" />
            </div>
          )}
          {renderProductType()}
          <Tooltip placement="left" title={"Product info"}>
            <Button
              className={`product-atw ${classNames({
                active: productInWishlist,
              })}`}
              type="text"
              shape="circle"
              onClick={showModal}
            >
              <i className="icon_info_alt" />
            </Button>
          </Tooltip>
        </div>
        <div className="product-content">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${data.slug}`}
          >
            <a className="product-name">{data.name}</a>
          </Link>
        </div>
      </div>
      <Modal
        footer={null}
        afterClose={handleCancel}
        onCancel={handleCancel}
        visible={visible}
        width={850}
      >
        <ShopQuickView setModalVisible={setVisible} data={data} />
      </Modal>
    </>
  ) : (
    <Skeleton active />
  );
}

export default React.memo(Product);
