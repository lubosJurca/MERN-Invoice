import { format } from 'date-fns';

import { Card, CardContent, CardFooter } from './ui/card';
import { useInvoiceDetailContext } from '../pages/InvoiceDetailPage';
import ItemsDetailCard from './ItemsDetailCard';
import ItemDetailTable from './ItemDetailTable';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const DetailsCardComponent = () => {
  const { t } = useTranslation();
  const { data } = useInvoiceDetailContext();
  const { isSmallDevice } = useAppContext();
  const formattedAmount = new Intl.NumberFormat('eu-EU', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <Card className='border-none p-6 w-full flex flex-col gap-6 pb-8 text-center sm:text-start'>
      <div className='flex flex-col sm:flex-row sm:justify-between gap-8'>
        <div>
          <h4 className='text-h2Text font-bold text-2xl '>
            {data.description}
          </h4>
          <h5 className='text-formLabel text-sm'>
            <span className='text-formLabel font-semibold'>#</span>
            {data._id}
          </h5>
        </div>
        {/* Bill from */}
        <div className='sm:text-end'>
          <h5 className='text-formLabel text-sm'>
            {data.senderAddress.street}
          </h5>
          <h5 className='text-formLabel text-sm'>{data.senderAddress.city}</h5>
          <h5 className='text-formLabel text-sm'>
            {data.senderAddress.postCode}
          </h5>
          <h5 className='text-formLabel text-sm'>
            {data.senderAddress.country}
          </h5>
        </div>
      </div>

      <div className='flex flex-col sm:w-3/4 sm:flex-row sm:justify-between gap-8'>
        <div className='flex flex-col gap-8'>
          <div>
            <h5 className='text-formLabel text-sm'>
              {t('detailPage.invoiceDate')}
            </h5>
            <h4 className='text-h2Text font-bold text-[15px]'>
              {format(data.createdAt, 'PPP')}
            </h4>
          </div>
          <div>
            <h5 className='text-formLabel text-sm'>
              {t('detailPage.paymentDue')}
            </h5>
            <h4 className='text-h2Text font-bold text-sm'>
              {format(data.dueDate, 'PPP')}
            </h4>
          </div>
        </div>

        <div>
          <h5 className='text-formLabel text-sm '>{t('detailPage.billTo')}</h5>
          <h4 className='text-h2Text font-bold text-[15px] pb-2'>
            {data.clientName}
          </h4>
          <h5 className='text-formLabel text-sm'>
            {data.clientAddress.street}
          </h5>
          <h5 className='text-formLabel text-sm'>{data.clientAddress.city}</h5>
          <h5 className='text-formLabel text-sm'>
            {data.clientAddress.postCode}
          </h5>
          <h5 className='text-formLabel text-sm'>
            {data.clientAddress.country}
          </h5>
        </div>

        <div>
          <h5 className='text-formLabel text-sm'>{t('detailPage.sentTo')}</h5>
          <h4 className='text-h2Text font-bold text-[15px]'>
            {data.clientEmail}
          </h4>
        </div>
      </div>

      <Card className=' border-none overflow-hidden bg-itemsBg'>
        <CardContent className='flex px-6 pt-6  flex-col gap-6'>
          {isSmallDevice ? <ItemsDetailCard /> : <ItemDetailTable />}
        </CardContent>
        <CardFooter className='flex justify-between items-center w-full p-6 bg-grandTotal text-white '>
          <h3 className='text-sm'>{t('detailPage.grandTotal')}:</h3>
          <h3 className='font-bold text-2xl'>
            {formattedAmount.format(data.total)}
          </h3>
        </CardFooter>
      </Card>
    </Card>
  );
};
export default DetailsCardComponent;
