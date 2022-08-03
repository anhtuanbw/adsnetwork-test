import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { getProductsBySlug } from "../../common/shopUtils";
import { capitalizeFirstLetter } from "../../common/utils";
import LayoutOne from "../../components/layouts/LayoutOne";
import ProductDetailOne from "../../components/productDetail/ProductDetailOne";
import productData from "../../data/product.json";

export default function pid() {
  const router = useRouter();
  const { slug } = router.query;

  const { product } = useSelector((state) => state.globalReducer);

  return (
    <LayoutOne
      title={product?.name ? capitalizeFirstLetter(product.name) : ""}
      clearSpaceTop
    >
      {product?.name && <ProductDetailOne data={product} />}
    </LayoutOne>
  );
}
