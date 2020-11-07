import { Layout } from 'antd';
import PageHeader from './page_header';
import PageContent from './page_content';
import PageFooter from './page_footer';

function Homepage() {
  return (
    <Layout className="layout">
      <PageHeader/>
      <PageContent/>
      <PageFooter/>
    </Layout>
  );
}

export default Homepage;
