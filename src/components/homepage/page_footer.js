import { Layout, Icon, Typography} from 'antd';
const { Footer } = Layout;
const { Title } = Typography;
function PageFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Title level={4}>
      <a href={"https://github.com/leduytung/youtubeshare-ui"}>ReactJS project </a>
        <Icon style={{margin: 5}} type="github" />
      </Title>
      <Title level={4}>
        <a href={"https://github.com/leduytung/youtubeshare-api"}>Ruby project </a>
        <Icon style={{margin: 5}} type="github" />
      </Title>
    </Footer>
  );
}

export default PageFooter;
