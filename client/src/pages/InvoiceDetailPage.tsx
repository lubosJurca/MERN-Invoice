import { Link, useParams } from 'react-router-dom';

// icons
import { ChevronLeft } from 'lucide-react';

// components

import DetailsCardComponent from '../components/DetailsCardComponent';

import { useQuery } from '@tanstack/react-query';
import * as apiClient from '../api-clients';
import Loading from '../components/Loading';
import InvoiceDetailActions from '../components/InvoiceDetailActions';

import { Card, CardContent } from '../components/ui/card';
import StatusComponent from '../components/StatusComponent';
import { InvoiceType } from '../utils/types';
import { createContext, useContext } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type InvoiceDetailContextType = {
  data: InvoiceType;
  isSmallDevice: boolean;
};

const InvoiceDetailContext = createContext<
  InvoiceDetailContextType | undefined
>(undefined);

const InvoiceDetail = () => {
  const { t } = useTranslation();
  const { invoiceId } = useParams();
  const { isSmallDevice } = useAppContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => apiClient.getSingleInvoiceById(invoiceId as string),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{t('detailPage.error')}</p>;
  }

  return (
    <InvoiceDetailContext.Provider value={{ data, isSmallDevice }}>
      <motion.div
        key={data?._id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='w-full flex flex-col '
      >
        <Link
          to='..'
          className='font-bold flex items-center gap-6 mb-8  w-full'
        >
          <ChevronLeft className='w-4 h-4' />
          {t('detailPage.buttons.goBack')}
        </Link>

        <div className='flex flex-col  gap-4 w-full'>
          {/* Status and actions */}
          <Card className=' border-none flex items-center h-24 shadow-none w-full'>
            <CardContent className=' pb-0 flex items-center justify-between w-full'>
              <div className='flex gap-4 items-center '>
                <p className='font-medium text-formLabel text-sm'>Status</p>
                <StatusComponent status={data?.status} />
              </div>
              {!isSmallDevice && <InvoiceDetailActions />}
            </CardContent>
          </Card>

          {/* Details */}
          <DetailsCardComponent />
          {isSmallDevice && (
            <Card className=' border-none flex items-center  shadow-none w-full'>
              <CardContent className=' p-2  flex items-center justify-between w-full'>
                <InvoiceDetailActions />
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </InvoiceDetailContext.Provider>
  );
};

export const useInvoiceDetailContext = () => {
  const context = useContext(InvoiceDetailContext);
  return context as InvoiceDetailContextType;
};

export default InvoiceDetail;
