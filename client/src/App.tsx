import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// layouts
import RootLayout from './layouts/RootLayout';
import DashboardLayout from './layouts/DashboardLayout';

// pages
import AllInvoices from './pages/AllInvoicesPage';
import InvoiceDetail from './pages/InvoiceDetailPage';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import Error from './components/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },

      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },

      {
        path: '/invoices',
        element: <DashboardLayout />,

        children: [
          {
            index: true,
            element: <AllInvoices />,
          },
          {
            path: '/invoices/:invoiceId',
            element: <InvoiceDetail />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
