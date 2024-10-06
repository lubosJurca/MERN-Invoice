import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className='bg-navbarBg text-gray-300 p-4 text-center'>
      <p>{t('footer.p')}</p>
    </footer>
  );
};

export default Footer;
