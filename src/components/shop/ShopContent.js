import React from "react";

import ShopContentHeader from "./ShopContentHeader";
import ShopContentProduct from "./ShopContentProduct";

function ShopContent({
  fiveColumn,
  productResponsive,
  data,
  productPerPage,
  productStyle,
  nextProducts,
}) {
  return (
    <div className="shop-content">
      <ShopContentProduct
        productStyle={productStyle}
        fiveColumn={fiveColumn}
        productResponsive={productResponsive}
        data={data}
        productPerPage={productPerPage}
        nextProducts={nextProducts}
      />
    </div>
  );
}

export default React.memo(ShopContent);
