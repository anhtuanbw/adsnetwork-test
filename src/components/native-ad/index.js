import { SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
const { Meta } = Card;
const NativeAd = ({ nativeObj }) => (
  <Card
    style={{
      width: 300,
    }}
    cover={<img alt="example" src={nativeObj?.previewImage?.url} />}
    actions={[
      <Button type="primary" key="setting" danger>
        {nativeObj?.callToAction || 'No data config'}
      </Button>,
    ]}
  >
    <Meta
      avatar={<Avatar src={nativeObj?.icon?.url} />}
      title={nativeObj?.title || 'No data config'}
      description={nativeObj?.description || 'No data config'}
    />
  </Card>
);
export default NativeAd;
