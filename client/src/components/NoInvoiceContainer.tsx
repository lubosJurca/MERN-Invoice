import { useTranslation } from 'react-i18next';
import NoInvoiceSVG from './NoInvoiceSVG';
import { useAppContext } from '../context/AppContext';

const NoInvoiceComponent = () => {
  const { t } = useTranslation();
  const { isSmallDevice } = useAppContext();
  return (
    <div className='mb-10 mx-auto  flex items-center justify-center flex-col text-center'>
      <NoInvoiceSVG />
      <h2 className='pt-16 pb-6 text-h2Text font-bold text-2xl'>
        {t('noInvoiceComponent.h2')}
      </h2>
      <p className='text-pText'>
        {t('noInvoiceComponent.pFirst')}{' '}
        <span className='font-bold'>
          {isSmallDevice
            ? t('buttons.newInvoiceBtnShort')
            : t('buttons.newInvoiceBtn')}
        </span>{' '}
        {t('noInvoiceComponent.pLast')}
      </p>
    </div>
  );
};
export default NoInvoiceComponent;
