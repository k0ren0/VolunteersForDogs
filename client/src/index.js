import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './ErrorBoundary'; // Импорт компонента ошибки

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary> {/* Оборачиваем <App /> компонентом ошибки */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>, // Здесь оборачиваем <App /> компонентом ошибки
);

reportWebVitals();
