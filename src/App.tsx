import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="main-content">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
