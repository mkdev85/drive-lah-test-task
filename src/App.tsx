import './App.scss';
import './assets/scss/GlobalStyle.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Snackbar from './components/Snackbar';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
        <Snackbar />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
