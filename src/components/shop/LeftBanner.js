import { Col, Divider, Row } from "antd";
import Link from "next/link";

import Container from "../other/Container";

export default function LefBanner({ containerType }) {
  return (
    <div className="banners">
      <Container type={containerType}>
        <Row gutter={30}>ahehehe</Row>
      </Container>
    </div>
  );
}
