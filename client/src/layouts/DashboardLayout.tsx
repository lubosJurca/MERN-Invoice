import { Navigate, Outlet } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <div className='w-full  min-h-screen flex flex-col  justify-between  '>
      <div>
        <Navbar />
        <div className='p-6 lg:px-20     '>
          <AnimatePresence>
            <Outlet />
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default DashboardLayout;
