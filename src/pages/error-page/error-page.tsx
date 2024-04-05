import Layout from '../../components/header-component/header-component';

function Error404() {
  return (
    <div data-testid = 'error-container'>
      <Layout/>
      <h1>404 -- Страница не найдена</h1>
      <p>Извините, запрашиваемая страница не существует.</p>
    </div>
  );
}
export default Error404;
