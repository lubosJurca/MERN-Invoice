import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const RootLayout = () => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/invoices');
    }
  }, [isLoggedIn, navigate]);

  return (
    <main className='min-h-screen flex justify-center items-center  bg-appBackground'>
      <AnimatePresence mode='wait'>
        <Outlet />
      </AnimatePresence>
    </main>
  );
};
export default RootLayout;
