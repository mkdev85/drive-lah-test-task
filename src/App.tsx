import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import './assets/scss/GlobalStyle.scss';
import MainLayout from './components/MainLayout';
import Snackbar from './components/Snackbar';
import { store } from './redux/index';
import AppRoutes from './routes';

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
