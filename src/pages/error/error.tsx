import { Layout } from '../../components/layout-component/layout-component';

function Error404() {
  return (
    <Layout>
      <div>
        <h1>404 -- Страница не найдена</h1>
        <p>Извините, запрашиваемая страница не существует.</p>
      </div>
    </Layout>
  );
}
export default Error404;
