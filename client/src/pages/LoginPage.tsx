import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../components/ui/card';
import LoginForm from '../forms/login-user';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/LanguageDropdown';

const Login = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: -300, scale: 0.2 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className=' min-h-screen mx-6  w-[clamp(320px,100%,480px)] flex flex-col justify-around items-center '
    >
      <Card className='flex flex-col relative w-[clamp(320px,100%,480px)] justify-center mx-6 px-4 pt-6 space-y-6 items-center'>
        <div className='absolute top-6 right-4'>
          <LanguageDropdown />
        </div>
        <CardTitle className='py-6 '>{t('loginUserForm.title')}</CardTitle>
        <CardContent className='w-full'>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p>{t('loginUserForm.p')}</p>
          <Link className='text-01 font-bold ml-2' to='/register'>
            {t('loginUserForm.link')}
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
export default Login;
