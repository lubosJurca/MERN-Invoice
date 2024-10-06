import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { useAllInvoicesContext } from '../pages/AllInvoicesPage';

const InvoiceDisplay = () => {
  const { t } = useTranslation();
  const { totalInvoices } = useAllInvoicesContext();
  const { isSmallDevice } = useAppContext();

  if (totalInvoices === 0) {
    return <p>{t('displayInvoices.invoices', { count: totalInvoices })}</p>;
  }

  if (isSmallDevice) {
    return (
      <p className='text-06 text-sm'>
        {/* {totalInvoices} {totalInvoices === 1 ? t('invoice') : t('invoices')} */}
        {t('displayInvoices.invoices', { count: totalInvoices })}
      </p>
    );
  }

  return (
    <p className='text-06 text-sm'>
      {/* {totalInvoices === 1
        ? t('oneInvoiceMsg')
        : `There are ${totalInvoices} total invoices.`} */}
      {t('displayInvoices.invoices', { count: totalInvoices })}
    </p>
  );
};

export default InvoiceDisplay;
