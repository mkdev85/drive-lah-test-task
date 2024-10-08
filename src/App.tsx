import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Snackbar from './components/Snackbar';
import { Provider } from 'react-redux';
import { store } from './redux/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <div className="main-content">
            <AppRoutes />
          </div>
          <Snackbar />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
