import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContextProvider } from './context/AppContext.tsx';
import './utils/i18n/i18n.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <App />
      <ToastContainer position='top-right' />
    </AppContextProvider>
  </QueryClientProvider>
);
