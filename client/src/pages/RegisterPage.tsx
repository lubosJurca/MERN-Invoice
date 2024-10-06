// components
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../components/ui/card';

import { Link } from 'react-router-dom';

import RegisterUserForm from '../forms/register-user';
import { motion } from 'framer-motion';
import LanguageDropdown from '../components/LanguageDropdown';
import { useTranslation } from 'react-i18next';

//   ---------- Register Component ----------

const Register = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: -300, scale: 0.2 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className=' m-6  w-[clamp(320px,100%,480px)] flex flex-col justify-around items-center '
    >
      <Card className='flex relative flex-col w-full   px-4 pt-6   justify-center items-center'>
        <div className='absolute top-6 right-4'>
          <LanguageDropdown />
        </div>

        <CardTitle className='py-6  '>{t('registerUserForm.title')}</CardTitle>
        <CardContent className='w-full'>
          <RegisterUserForm />
        </CardContent>
        <CardFooter>
          <p>{t('registerUserForm.p')}</p>
          <Link className='text-01 font-bold ml-2' to='/login'>
            {t('registerUserForm.link')}
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
export default Register;
