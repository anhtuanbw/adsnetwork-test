import { Col, Row, Tabs } from "antd";
import classNames from "classnames";
import { useSelector } from "react-redux";
import slugify from "slugify";

import { FEATURE_IDS } from "../../../common/defines";
import Container from "../../other/Container";
import Product from "../../product/Product";
import ProductDetailReviewItem from "../elements/ProductDetailReviewItem";

const { TabPane } = Tabs;

export default function ProductDetailTabOne() {
  const { userId, product } = useSelector((state) => state.globalReducer);
  const [nextProducts, setNextProducts] = React.useState([]);

  const initNextProducts = React.useCallback(async (userId, product) => {
    const res = await window.AicactusSDK.getFeatureById(
      FEATURE_IDS.nextProducts,
      "next",
      {},
      userId,
      {
        productId: product?.id,
        url: product?.cdn_link,
      }
    );
    if (res?.data?.results?.data?.length) {
      const data = res.data.results.data;
      setNextProducts(
        data.map((item) => ({
          ...item,
          slug: slugify(item.name, {
            replacement: "-",
            remove: undefined,
            lower: true,
            strict: false,
            locale: "vi",
          }),
          thumbImage: item.cdn_link?.length
            ? [item.cdn_link, item.cdn_link]
            : null,
          images: item.cdn_link?.length ? [item.cdn_link] : null,
        }))
      );
    }
  }, []);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      initNextProducts(userId, product);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId, product]);

  return (
    <div className="product-detail-tab-one shop-layout">
      <Container>
        <div className="shop-content__product">
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
                    className={classNames({ "five-col": true })}
                    xs={12}
                    sm={8}
                    md={6}
                  >
                    <Product data={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>

        {/* <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Description" key="1">
            <div className="product-detail-tab-item -description">
              <p className="tab-des--bold">
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras loremos.
              </p>
              <h5 className="tab-title">Products Infomation</h5>
              <p className="tab-des">
                A Pocket PC is a handheld computer, which features many of the
                same capabilities as a modern PC. These handy little devices
                allow individuals to retrieve and store e-mail messages, create
                a contact file, coordinate appointments, surf the internet,
                exchange text messages and more. Every product that is labeled
                as a Pocket PC must be accompanied with specific software to
                operate the unit and must feature a touchscreen and touchpad. As
                is the case with any new technology product, the cost of a
                Pocket PC was substantial during it’s early release. For
                approximately $700.00, consumers could purchase one of
                top-of-the-line Pocket PCs in 2003. These days, customers are
                finding that prices have become much more reasonable now that
                the newness is wearing off. For approximately $350.00, a new
                Pocket PC can now be purchased.
              </p>
              <h5 className="tab-title">Material used</h5>
              <p className="tab-des">
                Polyester is deemed lower quality due to its none natural
                quality’s. Made from synthetic materials, not natural like wool.
                Polyester suits become creased easily and are known for not
                being breathable. Polyester suits tend to have a shine to them
                compared to wool and cotton suits, this can make the suit look
                cheap. The texture of velvet is luxurious and breathable. Velvet
                is a great choice for dinner party jacket and can be worn all
                year round.
              </p>
            </div>
          </TabPane>
          <TabPane tab="Customer Reviews(5)" key="2">
            <div className="product-detail-tab-item -review">
              <ProductDetailReviewItem />
              <ProductDetailReviewItem />
            </div>
          </TabPane>
          <TabPane tab="Additional information" key="3">
            <div className="product-detail-tab-item -info">
              <table>
                <tr>
                  <td>Outer Shell</td>
                  <td>100% polyester</td>
                </tr>
                <tr>
                  <td>Lining</td>
                  <td>100% polyurethane</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>S, M, L, XL</td>
                </tr>
                <tr>
                  <td>Colors</td>
                  <td>Grey, Red, Blue, Black</td>
                </tr>
                <tr>
                  <td>Care</td>
                  <td>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/shop/shop-detail/care-icons.png"
                      }
                      alt="Care icon"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </TabPane>
        </Tabs> */}
      </Container>
    </div>
  );
}
