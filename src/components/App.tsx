import MainPage from '../pages/MainPage/MainPage';
type AppProps = {
    rentAmount : number;
}
function App({rentAmount}:AppProps): JSX.Element{
  return(
    <MainPage rentAmount={rentAmount}/>

  );

}
export default App;
