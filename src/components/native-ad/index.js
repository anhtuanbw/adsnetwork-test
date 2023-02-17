import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const NativeAd = ({ nativeObj }) => (
  <Card
    style={{
      width: 300,
    }}
    cover={<img alt="example" src={nativeObj?.previewImage?.url} />}
  >
    <Meta
      avatar={<Avatar src={nativeObj?.icon?.url} />}
      title={nativeObj?.title}
      description={nativeObj?.description || ''}
    />
  </Card>
);
export default NativeAd;
