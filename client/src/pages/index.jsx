import { withAuth } from "../hoc/withAuth";
import PageLayout from "../layouts/PageLayout";

const Home = () => {
  return (
    <PageLayout>
      <p>Hello</p>
    </PageLayout>
  );
};

export default withAuth(Home);
