import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from 'framer-motion';
import { useEffect } from 'react';
import heroSvg from '../assets/heroImage.svg';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import TestUserBtn from '../components/TestUserBtn';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/LanguageDropdown';

const COLORS = ['#9470ff', '#a58fe3', '#cabbf5', '#a799d0'];

const WelcomePage = () => {
  const { t } = useTranslation();
  const color = useMotionValue(COLORS[4]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #e5e7eb 40%, ${color})`;

  const generateRandomKey = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  useEffect(() => {
    animate(color, COLORS, {
      ease: 'easeInOut',
      duration: 2,
      repeat: Infinity,
      repeatType: 'mirror',
    });

    animate('li', {
      animationDuration: 0.5,
      animationDelay: 1.5,
    });
  }, [color]);

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className='relative text-center  sm:text-left grid w-full min-h-screen place-content-center overflow-hidden  px-4 py-24  '
    >
      <div className='absolute top-0 right-0'>
        <LanguageDropdown />
      </div>

      <div className='mx-auto flex w-svw max-w-7xl flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0'>
        <div className='max-w-xl md:mr-8'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='text-6xl text-black lg:text-8xl font-extrabold leading-tight mb-6'
          >
            {t('welcomePage.h1')}
            <br />{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='text-01'
            >
              {t('welcomePage.span')}
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='text-lg text-black lg:text-xl font-light mb-6'
          >
            {t('welcomePage.p')}
          </motion.p>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1, staggerChildren: 0.5 }}
            className='flex justify-center flex-col sm:flex-row   sm:justify-start gap-4'
          >
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              key={generateRandomKey()}
            >
              <TestUserBtn />
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1 }}
              key={generateRandomKey()}
            >
              <Button className=' z-10'>
                <Link to='/register'>{t('buttons.register')}</Link>
              </Button>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.5 }}
              key={generateRandomKey()}
            >
              <Button className='   z-10'>
                <Link to='/login'>{t('buttons.login')}</Link>
              </Button>
            </motion.li>
          </motion.ul>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='w-full md:w-1/2 flex justify-center md:justify-end'
        >
          <img
            src={heroSvg}
            alt='Invoice management'
            className='w-full h-auto transform hover:scale-105 transition duration-500'
          />
        </motion.div>
      </div>
    </motion.section>
  );
};
export default WelcomePage;
